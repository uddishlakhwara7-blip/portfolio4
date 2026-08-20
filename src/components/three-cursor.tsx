"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeCursor() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Disable custom 3D cursor on mobile/touch devices or reduced motion
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    document.body.classList.add("custom-cursor-active");
    setIsVisible(true);

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. 3D Wireframe Octahedron (Core)
    const coreGeo = new THREE.OctahedronGeometry(0.7, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: "#22d3ee",
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // 2. Outer Ring Geometry
    const ringGeo = new THREE.TorusGeometry(1.2, 0.03, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: "#a855f7",
      transparent: true,
      opacity: 0.6,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ringMesh);

    // 3. Particle Trail System
    const trailCount = 24;
    const trailGeo = new THREE.BufferGeometry();
    const trailPositions = new Float32Array(trailCount * 3);
    const trailOpacities = new Float32Array(trailCount);

    for (let i = 0; i < trailCount; i++) {
      trailPositions[i * 3] = 0;
      trailPositions[i * 3 + 1] = 0;
      trailPositions[i * 3 + 2] = 0;
      trailOpacities[i] = (1 - i / trailCount) * 0.7;
    }

    trailGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(trailPositions, 3)
    );

    const trailMat = new THREE.PointsMaterial({
      size: 0.35,
      color: "#38bdf8",
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const trailPoints = new THREE.Points(trailGeo, trailMat);
    scene.add(trailPoints);

    // 4. Click Shockwave Mesh
    const shockGeo = new THREE.RingGeometry(0.1, 0.2, 32);
    const shockMat = new THREE.MeshBasicMaterial({
      color: "#38bdf8",
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });
    const shockMesh = new THREE.Mesh(shockGeo, shockMat);
    scene.add(shockMesh);

    // Position State & Interpolation (Lerp)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    let isHovered = false;
    let shockScale = 1;
    let shockOpacity = 0;

    // Trail history points
    const history: { x: number; y: number }[] = Array(trailCount).fill({
      x: 0,
      y: 0,
    });

    // Mouse Move & Viewport Mapping
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Convert Screen Pixel Coordinates to 3D World Space Coordinates
      targetX = (e.clientX / window.innerWidth - 0.5) * (camera.aspect * 23);
      targetY = -(e.clientY / window.innerHeight - 0.5) * 23;

      // Check if mouse is hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, select, textarea, [role="button"], .hover-target, canvas'
        );
        isHovered = !!interactive;
      }
    };

    // Click handler for 3D Shockwave expansion
    const handleClick = () => {
      shockMesh.position.x = currentX;
      shockMesh.position.y = currentY;
      shockScale = 0.5;
      shockOpacity = 1;
    };

    // Window leave / enter handlers
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp movement towards target mouse position
      const lerpFactor = isHovered ? 0.25 : 0.18;
      currentX += (targetX - currentX) * lerpFactor;
      currentY += (targetY - currentY) * lerpFactor;

      // Update Core & Ring Position
      coreMesh.position.x = currentX;
      coreMesh.position.y = currentY;
      ringMesh.position.x = currentX;
      ringMesh.position.y = currentY;

      // Dynamic rotation
      const rotSpeed = isHovered ? 3.5 : 1.5;
      coreMesh.rotation.x = elapsedTime * rotSpeed;
      coreMesh.rotation.y = elapsedTime * (rotSpeed * 1.2);
      ringMesh.rotation.x = elapsedTime * (rotSpeed * 0.8);
      ringMesh.rotation.z = elapsedTime * rotSpeed;

      // Dynamic Hover Scale & Color Shift
      const targetScale = isHovered ? 1.6 : 1.0;
      const currentScale = coreMesh.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.15;
      coreMesh.scale.setScalar(newScale);
      ringMesh.scale.setScalar(newScale * 1.25);

      if (isHovered) {
        coreMat.color.set("#ec4899"); // Vibrant Pink/Magenta on hover
        ringMat.color.set("#22d3ee"); // Cyan ring on hover
      } else {
        coreMat.color.set("#22d3ee"); // Cyan core default
        ringMat.color.set("#a855f7"); // Purple ring default
      }

      // Update Particle Trail History
      history.unshift({ x: currentX, y: currentY });
      history.pop();

      const posAttr = trailGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < trailCount; i++) {
        const pt = history[i] || { x: currentX, y: currentY };
        posAttr.setXYZ(i, pt.x, pt.y, 0);
      }
      posAttr.needsUpdate = true;

      // Update Shockwave Ripple animation
      if (shockOpacity > 0.01) {
        shockScale += 0.15;
        shockOpacity *= 0.92;
        shockMesh.scale.set(shockScale, shockScale, 1);
        shockMat.opacity = shockOpacity;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("resize", handleResize);

      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      trailGeo.dispose();
      trailMat.dispose();
      shockGeo.dispose();
      shockMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

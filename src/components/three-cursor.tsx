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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Sleek Wireframe Reticle Ring (No heavy orb/solid mesh)
    const ringGeo = new THREE.TorusGeometry(0.8, 0.025, 16, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: "#22d3ee",
      transparent: true,
      opacity: 0.85,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ringMesh);

    // Micro Center Dot
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3)
    );
    const dotMat = new THREE.PointsMaterial({
      size: 0.25,
      color: "#ffffff",
      transparent: true,
      opacity: 0.95,
    });
    const dotPoint = new THREE.Points(dotGeo, dotMat);
    scene.add(dotPoint);

    // Lightweight Particle Trail System (8 lightweight points)
    const trailCount = 8;
    const trailGeo = new THREE.BufferGeometry();
    const trailPositions = new Float32Array(trailCount * 3);

    for (let i = 0; i < trailCount; i++) {
      trailPositions[i * 3] = 0;
      trailPositions[i * 3 + 1] = 0;
      trailPositions[i * 3 + 2] = 0;
    }

    trailGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(trailPositions, 3)
    );

    const trailMat = new THREE.PointsMaterial({
      size: 0.2,
      color: "#38bdf8",
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const trailPoints = new THREE.Points(trailGeo, trailMat);
    scene.add(trailPoints);

    // Position State & High-Speed Interpolation
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHovered = false;
    let lastHoverCheck = 0;

    const history: { x: number; y: number }[] = Array(trailCount).fill({
      x: 0,
      y: 0,
    });

    // High-performance Mouse Listener (Passive)
    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * (camera.aspect * 23);
      targetY = -(e.clientY / window.innerHeight - 0.5) * 23;

      // Throttle DOM hover check to every 80ms to keep mouse event loop ultra-fast
      const now = performance.now();
      if (now - lastHoverCheck > 80) {
        lastHoverCheck = now;
        const target = e.target as HTMLElement | null;
        if (target) {
          isHovered = !!target.closest(
            'a, button, input, select, textarea, [role="button"], canvas'
          );
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // High-speed lerp (0.65) — Instant responsiveness with zero lag
      currentX += (targetX - currentX) * 0.65;
      currentY += (targetY - currentY) * 0.65;

      ringMesh.position.set(currentX, currentY, 0);
      dotPoint.position.set(currentX, currentY, 0);

      // Fast rotation
      ringMesh.rotation.x = elapsedTime * 2;
      ringMesh.rotation.y = elapsedTime * 2.5;

      // Scale & Color on hover
      const targetScale = isHovered ? 1.5 : 1.0;
      ringMesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.2);

      if (isHovered) {
        ringMat.color.set("#a855f7");
      } else {
        ringMat.color.set("#22d3ee");
      }

      // Trail update
      history.unshift({ x: currentX, y: currentY });
      history.pop();

      const posAttr = trailGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < trailCount; i++) {
        const pt = history[i] || { x: currentX, y: currentY };
        posAttr.setXYZ(i, pt.x, pt.y, 0);
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("resize", handleResize);

      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      ringGeo.dispose();
      ringMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      trailGeo.dispose();
      trailMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

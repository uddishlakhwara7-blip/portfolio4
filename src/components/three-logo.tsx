"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// 5x7 pixel font for the UL monogram
const FONT: Record<string, number[]> = {
  U: [
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    0, 1, 1, 1, 0,
  ],
  L: [
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 1, 1, 1, 1,
  ],
};

function createLetterGroup(
  letter: string,
  size: number,
  material: THREE.MeshStandardMaterial
): THREE.Group {
  const grid = FONT[letter];
  if (!grid) return new THREE.Group();

  const group = new THREE.Group();
  const cols = 5;
  const geo = new THREE.BoxGeometry(size * 0.85, size * 0.85, size * 0.85);

  const positions: [number, number, number][] = [];
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row * cols + col]) {
        positions.push([col * size, (6 - row) * size, 0]);
      }
    }
  }

  // Center the letter
  if (positions.length > 0) {
    const cx = positions.reduce((s, p) => s + p[0], 0) / positions.length;
    const cy = positions.reduce((s, p) => s + p[1], 0) / positions.length;
    for (const [x, y, z] of positions) {
      const mesh = new THREE.Mesh(geo, material);
      mesh.position.set(x - cx, y - cy, z);
      group.add(mesh);
    }
  }

  return group;
}

export default function ThreeLogo() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 16;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Materials
    const cyanMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x22d3ee,
      emissiveIntensity: 0.3,
    });

    const purpleMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0xa855f7,
      emissiveIntensity: 0.3,
    });

    // Logo group
    const logoGroup = new THREE.Group();
    const voxelSize = 0.32;
    const spacing = 5 * voxelSize + 1.2;

    const uGroup = createLetterGroup("U", voxelSize, cyanMat);
    uGroup.position.x = -spacing / 2;
    logoGroup.add(uGroup);

    const lGroup = createLetterGroup("L", voxelSize, purpleMat);
    lGroup.position.x = spacing / 2;
    logoGroup.add(lGroup);

    // Decorative rings around the monogram
    const ringGeo = new THREE.TorusGeometry(3.8, 0.03, 16, 80);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x22d3ee,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.4,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    logoGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(4.5, 0.02, 16, 80);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xa855f7,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.3,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 3;
    logoGroup.add(ring2);

    scene.add(logoGroup);

    // Ambient particles
    const particleCount = 120;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    const cyan = new THREE.Color(0x22d3ee);
    const purple = new THREE.Color(0xa855f7);

    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 22;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 16;

      const c = Math.random() < 0.5 ? cyan : purple;
      pColors[i * 3] = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;
    }

    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));

    // Particle texture
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.3, "rgba(255,255,255,0.5)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }
    const pTexture = new THREE.CanvasTexture(canvas);

    const pMat = new THREE.PointsMaterial({
      size: 0.6,
      vertexColors: true,
      map: pTexture,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Lights
    scene.add(new THREE.AmbientLight(0x1a1a2e, 2));
    const pointLight1 = new THREE.PointLight(0x22d3ee, 5, 30);
    pointLight1.position.set(6, 6, 8);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0xa855f7, 4, 30);
    pointLight2.position.set(-6, -6, 5);
    scene.add(pointLight2);

    // Mouse
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.6;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.6;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      // Floating oscillation
      logoGroup.position.y = Math.sin(t * 0.8) * 0.3;
      logoGroup.rotation.y = Math.sin(t * 0.4) * 0.15;
      logoGroup.rotation.x = Math.cos(t * 0.5) * 0.08;

      // Per-letter micro-rotation
      uGroup.rotation.z = Math.sin(t * 1.2) * 0.04;
      lGroup.rotation.z = Math.sin(t * 1.2 + 1) * 0.04;

      // Ring counter-rotation
      ring1.rotation.z = t * 0.1;
      ring2.rotation.z = -t * 0.08;

      // Mouse follow
      logoGroup.position.x += (mouseX * 1.5 - logoGroup.position.x) * 0.04;
      logoGroup.position.y +=
        (-mouseY * 0.8 - logoGroup.position.y + Math.sin(t * 0.8) * 0.3) *
        0.04;

      // Particle rotation
      particles.rotation.y = t * 0.03;
      particles.rotation.x = t * 0.02;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      renderer.render(scene, camera);
    } else {
      animate();
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      // Dispose geometries and materials
      cyanMat.dispose();
      purpleMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      pGeo.dispose();
      pMat.dispose();
      pTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none h-full w-full"
      aria-hidden="true"
    />
  );
}

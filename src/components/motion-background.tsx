"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type MotionMode = "grid" | "cosmic" | "aurora";

export interface MotionBackgroundProps {
  mode?: MotionMode;
  speed?: number;
  isPaused?: boolean;
}

export default function MotionBackground({
  mode: propMode,
  speed: propSpeed,
  isPaused: propIsPaused,
}: MotionBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentMode, setCurrentMode] = useState<MotionMode>(propMode || "grid");
  const [currentSpeed, setCurrentSpeed] = useState<number>(propSpeed ?? 1);
  const [paused, setPaused] = useState<boolean>(propIsPaused ?? false);
  const [isLightMode, setIsLightMode] = useState<boolean>(false);

  // Sync state from props or window events (from controls widget)
  useEffect(() => {
    if (propMode !== undefined) setCurrentMode(propMode);
    if (propSpeed !== undefined) setCurrentSpeed(propSpeed);
    if (propIsPaused !== undefined) setPaused(propIsPaused);
  }, [propMode, propSpeed, propIsPaused]);

  // Listen for custom settings events from floating HUD controller
  useEffect(() => {
    const handleSettingsChange = (e: CustomEvent) => {
      if (e.detail?.mode) setCurrentMode(e.detail.mode);
      if (e.detail?.speed !== undefined) setCurrentSpeed(e.detail.speed);
      if (e.detail?.isPaused !== undefined) setPaused(e.detail.isPaused);
    };

    window.addEventListener(
      "motion-bg-settings" as any,
      handleSettingsChange as EventListener
    );

    // Initial check & observer for theme change
    const checkTheme = () => {
      setIsLightMode(document.documentElement.dataset.theme === "light");
    };
    checkTheme();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "data-theme") {
          checkTheme();
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      window.removeEventListener(
        "motion-bg-settings" as any,
        handleSettingsChange as EventListener
      );
      observer.disconnect();
    };
  }, []);

  // WebGL Three.js Animation Pipeline
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Remove old canvases if any
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 35);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    let animationFrameId: number;
    let cleanupCurrentMode: () => void = () => {};

    // Mouse & Pointer state
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handlePointerMove);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();

    // ----------------------------------------------------
    // MODE 1: CYBER GRID TERRAIN WAVE
    // ----------------------------------------------------
    if (currentMode === "grid") {
      camera.position.set(0, -14, 26);
      camera.rotation.x = 0.55;

      const width = 80;
      const height = 60;
      const widthSegments = 48;
      const heightSegments = 38;

      const planeGeo = new THREE.PlaneGeometry(
        width,
        height,
        widthSegments,
        heightSegments
      );

      // Store initial z positions for height field wave calculations
      const count = planeGeo.attributes.position.count;
      const initialZ = new Float32Array(count);
      const posAttr = planeGeo.attributes.position;
      for (let i = 0; i < count; i++) {
        initialZ[i] = posAttr.getZ(i);
      }

      const gridColor = isLightMode
        ? new THREE.Color("#0284c7")
        : new THREE.Color("#22d3ee");

      const planeMat = new THREE.MeshBasicMaterial({
        color: gridColor,
        wireframe: true,
        transparent: true,
        opacity: isLightMode ? 0.22 : 0.28,
      });

      const gridMesh = new THREE.Mesh(planeGeo, planeMat);
      scene.add(gridMesh);

      // Add accent particles hovering over grid
      const particleCount = 70;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        pPos[i * 3] = (Math.random() - 0.5) * 70;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
        pPos[i * 3 + 2] = Math.random() * 15;
      }
      pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        size: 0.6,
        color: isLightMode ? "#0e7490" : "#a855f7",
        transparent: true,
        opacity: 0.5,
      });
      const pPoints = new THREE.Points(pGeo, pMat);
      scene.add(pPoints);

      cleanupCurrentMode = () => {
        planeGeo.dispose();
        planeMat.dispose();
        pGeo.dispose();
        pMat.dispose();
      };

      const animateGrid = () => {
        const elapsedTime = clock.getElapsedTime() * currentSpeed;

        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        // Wave deformation based on time and cursor distance
        for (let i = 0; i < count; i++) {
          const x = posAttr.getX(i);
          const y = posAttr.getY(i);

          const distanceToMouse = Math.sqrt(
            Math.pow(x - currentMouseX * 30, 2) +
              Math.pow(y - currentMouseY * 20, 2)
          );

          const rippleEffect = Math.max(0, (1 - distanceToMouse / 20) * 3.5);

          const wave =
            Math.sin(x * 0.25 + elapsedTime * 1.5) * 1.8 +
            Math.cos(y * 0.3 + elapsedTime * 1.2) * 1.5 +
            rippleEffect;

          posAttr.setZ(i, initialZ[i] + wave);
        }
        posAttr.needsUpdate = true;

        gridMesh.rotation.z = Math.sin(elapsedTime * 0.1) * 0.04;
        pPoints.rotation.z = elapsedTime * 0.02;

        renderer.render(scene, camera);
      };

      const renderLoop = () => {
        if (!paused) animateGrid();
        animationFrameId = requestAnimationFrame(renderLoop);
      };
      renderLoop();
    }

    // ----------------------------------------------------
    // MODE 2: COSMIC PARTICLES & INTERACTIVE LINKS
    // ----------------------------------------------------
    else if (currentMode === "cosmic") {
      camera.position.set(0, 0, 40);

      const nodeCount = 90;
      const positions = new Float32Array(nodeCount * 3);
      const velocities: { x: number; y: number; z: number }[] = [];

      for (let i = 0; i < nodeCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 65;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 45;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

        velocities.push({
          x: (Math.random() - 0.5) * 0.04,
          y: (Math.random() - 0.5) * 0.04,
          z: (Math.random() - 0.5) * 0.02,
        });
      }

      const nodeGeo = new THREE.BufferGeometry();
      nodeGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      const nodeMat = new THREE.PointsMaterial({
        size: 1.0,
        color: isLightMode ? "#0284c7" : "#38bdf8",
        transparent: true,
        opacity: 0.85,
      });

      const nodes = new THREE.Points(nodeGeo, nodeMat);
      scene.add(nodes);

      // Line mesh for dynamic connections between nearby nodes
      const maxLines = nodeCount * 8;
      const linePositions = new Float32Array(maxLines * 6);
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(linePositions, 3)
      );

      const lineMat = new THREE.LineBasicMaterial({
        color: isLightMode ? "#0369a1" : "#a855f7",
        transparent: true,
        opacity: isLightMode ? 0.15 : 0.22,
      });

      const lines = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(lines);

      cleanupCurrentMode = () => {
        nodeGeo.dispose();
        nodeMat.dispose();
        lineGeo.dispose();
        lineMat.dispose();
      };

      const animateCosmic = () => {
        const elapsedTime = clock.getElapsedTime() * currentSpeed;

        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        const posAttr = nodeGeo.attributes.position as THREE.BufferAttribute;

        let lineVertexIndex = 0;
        const connectionDistance = 14;

        for (let i = 0; i < nodeCount; i++) {
          let x = posAttr.getX(i) + velocities[i].x * currentSpeed;
          let y = posAttr.getY(i) + velocities[i].y * currentSpeed;
          let z = posAttr.getZ(i) + velocities[i].z * currentSpeed;

          // Bounce boundaries
          if (x < -35 || x > 35) velocities[i].x *= -1;
          if (y < -25 || y > 25) velocities[i].y *= -1;
          if (z < -15 || z > 15) velocities[i].z *= -1;

          // Mouse push away force field
          const mouseX3D = currentMouseX * 30;
          const mouseY3D = currentMouseY * 20;
          const dx = x - mouseX3D;
          const dy = y - mouseY3D;
          const distToMouse = Math.sqrt(dx * dx + dy * dy);

          if (distToMouse < 12 && distToMouse > 0) {
            const force = (12 - distToMouse) * 0.015;
            x += (dx / distToMouse) * force;
            y += (dy / distToMouse) * force;
          }

          posAttr.setXYZ(i, x, y, z);

          // Check proximity to other nodes for connecting lines
          for (let j = i + 1; j < nodeCount; j++) {
            const xj = posAttr.getX(j);
            const yj = posAttr.getY(j);
            const zj = posAttr.getZ(j);

            const dist = Math.sqrt(
              (x - xj) * (x - xj) + (y - yj) * (y - yj) + (z - zj) * (z - zj)
            );

            if (dist < connectionDistance) {
              const linePosAttr = lineGeo.attributes
                .position as THREE.BufferAttribute;
              linePosAttr.setXYZ(lineVertexIndex++, x, y, z);
              linePosAttr.setXYZ(lineVertexIndex++, xj, yj, zj);
            }
          }
        }

        posAttr.needsUpdate = true;
        lineGeo.setDrawRange(0, lineVertexIndex);
        (lineGeo.attributes.position as THREE.BufferAttribute).needsUpdate =
          true;

        nodes.rotation.y = elapsedTime * 0.01;
        lines.rotation.y = elapsedTime * 0.01;

        renderer.render(scene, camera);
      };

      const renderLoop = () => {
        if (!paused) animateCosmic();
        animationFrameId = requestAnimationFrame(renderLoop);
      };
      renderLoop();
    }

    // ----------------------------------------------------
    // MODE 3: AURORA LIQUID GRADIENT & DUST PARTICLES
    // ----------------------------------------------------
    else if (currentMode === "aurora") {
      camera.position.set(0, 0, 30);

      // Light ambient WebGL dust floating particles overlaying CSS aurora blobs
      const dustCount = 140;
      const dustGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(dustCount * 3);

      for (let i = 0; i < dustCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 45;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      }
      dustGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      const dustMat = new THREE.PointsMaterial({
        size: 0.8,
        color: isLightMode ? "#0891b2" : "#a855f7",
        transparent: true,
        opacity: isLightMode ? 0.35 : 0.5,
        blending: THREE.AdditiveBlending,
      });

      const dust = new THREE.Points(dustGeo, dustMat);
      scene.add(dust);

      cleanupCurrentMode = () => {
        dustGeo.dispose();
        dustMat.dispose();
      };

      const animateAurora = () => {
        const elapsedTime = clock.getElapsedTime() * currentSpeed;

        currentMouseX += (targetMouseX - currentMouseX) * 0.04;
        currentMouseY += (targetMouseY - currentMouseY) * 0.04;

        dust.rotation.y = elapsedTime * 0.015 + currentMouseX * 0.1;
        dust.rotation.x = elapsedTime * 0.01 + currentMouseY * 0.1;

        const posAttr = dustGeo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < dustCount; i++) {
          const y = posAttr.getY(i);
          posAttr.setY(i, y + Math.sin(elapsedTime * 0.4 + i) * 0.015);
        }
        posAttr.needsUpdate = true;

        renderer.render(scene, camera);
      };

      const renderLoop = () => {
        if (!paused) animateAurora();
        animationFrameId = requestAnimationFrame(renderLoop);
      };
      renderLoop();
    }

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      cleanupCurrentMode();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [currentMode, currentSpeed, paused, isLightMode]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Dynamic CSS Liquid Ambient Aurora Layer */}
      <div className="absolute inset-0 opacity-70">
        {/* Blob 1: Cyan / Teal Glow */}
        <div
          className={`absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full blur-[110px] animate-aurora-1 ${
            isLightMode
              ? "bg-gradient-to-tr from-cyan-300/30 via-teal-300/25 to-blue-200/20"
              : "bg-gradient-to-tr from-cyan-500/25 via-teal-500/20 to-blue-600/15"
          }`}
          style={{ animationPlayState: paused ? "paused" : "running" }}
        />

        {/* Blob 2: Purple / Violet Glow */}
        <div
          className={`absolute top-1/3 -right-32 h-[550px] w-[550px] rounded-full blur-[120px] animate-aurora-2 ${
            isLightMode
              ? "bg-gradient-to-br from-indigo-300/25 via-purple-300/20 to-pink-200/15"
              : "bg-gradient-to-br from-purple-600/25 via-violet-600/20 to-indigo-700/15"
          }`}
          style={{ animationPlayState: paused ? "paused" : "running" }}
        />

        {/* Blob 3: Center Highlight Glow */}
        <div
          className={`absolute bottom-[-10%] left-1/4 h-[480px] w-[600px] rounded-full blur-[130px] animate-aurora-3 ${
            isLightMode
              ? "bg-gradient-to-r from-sky-200/30 to-teal-200/25"
              : "bg-gradient-to-r from-cyan-600/20 via-blue-600/15 to-purple-600/20"
          }`}
          style={{ animationPlayState: paused ? "paused" : "running" }}
        />
      </div>

      {/* WebGL Canvas Viewport */}
      <div ref={mountRef} className="h-full w-full opacity-85" />
    </div>
  );
}

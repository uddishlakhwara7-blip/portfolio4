"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

export type GeometryShape = "crystal" | "torusKnot" | "sphere" | "cube";
export type ColorPreset = "cyberpunk" | "solar" | "emerald" | "ice";

interface ThreeHeroCanvasProps {
  shape?: GeometryShape;
  preset?: ColorPreset;
  wireframe?: boolean;
  speed?: number;
  exploded?: boolean;
}

const PRESET_COLORS: Record<ColorPreset, { primary: string; secondary: string; ambient: string }> = {
  cyberpunk: { primary: "#22d3ee", secondary: "#c084fc", ambient: "#0f172a" },
  solar: { primary: "#fbbf24", secondary: "#f97316", ambient: "#451a03" },
  emerald: { primary: "#34d399", secondary: "#10b981", ambient: "#064e3b" },
  ice: { primary: "#38bdf8", secondary: "#0284c7", ambient: "#0c4a6e" },
};

export default function ThreeHeroCanvas({
  shape = "crystal",
  preset = "cyberpunk",
  wireframe = false,
  speed = 1,
  exploded = false,
}: ThreeHeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // References for scene elements
  const sceneRef = useRef<THREE.Scene | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const mainMeshRef = useRef<THREE.Mesh | null>(null);
  const wireMeshRef = useRef<THREE.Mesh | null>(null);
  const orbitalGroupRef = useRef<THREE.Group | null>(null);
  const pointLight1Ref = useRef<THREE.PointLight | null>(null);
  const pointLight2Ref = useRef<THREE.PointLight | null>(null);

  // Drag state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0 });
  const mouseTargetRef = useRef({ x: 0, y: 0 });

  const [isLoaded, setIsLoaded] = useState(false);

  // Helper to build geometry
  const createGeometry = useCallback((shapeType: GeometryShape): THREE.BufferGeometry => {
    switch (shapeType) {
      case "torusKnot":
        return new THREE.TorusKnotGeometry(2.4, 0.75, 128, 32);
      case "sphere":
        return new THREE.IcosahedronGeometry(3.2, 3);
      case "cube":
        return new THREE.BoxGeometry(4.2, 4.2, 4.2, 8, 8, 8);
      case "crystal":
      default:
        return new THREE.OctahedronGeometry(3.6, 2);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Clear existing children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(
      PRESET_COLORS[preset].ambient,
      1.5
    );
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(
      PRESET_COLORS[preset].primary,
      4,
      50
    );
    pointLight1.position.set(8, 8, 10);
    scene.add(pointLight1);
    pointLight1Ref.current = pointLight1;

    const pointLight2 = new THREE.PointLight(
      PRESET_COLORS[preset].secondary,
      3.5,
      50
    );
    pointLight2.position.set(-8, -8, -6);
    scene.add(pointLight2);
    pointLight2Ref.current = pointLight2;

    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 12, 12);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.8;
    scene.add(spotLight);

    // Main Group
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);
    meshGroupRef.current = meshGroup;

    // Initial Geometry & Materials
    const geometry = createGeometry(shape);

    const mainMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(PRESET_COLORS[preset].primary),
      metalness: 0.25,
      roughness: 0.15,
      transmission: 0.6,
      opacity: 0.95,
      transparent: true,
      ior: 1.5,
      reflectivity: 0.9,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      wireframe: wireframe,
    });

    const mainMesh = new THREE.Mesh(geometry, mainMaterial);
    meshGroup.add(mainMesh);
    mainMeshRef.current = mainMesh;

    // Outer Wireframe overlay
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(PRESET_COLORS[preset].secondary),
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(geometry, wireMaterial);
    wireMesh.scale.setScalar(1.05);
    meshGroup.add(wireMesh);
    wireMeshRef.current = wireMesh;

    // Orbital Rings & Floating Polyhedrons Group
    const orbitalGroup = new THREE.Group();
    meshGroup.add(orbitalGroup);
    orbitalGroupRef.current = orbitalGroup;

    // Ring 1
    const ringGeo1 = new THREE.TorusGeometry(5.2, 0.04, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: new THREE.Color(PRESET_COLORS[preset].primary),
      metalness: 0.8,
      roughness: 0.2,
      emissive: new THREE.Color(PRESET_COLORS[preset].primary),
      emissiveIntensity: 0.4,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    orbitalGroup.add(ring1);

    // Ring 2
    const ringGeo2 = new THREE.TorusGeometry(6.0, 0.03, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: new THREE.Color(PRESET_COLORS[preset].secondary),
      metalness: 0.9,
      roughness: 0.1,
      emissive: new THREE.Color(PRESET_COLORS[preset].secondary),
      emissiveIntensity: 0.5,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 3;
    orbitalGroup.add(ring2);

    // Small Floating Satellites
    const satGeo = new THREE.TetrahedronGeometry(0.35);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.9,
    });
    for (let i = 0; i < 6; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      const angle = (i / 6) * Math.PI * 2;
      sat.position.set(Math.cos(angle) * 5.4, Math.sin(angle) * 5.4, (Math.random() - 0.5) * 2);
      orbitalGroup.add(sat);
    }

    // Pointer Events
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      const y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
      mouseTargetRef.current = { x, y };

      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      rotationVelocityRef.current = {
        x: deltaY * 0.008,
        y: deltaX * 0.008,
      };

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
        const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

        rotationVelocityRef.current = {
          x: deltaY * 0.008,
          y: deltaX * 0.008,
        };

        previousMousePositionRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaSpeed = speed;

      if (meshGroupRef.current) {
        // Auto Rotation
        if (!isDraggingRef.current) {
          meshGroupRef.current.rotation.y += 0.008 * deltaSpeed;
          meshGroupRef.current.rotation.x += 0.004 * deltaSpeed;
        }

        // Apply Drag Inertia
        meshGroupRef.current.rotation.x += rotationVelocityRef.current.x;
        meshGroupRef.current.rotation.y += rotationVelocityRef.current.y;
        rotationVelocityRef.current.x *= 0.94;
        rotationVelocityRef.current.y *= 0.94;

        // Smooth Mouse Tilt
        const tiltTargetX = mouseTargetRef.current.y * 0.25;
        const tiltTargetY = mouseTargetRef.current.x * 0.25;
        meshGroupRef.current.position.x += (tiltTargetY * 1.5 - meshGroupRef.current.position.x) * 0.05;
        meshGroupRef.current.position.y += (tiltTargetX * 1.5 - meshGroupRef.current.position.y) * 0.05;
      }

      if (orbitalGroupRef.current) {
        orbitalGroupRef.current.rotation.z = elapsedTime * 0.15 * deltaSpeed;
        orbitalGroupRef.current.rotation.x = Math.sin(elapsedTime * 0.3) * 0.2;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    setIsLoaded(true);
    animate();

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      mainMaterial.dispose();
      wireMaterial.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      satGeo.dispose();
      satMat.dispose();
      renderer.dispose();
    };
  }, []);

  // Update Geometry on Shape Change
  useEffect(() => {
    if (!mainMeshRef.current || !wireMeshRef.current) return;

    const newGeo = createGeometry(shape);
    mainMeshRef.current.geometry.dispose();
    wireMeshRef.current.geometry.dispose();

    mainMeshRef.current.geometry = newGeo;
    wireMeshRef.current.geometry = newGeo;
  }, [shape, createGeometry]);

  // Update Preset / Colors
  useEffect(() => {
    const colors = PRESET_COLORS[preset];
    if (pointLight1Ref.current) pointLight1Ref.current.color.set(colors.primary);
    if (pointLight2Ref.current) pointLight2Ref.current.color.set(colors.secondary);

    if (mainMeshRef.current) {
      (mainMeshRef.current.material as THREE.MeshPhysicalMaterial).color.set(colors.primary);
    }
    if (wireMeshRef.current) {
      (wireMeshRef.current.material as THREE.MeshBasicMaterial).color.set(colors.secondary);
    }
  }, [preset]);

  // Update Wireframe mode
  useEffect(() => {
    if (mainMeshRef.current) {
      (mainMeshRef.current.material as THREE.MeshPhysicalMaterial).wireframe = wireframe;
    }
  }, [wireframe]);

  // Update Exploded effect
  useEffect(() => {
    if (!wireMeshRef.current || !orbitalGroupRef.current) return;

    if (exploded) {
      wireMeshRef.current.scale.set(1.45, 1.45, 1.45);
      orbitalGroupRef.current.scale.set(1.35, 1.35, 1.35);
    } else {
      wireMeshRef.current.scale.set(1.05, 1.05, 1.05);
      orbitalGroupRef.current.scale.set(1, 1, 1);
    }
  }, [exploded]);

  return (
    <div className="relative h-full w-full select-none cursor-grab active:cursor-grabbing">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-10 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
        </div>
      )}
      <div ref={containerRef} className="h-full w-full min-h-[320px] md:min-h-[440px]" />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 12;
const TRAIL_FADE = 0.7;

export default function CursorEffects() {
  const orbRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const posRef = useRef({ x: 0, y: 0 });
  const orbPosRef = useRef({ x: 0, y: 0 });
  const trailPosRef = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 }))
  );
  const animRef = useRef<number>(0);
  const hoverRef = useRef(false);

  useEffect(() => {
    // Don't show on touch devices
    if ("ontouchstart" in window) return;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseEnter = () => {
      if (orbRef.current) orbRef.current.style.opacity = "1";
    };

    const onMouseLeave = () => {
      if (orbRef.current) orbRef.current.style.opacity = "0";
    };

    // Detect hoverable elements for orb scale
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']")
      ) {
        hoverRef.current = true;
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']")
      ) {
        hoverRef.current = false;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    // Animation loop
    const animate = () => {
      const { x: tx, y: ty } = posRef.current;
      const orb = orbRef.current;

      // Smooth orb follow
      orbPosRef.current.x += (tx - orbPosRef.current.x) * 0.12;
      orbPosRef.current.y += (ty - orbPosRef.current.y) * 0.12;

      if (orb) {
        const targetScale = hoverRef.current ? 1.8 : 1;
        const currentScale = parseFloat(orb.dataset.scale || "1");
        const newScale = currentScale + (targetScale - currentScale) * 0.08;
        orb.dataset.scale = String(newScale);

        orb.style.transform = `translate3d(${orbPosRef.current.x - 10}px, ${orbPosRef.current.y - 10}px, 0) scale(${newScale})`;
      }

      // Trail: each dot follows the one in front
      for (let i = trailPosRef.current.length - 1; i > 0; i--) {
        trailPosRef.current[i].x += (trailPosRef.current[i - 1].x - trailPosRef.current[i].x) * 0.35;
        trailPosRef.current[i].y += (trailPosRef.current[i - 1].y - trailPosRef.current[i].y) * 0.35;
      }
      trailPosRef.current[0].x += (tx - trailPosRef.current[0].x) * 0.25;
      trailPosRef.current[0].y += (ty - trailPosRef.current[0].y) * 0.25;

      // Update trail DOM
      for (let i = 0; i < trailRefs.current.length; i++) {
        const dot = trailRefs.current[i];
        if (dot) {
          const pos = trailPosRef.current[i];
          const opacity = (1 - i / TRAIL_LENGTH) * TRAIL_FADE;
          const size = 6 - (i / TRAIL_LENGTH) * 4;
          dot.style.transform = `translate3d(${pos.x - size / 2}px, ${pos.y - size / 2}px, 0)`;
          dot.style.opacity = String(opacity);
          dot.style.width = `${size}px`;
          dot.style.height = `${size}px`;
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {/* Glow trail dots */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="fixed top-0 left-0 rounded-full"
          style={{
            width: 6,
            height: 6,
            background: `radial-gradient(circle, rgba(34, 211, 238, 0.9) 0%, rgba(168, 85, 247, 0.6) 50%, transparent 100%)`,
            opacity: 0,
            boxShadow: `0 0 8px rgba(34, 211, 238, 0.5)`,
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Main 3D orb */}
      <div
        ref={orbRef}
        className="fixed top-0 left-0"
        data-scale="1"
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, rgba(34, 211, 238, 0.9), rgba(168, 85, 247, 0.7) 60%, rgba(34, 211, 238, 0.3) 100%)",
          boxShadow: "0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(168, 85, 247, 0.3), inset 0 -2px 4px rgba(0,0,0,0.2)",
          opacity: 0,
          transition: "opacity 0.3s ease",
          willChange: "transform",
        }}
      />
    </div>
  );
}

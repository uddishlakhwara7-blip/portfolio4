"use client";

import { useRef, useCallback, type ReactNode, type MouseEvent as ReactMouseEvent } from "react";

interface MagneticWrapperProps {
  children: ReactNode;
  /** How strongly the element is pulled toward the cursor (px at max) */
  strength?: number;
  /** Activation radius in pixels */
  radius?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Wraps any element to create a 3D magnetic attraction effect.
 * When the cursor enters the radius, the element smoothly pulls toward
 * the cursor with depth (scale + z-lift) and subtle rotation.
 */
export default function MagneticWrapper({
  children,
  strength = 30,
  radius = 180,
  className = "",
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const currentTransform = useRef({ x: 0, y: 0, z: 0, rotX: 0, rotY: 0, scale: 1 });

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;

      cancelAnimationFrame(animationRef.current);

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > radius) {
        // Outside radius — return to rest
        animateTo({ x: 0, y: 0, z: 0, rotX: 0, rotY: 0, scale: 1 });
        return;
      }

      // Normalized strength (stronger when closer)
      const pull = 1 - distance / radius;
      const power = pull * pull; // Quadratic easing for snappy feel

      const targetX = (dx / distance || 0) * strength * power;
      const targetY = (dy / distance || 0) * strength * power;
      const targetZ = 20 * power; // Lift toward cursor
      const targetRotX = -(dy / distance || 0) * 8 * power; // Tilt toward cursor
      const targetRotY = (dx / distance || 0) * 8 * power;
      const targetScale = 1 + 0.06 * power;

      animateTo({
        x: targetX,
        y: targetY,
        z: targetZ,
        rotX: targetRotX,
        rotY: targetRotY,
        scale: targetScale,
      });
    },
    [strength, radius]
  );

  const animateTo = useCallback(
    (target: { x: number; y: number; z: number; rotX: number; rotY: number; scale: number }) => {
      const el = ref.current;
      if (!el) return;

      const start = { ...currentTransform.current };
      const startTime = performance.now();
      const duration = 400;

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Smooth ease-out
        const t = 1 - Math.pow(1 - progress, 3);

        currentTransform.current = {
          x: start.x + (target.x - start.x) * t,
          y: start.y + (target.y - start.y) * t,
          z: start.z + (target.z - start.z) * t,
          rotX: start.rotX + (target.rotX - start.rotX) * t,
          rotY: start.rotY + (target.rotY - start.rotY) * t,
          scale: start.scale + (target.scale - start.scale) * t,
        };

        const c = currentTransform.current;
        el.style.transform = `perspective(800px) translate3d(${c.x}px, ${c.y}px, ${c.z}px) rotateX(${c.rotX}deg) rotateY(${c.rotY}deg) scale3d(${c.scale}, ${c.scale}, ${c.scale})`;

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(tick);
        }
      };

      animationRef.current = requestAnimationFrame(tick);
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    animateTo({ x: 0, y: 0, z: 0, rotX: 0, rotY: 0, scale: 1 });
  }, [animateTo]);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

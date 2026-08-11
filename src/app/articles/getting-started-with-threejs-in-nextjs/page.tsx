import type { Metadata } from "next";
import ArticlePage from "@/components/article-page";
import { articles } from "@/lib/articles";

const meta = articles.find((article) => article.slug === "getting-started-with-threejs-in-nextjs")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.excerpt,
  alternates: {
    canonical: `/articles/${meta.slug}`,
  },
  openGraph: {
    title: meta.title,
    description: meta.excerpt,
    url: `https://www.uddish.online/articles/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <ArticlePage
      title={meta.title}
      description={meta.excerpt}
      date={meta.date}
      readingTime={meta.readingTime}
      tags={meta.tags}
      url={`articles/${meta.slug}`}
      sections={[
        {
          heading: "Why Three.js and Next.js pair well",
          paragraphs: [
            "Next.js gives you a component model, static rendering, and a built-in optimization pipeline; Three.js gives you a full WebGL renderer without writing GLSL by hand. Used carefully, the combination lets you ship genuinely interactive scenes while keeping the rest of the page as fast as a static site.",
            "The tension between them is real, though. Three.js is a browser API — it touches `window`, `document`, and the GPU. Next.js, by default, renders React on the server, where none of those exist. The fix isn't to avoid Three.js; it's to isolate it behind a client-only boundary and load it lazily.",
          ],
        },
        {
          heading: "Install the dependencies",
          paragraphs: [
            "Three.js ships its own TypeScript types, so a single install is all you need:",
          ],
          code: "npm install three\nnpm install -D @types/three",
        },
        {
          heading: "Build the scene as a component",
          paragraphs: [
            "Keep your scene inside one component with a single `useEffect`. Initialize the renderer, camera, and objects there, run the animation loop, and — this is the part people skip — tear everything down when the component unmounts. An orphaned renderer keeps running forever and leaks memory.",
          ],
          code: `"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45, container.clientWidth / container.clientHeight, 0.1, 1000
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x22d3ee });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId: number;
    const animate = () => {
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="h-64 w-full" />;
}`,
        },
        {
          heading: "The critical step: lazy-load it",
          paragraphs: [
            "If you import this component normally, the browser has to download and parse the entire Three.js library before the page can render — even if the scene sits below the fold. The fix is a dynamic import with server-side rendering disabled:",
            "`ssr: false` tells Next.js to skip this component during server rendering (where Three.js would crash anyway) and to load it on the client in a separate bundle. The `loading` prop gives you a placeholder — a spinner, a static gradient — so the layout doesn't jump while the scene hydrates.",
          ],
          code: `import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("@/components/three-scene"), {
  ssr: false,
  loading: () => <ScenePlaceholder />,
});`,
        },
        {
          heading: "Respect reduced motion",
          paragraphs: [
            "Continuous animation is exactly what `prefers-reduced-motion` users asked their OS to opt out of. It costs almost nothing to check:",
            "The same check works for mouse-tracking listeners: if you're not running a loop, don't attach them.",
          ],
          code: `if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  renderer.render(scene, camera); // single static frame
} else {
  animate(); // full loop
}`,
        },
        {
          heading: "What to do next",
          paragraphs: [
            "Once the pattern above is solid — component boundary, dynamic import, cleanup, reduced motion — you have the foundation for anything: particle fields, product configurators, data visualisation.",
          ],
          list: [
            "Add lighting, materials, and post-processing one at a time; measure after each step.",
            "Cap the pixel ratio at 2 (or lower on mobile) — the single highest-impact performance fix.",
            "Use the React DevTools profiler and the browser Performance panel to watch for layout thrash around your canvas.",
            "Read up on draw calls and geometry detail before your scene gets complex — the habits you build now are the ones you'll keep.",
          ],
        },
      ]}
    />
  );
}

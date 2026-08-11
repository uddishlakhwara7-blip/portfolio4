import type { Metadata } from "next";
import ArticlePage from "@/components/article-page";
import { articles } from "@/lib/articles";

const meta = articles.find((article) => article.slug === "webgl-performance-optimization")!;

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
          heading: "Start from the budget, not the scene",
          paragraphs: [
            "A 3D scene that looks amazing on a 60fps developer laptop can melt a mid-range phone. Before adding effects, set a budget: a load budget (how much JavaScript you're willing to ship) and a frame budget (how much time each frame can spend). Core Web Vitals — especially LCP and INP — now directly reward sites that respect those budgets.",
            "The order of operations matters. Do the cheap, high-impact fixes first; they'll get you most of the way, and only then reach for the exotic optimizations.",
          ],
        },
        {
          heading: "Cap the pixel ratio",
          paragraphs: [
            "Rendering at the device's native pixel ratio can mean pushing 4x the pixels of a standard display — for geometry the user barely notices. Capping at 2 is the single highest-value optimization in this entire article.",
            "On phones with 3x displays this alone can roughly double your frame rate.",
          ],
          code: `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));`,
        },
        {
          heading: "Count draw calls before you count triangles",
          paragraphs: [
            "GPUs are extremely good at triangles and surprisingly sensitive to the number of draw calls — each object with a unique material is another call. If your scene has hundreds of small meshes, ask whether they can share a material or be merged into one geometry.",
          ],
          list: [
            "Reuse materials across meshes with similar looks instead of cloning them.",
            "Merge static geometry with tools like BufferGeometryUtils when objects never move.",
            "Prefer a few well-lit objects over dozens of point lights — lights are expensive.",
          ],
        },
        {
          heading: "Choose geometry detail deliberately",
          paragraphs: [
            "`new THREE.TorusKnotGeometry(2.4, 0.75, 128, 32)` is 4,096 segments of smoothness most screens can't resolve. Radial and tubular segments are exponential in cost — 64 × 16 is often visually identical at a fraction of the vertex count. Start low and raise only what visibly matters.",
          ],
        },
        {
          heading: "Eliminate per-frame allocations",
          paragraphs: [
            "Allocating objects inside the animation loop forces the garbage collector to run during your frame — the cause of those mysterious micro-stutters. Allocate once, reuse forever:",
          ],
          list: [
            "Reuse matrices and vectors instead of creating new ones each frame.",
            "Write directly into BufferAttribute arrays and set `needsUpdate` once.",
            "Precompute colors, positions, and scales in typed arrays at setup time.",
            "Avoid cloning materials or geometries in the loop — even accidentally.",
          ],
        },
        {
          heading: "Shrink the JavaScript that has to load",
          paragraphs: [
            "Three.js is a large library, but you only pay for what you import. Dynamic imports with `ssr: false` split your scene into its own bundle that loads after first paint — and tree-shaking keeps unused Three.js modules out entirely.",
            "If a scene is below the fold, consider deferring it even further — mount it when it scrolls into view rather than on first load.",
          ],
          code: `const Scene = dynamic(() => import("@/components/three-scene"), {
  ssr: false,
  loading: () => <ScenePlaceholder />,
});`,
        },
        {
          heading: "Measure before and after every change",
          paragraphs: [
            "Optimization without measurement is guessing. The browser Performance panel will show you long tasks and dropped frames; the three.js examples repo has a `Stats` class that graphs frame time directly. Pick one metric — frame time on a mid-range device — and let every change prove itself against it.",
          ],
        },
      ]}
    />
  );
}

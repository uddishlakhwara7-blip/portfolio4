export type ArticleMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
};

export const articles: ArticleMeta[] = [
  {
    slug: "getting-started-with-threejs-in-nextjs",
    title: "Getting Started with Three.js in Next.js",
    excerpt:
      "A step-by-step guide to adding real-time 3D scenes to a Next.js App Router project — including the lazy-loading and cleanup patterns that keep it fast.",
    date: "August 11, 2026",
    readingTime: "8 min",
    tags: ["Next.js", "Three.js", "WebGL"],
  },
  {
    slug: "webgl-performance-optimization",
    title: "WebGL Performance Optimization: Making 3D Feel Instant",
    excerpt:
      "Draw calls, pixel ratio, geometry detail, and bundle size — the levers that decide whether your 3D scene feels smooth or sluggish on real devices.",
    date: "August 11, 2026",
    readingTime: "7 min",
    tags: ["WebGL", "Performance", "Three.js"],
  },
  {
    slug: "designing-with-depth-3d-on-the-web",
    title: "Designing with Depth: When (and When Not) to Use 3D on the Web",
    excerpt:
      "3D should serve a purpose, not decorate a page. A practical framework for deciding when WebGL earns its place — and how to keep it accessible.",
    date: "August 11, 2026",
    readingTime: "6 min",
    tags: ["Design", "Accessibility", "Motion"],
  },
];

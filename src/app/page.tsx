"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import FaqSection from "@/components/faq-section";
import MagneticWrapper from "@/components/magnetic-wrapper";
import ThreeControlsHud from "@/components/three-controls-hud";
import ThreeTiltCard from "@/components/three-tilt-card";
import type { ColorPreset, GeometryShape } from "@/components/three-hero-canvas";

// WebGL components are heavy (Three.js) — load them only on the client,
// in a separate bundle, so they never block first paint or SSR.
const ThreeHeroCanvas = dynamic(
  () => import("@/components/three-hero-canvas"),
  { ssr: false, loading: () => <CanvasLoading /> }
);

const MotionBackground = dynamic(
  () => import("@/components/motion-background"),
  { ssr: false }
);

const MotionBackgroundControls = dynamic(
  () => import("@/components/motion-background-controls"),
  { ssr: false }
);

const ThreeLogo = dynamic(
  () => import("@/components/three-logo"),
  { ssr: false, loading: () => <CanvasLoading /> }
);


const projects = [
  {
    title: "Studio Landing Page",
    description:
      "A polished marketing site crafted with a strong visual hierarchy, 3D dynamic lighting, and fast loading experience.",
    stack: ["Next.js", "Three.js", "Tailwind CSS"],
    color: "from-cyan-500/20 to-blue-500/10",
  },
  {
    title: "Analytics Dashboard",
    description:
      "A sleek dashboard experience for tracking KPIs, with responsive WebGL charts and real-time interactions.",
    stack: ["React", "TypeScript", "WebGL"],
    color: "from-purple-500/20 to-violet-500/10",
  },
  {
    title: "Creative Portfolio",
    description:
      "A personal showcase designed to highlight work, interactive 3D elements, and visual storytelling in one place.",
    stack: ["Next.js", "3D Graphics", "Vercel"],
    color: "from-emerald-500/20 to-teal-500/10",
  },
];

const skills = [
  "3D WebGL Development",
  "UI/UX Design",
  "Responsive Design",
  "Performance Optimization",
  "Design Systems",
  "Interactive Motion",
];

function CanvasLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="size-10 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
    </div>
  );
}

export default function Home() {
  // 3D Canvas Controls State
  const [shape, setShape] = useState<GeometryShape>("crystal");
  const [preset, setPreset] = useState<ColorPreset>("cyberpunk");
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [exploded, setExploded] = useState<boolean>(false);

  return (
    <main className="relative min-h-screen text-slate-100 overflow-hidden">
      {/* Dynamic Interactive Motion Background & Controls */}
      <MotionBackground />
      <MotionBackgroundControls />

      <section className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 px-6 py-6 sm:px-8 lg:px-10 lg:py-8">
        {/* Navigation */}
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-slate-900/70 px-5 py-3 text-sm text-slate-300 shadow-[0_10px_40px_rgba(2,6,23,0.45)] backdrop-blur-xl">
          <a href="#home" className="font-semibold uppercase tracking-[0.3em] text-white">
            UDDISH LAKHWARA
          </a>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#about" className="transition hover:text-cyan-300">
              About
            </a>
            <a href="#projects" className="transition hover:text-cyan-300">
              Projects
            </a>
            <a href="/articles" className="transition hover:text-cyan-300">
              Articles
            </a>
            <a href="#faq" className="transition hover:text-cyan-300">
              FAQ
            </a>
            <a href="#contact" className="transition hover:text-cyan-300">
              Contact
            </a>
          </div>
        </nav>

        {/* Hero Section with 3D Canvas */}
        <div
          id="home"
          className="grid items-center gap-8 rounded-[2.5rem] border border-white/15 bg-gradient-to-br from-slate-900/85 via-slate-900/60 to-cyan-950/40 p-6 shadow-[0_30px_90px_rgba(2,6,23,0.65)] backdrop-blur-2xl md:grid-cols-[1.1fr_0.9fr] md:p-10 lg:p-12"
        >
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              <span className="size-2 rounded-full bg-cyan-400 animate-ping" />
              Frontend Developer & 3D UI Designer
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-white">
              Building interactive <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-purple-400 bg-clip-text text-transparent">3D digital experiences</span> with depth & motion.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              I blend modern WebGL graphics, user-centered interface design, and high performance frontend code to turn complex ideas into engaging interactive products.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticWrapper strength={20} radius={120}>
                <a
                  href="#projects"
                  className="block rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:-translate-y-0.5 hover:shadow-cyan-400/40"
                >
                  Explore Projects
                </a>
              </MagneticWrapper>
              <MagneticWrapper strength={20} radius={120}>
                <a
                  href="#contact"
                  className="block rounded-full border border-white/20 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-md transition hover:bg-white/15 hover:border-white/30"
                >
                  Get in Touch
                </a>
              </MagneticWrapper>
            </div>

            {/* Interactive 3D Control Bar Toolbar */}
            <div className="mt-8">
              <ThreeControlsHud
                shape={shape}
                setShape={setShape}
                preset={preset}
                setPreset={setPreset}
                wireframe={wireframe}
                setWireframe={setWireframe}
                speed={speed}
                setSpeed={setSpeed}
                exploded={exploded}
                setExploded={setExploded}
              />
            </div>
          </div>

          {/* 3D WebGL Canvas Display */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Ambient Background Glow */}
            <div aria-hidden="true" className="absolute -inset-4 rounded-full bg-cyan-500/20 blur-3xl opacity-60 animate-pulse-glow" />

            <div className="relative h-[340px] sm:h-[400px] w-full rounded-3xl border border-white/15 bg-slate-950/60 p-2 shadow-[0_20px_50px_rgba(2,6,23,0.5)] backdrop-blur-xl">
              <ThreeHeroCanvas
                shape={shape}
                preset={preset}
                wireframe={wireframe}
                speed={speed}
                exploded={exploded}
              />

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-slate-400 shadow-md backdrop-blur-md">
                ✦ Click & Drag to Orbit 3D Geometry
              </div>
            </div>
          </div>
        </div>

        {/* 3D Animated Logo Section */}
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-purple-950/30 shadow-[0_30px_90px_rgba(2,6,23,0.55)] backdrop-blur-2xl">
          <div className="h-[280px] sm:h-[340px] w-full">
            <ThreeLogo />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Monogram</p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Crafted with WebGL &amp; Three.js
            </h2>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="grid gap-8 rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-[0_20px_60px_rgba(2,6,23,0.35)] backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">About Me</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Designing with purpose, rendering with WebGL speed.</h2>
          </div>
          <div className="space-y-4 text-lg leading-8 text-slate-300">
            <p>
              I specialize in crafting rich web experiences that merge standard web design with real-time 3D spatial environments, creating memorable digital moments.
            </p>
            <p>
              By combining robust Next.js frontend architecture with Three.js rendering pipelines, I deliver performant, responsive, and visually expressive applications.
            </p>
          </div>
        </section>

        {/* Projects Section with 3D Tilt Cards */}
        <section id="projects" className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Selected Work</p>
              <h2 className="mt-2 text-3xl font-bold text-white">Featured 3D Projects</h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <MagneticWrapper key={project.title} strength={25} radius={200}>
                <ThreeTiltCard className="h-full">
                  <article className={`flex h-full flex-col justify-between rounded-[1.8rem] border border-white/15 bg-gradient-to-br ${project.color} p-6 shadow-[0_20px_50px_rgba(2,6,23,0.4)] backdrop-blur-xl transition duration-300 hover:border-cyan-400/50`}>
                    <div>
                      <div className="mb-4 inline-block size-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{project.description}</p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/10">
                      {project.stack.map((item) => (
                        <span key={item} className="rounded-full border border-cyan-400/20 bg-slate-900/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                </ThreeTiltCard>
              </MagneticWrapper>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="grid gap-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-900/80 to-violet-500/10 p-8 shadow-[0_20px_60px_rgba(2,6,23,0.25)] backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Core Expertise</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Skills & Technologies</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <MagneticWrapper key={skill} strength={15} radius={100}>
                <ThreeTiltCard maxTilt={8} scale={1.05}>
                  <span className="block rounded-full border border-white/15 bg-slate-900/90 px-4 py-2.5 text-sm font-medium text-slate-100 shadow-md shadow-black/30 backdrop-blur-md">
                    {skill}
                  </span>
                </ThreeTiltCard>
              </MagneticWrapper>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <FaqSection />

        {/* Contact Section */}
        <section id="contact" className="rounded-[2.5rem] border border-cyan-400/40 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 p-8 text-center shadow-[0_25px_70px_rgba(34,211,238,0.15)] backdrop-blur-xl lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Let&apos;s collaborate</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Ready to create something interactive?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            I’m available for freelance 3D web projects, full-time positions, and creative technical partnerships.
          </p>
          <MagneticWrapper strength={25} radius={140}>
            <a
              href="mailto:hello@uddish.online"
              className="mt-8 inline-block rounded-full bg-cyan-400 px-8 py-3.5 font-bold text-slate-950 shadow-lg shadow-cyan-400/30 transition hover:scale-105 hover:bg-cyan-300"
            >
              hello@uddish.online
            </a>
          </MagneticWrapper>
        </section>
      </section>
    </main>
  );
}

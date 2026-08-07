const projects = [
  {
    title: "Studio Landing Page",
    description:
      "A polished marketing site crafted with a strong visual hierarchy and fast loading experience.",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Analytics Dashboard",
    description:
      "A sleek dashboard experience for tracking KPIs, with responsive charts and clean interactions.",
    stack: ["React", "TypeScript", "Chart.js"],
  },
  {
    title: "Creative Portfolio",
    description:
      "A personal showcase designed to highlight work, process, and personality in one place.",
    stack: ["Next.js", "Sanity", "Vercel"],
  },
];

const skills = ["UI Development", "Responsive Design", "Performance Optimization", "Design Systems", "Content Strategy"];

export default function Home() {
  return (
    <main className="min-h-screen text-slate-100">
      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-6 sm:px-8 lg:px-10 lg:py-8">
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-slate-900/60 px-5 py-3 text-sm text-slate-300 shadow-[0_10px_40px_rgba(2,6,23,0.45)] backdrop-blur-xl">
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
            <a href="#faq" className="transition hover:text-cyan-300">
              FAQ
            </a>
            <a href="#contact" className="transition hover:text-cyan-300">
              Contact
            </a>
            <a href="/seo" className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 transition hover:bg-cyan-400/20">
              Extras
            </a>
          </div>
        </nav>

        <div id="home" className="grid items-center gap-6 rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-cyan-950/50 p-6 shadow-[0_30px_80px_rgba(2,6,23,0.55)] backdrop-blur-2xl md:grid-cols-[1.2fr_0.8fr] md:p-10 lg:p-14">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
              Frontend Developer & UI Designer
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              I build immersive digital experiences with depth, motion, and clarity.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              I turn bold ideas into polished websites and applications with a focus on storytelling, usability, and standout visual impact.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-full bg-cyan-400 px-6 py-3 font-medium text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-300"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/20 px-6 py-3 font-medium text-white transition hover:bg-white/10"
              >
                Let&apos;s Talk
              </a>
            </div>
          </div>

        </div>

        <section id="about" className="grid gap-8 rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-[0_20px_60px_rgba(2,6,23,0.35)] lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">About Me</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Designing with purpose and building with care.</h2>
          </div>
          <div className="space-y-4 text-lg leading-8 text-slate-300">
            <p>
              I create web experiences that balance aesthetics with usability, helping brands and individuals make a memorable first impression.
            </p>
            <p>
              My approach blends strategy, frontend craftsmanship, and a deep attention to the small details that make a site feel exceptional.
            </p>
          </div>
        </section>

        <section id="projects" className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Selected Work</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Recent projects</h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <article key={project.title} className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_18px_45px_rgba(2,6,23,0.25)] transition hover:-translate-y-1 hover:border-cyan-400/40">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-8 shadow-[0_20px_60px_rgba(2,6,23,0.25)] lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Skills</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">What I bring to a project</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill} className="rounded-full bg-slate-900/80 px-4 py-2 text-sm text-slate-200 shadow-sm shadow-black/20">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <FaqSection />

        <section id="contact" className="rounded-[2rem] border border-cyan-400/30 bg-cyan-500/10 p-8 text-center shadow-[0_20px_60px_rgba(34,211,238,0.12)] lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Let&apos;s collaborate</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Ready to build something remarkable?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            I’m available for freelance projects, full-time roles, and thoughtful product partnerships.
          </p>
          <a href="mailto:hello@yourname.com" className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200">
            hello@yourname.com
          </a>
        </section>
      </section>
    </main>
  );
}

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
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-20 lg:px-8 lg:py-28">
        <nav className="flex items-center justify-between text-sm text-slate-300">
          <a href="#home" className="font-semibold tracking-[0.25em] text-white uppercase">
            UDDISH LAKHWARA
          </a>
          <div className="flex gap-5">
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#projects" className="transition hover:text-white">
              Projects
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
            <a href="/seo" className="transition hover:text-white">
              Extras
            </a>
          </div>
        </nav>

        <div id="home" className="grid items-center gap-12 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur md:grid-cols-[1.2fr_0.8fr] md:p-12 lg:p-16">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
              Frontend Developer & UI Designer
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              I build thoughtful digital experiences that feel fast, modern, and personal.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              I turn ideas into polished websites and applications with a focus on clarity, accessibility, and visual storytelling.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-full bg-cyan-400 px-6 py-3 font-medium text-slate-950 transition hover:bg-cyan-300"
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

          <div className="flex justify-center md:justify-end">
            <div className="flex h-56 w-56 items-center justify-center rounded-full border border-cyan-400/40 bg-gradient-to-br from-cyan-500 via-slate-700 to-violet-600 text-5xl font-semibold text-white shadow-xl shadow-cyan-500/20">
              YN
            </div>
          </div>
        </div>

        <section id="about" className="grid gap-8 rounded-3xl border border-white/10 bg-slate-900/70 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
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
              <article key={project.title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-cyan-400/40">
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

        <section className="grid gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Skills</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">What I bring to a project</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill} className="rounded-full bg-slate-900/80 px-4 py-2 text-sm text-slate-200">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section id="contact" className="rounded-3xl border border-cyan-400/30 bg-cyan-500/10 p-8 text-center lg:p-12">
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

import Link from "next/link";

type SeoContentPageProps = {
  title: string;
  description: string;
  keyword: string;
  topic: string;
  url: string;
};

function buildSections(keyword: string, topic: string) {
  const sections = [] as Array<{ heading: string; body: string }>;

  for (let index = 0; index < 24; index += 1) {
    const heading = `${topic} insight ${index + 1}`;
    const body = Array.from({ length: 8 }, (_, paragraphIndex) => {
      const paragraph = `When ${keyword} is approached with a clear strategy, the work becomes easier to scale and easier to explain to a wider audience. ${keyword} creates momentum because it connects ideas, execution, and measurement into a single narrative that helps teams stay aligned while they improve their product, their messaging, and their customer journey. In this section, we explore how ${keyword} can guide planning, improve visibility, support confidence, and create lasting value for brands that want to stand out in crowded digital spaces. The strongest results appear when ${keyword} is treated as a living discipline that blends research, creativity, operational discipline, and consistent refinement.`;
      return `${paragraph} ${keyword} also helps teams turn modest opportunities into durable systems. By focusing on evidence, consistency, and user intent, ${keyword} creates a platform for smarter decisions, better content, and deeper trust. The principles behind ${keyword} remain useful across industries because they reinforce clarity, relevance, and measured progress. Each paragraph in this long-form framework reinforces the idea that ${keyword} becomes more powerful when it is tied to audience needs, business context, and purposeful execution.`;
    }).join(" ");

    sections.push({ heading, body });
  }

  return sections;
}

export default function SeoContentPage({
  title,
  description,
  keyword,
  topic,
  url,
}: SeoContentPageProps) {
  const sections = buildSections(keyword, topic);
  const intro = `This page is built to help ${keyword} attract qualified attention through search intent, useful structure, and long-form relevance. The content below uses ${keyword} repeatedly in a natural way while providing detailed guidance for readers who want practical knowledge, strategic context, and clear next steps. By combining editorial depth with a clear page architecture, ${keyword} can support discovery, trust, and sustained visibility across search engines.`;
  const conclusion = `In practice, ${keyword} performs best when it is treated as a durable framework rather than a single tactic. The ideas shared here show that ${keyword} can shape messaging, support growth, and create a stronger foundation for future campaigns. The more consistently ${keyword} is connected to audience needs, the more useful it becomes as both a content strategy and a brand philosophy.`;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-8 lg:px-12">
      <article className="mx-auto flex max-w-6xl flex-col gap-8 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/20 backdrop-blur md:p-12">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.3em] text-cyan-300">
            <span>SEO content</span>
            <span>•</span>
            <span>{keyword}</span>
          </div>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-300">{description}</p>
          <p className="max-w-3xl text-base leading-8 text-slate-400">{intro}</p>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
              Keyword: {keyword}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300">
              Topic: {topic}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300">
              URL: /{url}
            </span>
          </div>
        </header>

        <section className="grid gap-5">
          {sections.map((section, index) => (
            <section key={`${section.heading}-${index}`} className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
              <h2 className="mb-4 text-2xl font-semibold text-white">{section.heading}</h2>
              <p className="text-base leading-8 text-slate-300">{section.body}</p>
            </section>
          ))}
        </section>

        <section className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-6">
          <h2 className="mb-3 text-2xl font-semibold text-white">Conclusion</h2>
          <p className="text-base leading-8 text-slate-200">{conclusion}</p>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm text-slate-400">
          <p>Each page is designed for long-form SEO coverage around {keyword}.</p>
          <Link href="/seo" className="text-cyan-300 transition hover:text-cyan-200">
            Back to SEO index
          </Link>
        </footer>
      </article>
    </main>
  );
}

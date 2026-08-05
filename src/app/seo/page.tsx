import Link from "next/link";

const pages = [
  { slug: "about-uddish", title: "About Uddish" },
  { slug: "uddish-guide", title: "Uddish Guide" },
  { slug: "uddish-strategy", title: "Uddish Strategy" },
  { slug: "uddish-benefits", title: "Benefits of Uddish" },
  { slug: "uddish-tools", title: "Uddish Tools" },
  { slug: "uddish-services", title: "Uddish Services" },
  { slug: "uddish-education", title: "Uddish Education" },
  { slug: "uddish-business", title: "Uddish for Business" },
  { slug: "uddish-marketing", title: "Uddish Marketing" },
  { slug: "uddish-implementation", title: "Uddish Implementation" },
  { slug: "uddish-optimization", title: "Uddish Optimization" },
  { slug: "uddish-insights", title: "Uddish Insights" },
  { slug: "uddish-practices", title: "Uddish Practices" },
  { slug: "uddish-explained", title: "Uddish Explained" },
  { slug: "uddish-results", title: "Uddish Results" },
  { slug: "uddish-ecosystem", title: "Uddish Ecosystem" },
  { slug: "uddish-growth", title: "Uddish Growth" },
  { slug: "uddish-innovation", title: "Uddish Innovation" },
  { slug: "uddish-automation", title: "Uddish Automation" },
  { slug: "uddish-community", title: "Uddish Community" },
  { slug: "uddish-trends", title: "Uddish Trends" },
  { slug: "uddish-technology", title: "Uddish Technology" },
  { slug: "uddish-success", title: "Uddish Success" },
  { slug: "uddish-expertise", title: "Uddish Expertise" },
];

export default function SeoIndexPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">SEO hub</p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Uddish SEO Landing Pages</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            This collection provides 25 long-form landing pages centered on the keyword uddish for search visibility and topical depth.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={`/seo/${page.slug}`}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-cyan-400/40"
            >
              <h2 className="text-xl font-semibold text-white">{page.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">/seo/{page.slug}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import FaqSection from "@/components/faq-section";

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
  { slug: "uddish-vision", title: "Uddish Vision" },
  { slug: "uddish-design", title: "Uddish Design" },
  { slug: "uddish-branding", title: "Uddish Branding" },
  { slug: "uddish-content", title: "Uddish Content" },
  { slug: "uddish-consulting", title: "Uddish Consulting" },
  { slug: "uddish-digital", title: "Uddish Digital" },
  { slug: "uddish-discovery", title: "Uddish Discovery" },
  { slug: "uddish-experience", title: "Uddish Experience" },
  { slug: "uddish-framework", title: "Uddish Framework" },
  { slug: "uddish-future", title: "Uddish Future" },
  { slug: "uddish-identity", title: "Uddish Identity" },
  { slug: "uddish-launch", title: "Uddish Launch" },
  { slug: "uddish-platform", title: "Uddish Platform" },
  { slug: "uddish-process", title: "Uddish Process" },
  { slug: "uddish-research", title: "Uddish Research" },
  { slug: "uddish-solutions", title: "Uddish Solutions" },
  { slug: "uddish-storytelling", title: "Uddish Storytelling" },
  { slug: "uddish-workflow", title: "Uddish Workflow" },
  { slug: "uddish-performance", title: "Uddish Performance" },
  { slug: "uddish-accessibility", title: "Uddish Accessibility" },
  { slug: "uddish-collaboration", title: "Uddish Collaboration" },
];

export default function SeoIndexPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">SEO hub</p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Uddish SEO Landing Pages</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            This collection provides 45 long-form landing pages centered on the keyword uddish for search visibility and topical depth.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/20">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">FAQ</p>
            <h2 className="text-2xl font-semibold text-white">Frequently Asked Questions</h2>
            <div className="space-y-5 text-base leading-8 text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
                <h3 className="text-xl font-semibold text-white">What is the extras section for?</h3>
                <p className="mt-3">The extras section highlights UDDISH-focused SEO landing pages and provides additional context for keyword-driven content strategy.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
                <h3 className="text-xl font-semibold text-white">Why include FAQs here?</h3>
                <p className="mt-3">Including a FAQ in the extras page helps visitors understand how UDDISH is used across the website and improves the page’s informational value.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
                <h3 className="text-xl font-semibold text-white">How does UDDISH support content strategy?</h3>
                <p className="mt-3">UDDISH serves as a unifying theme for strategy, design, and marketing, making it easier to create consistent messaging and SEO relevance.</p>
              </div>
            </div>
          </div>
        </section>

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

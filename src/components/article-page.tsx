import Link from "next/link";

type ArticleSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
  code?: string;
};

type ArticlePageProps = {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  url: string;
  sections: ArticleSection[];
};

const siteUrl = "https://www.uddish.online";

export default function ArticlePage({
  title,
  description,
  date,
  readingTime,
  tags,
  url,
  sections,
}: ArticlePageProps) {
  const fullUrl = `${siteUrl}/${url}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Articles", item: `${siteUrl}/articles` },
      { "@type": "ListItem", position: 3, name: title, item: fullUrl },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-8 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <article className="mx-auto flex max-w-3xl flex-col gap-8">
        <header className="space-y-4">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300 transition hover:text-cyan-200"
          >
            ← Articles
          </Link>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">{title}</h1>
          <p className="text-lg leading-8 text-slate-300">{description}</p>
          <p className="text-sm text-slate-400">
            {date} · {readingTime} read
          </p>
        </header>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.heading} className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">{section.heading}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-base leading-8 text-slate-300">
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className="list-disc space-y-2 pl-6 text-base leading-8 text-slate-300">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.code && (
                <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/90 p-5 text-sm leading-6 text-cyan-200">
                  <code>{section.code}</code>
                </pre>
              )}
            </section>
          ))}
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-slate-400">
          <p>Written by Uddish Lakhwara · {date}</p>
          <div className="flex gap-4">
            <Link href="/articles" className="text-cyan-300 transition hover:text-cyan-200">
              All articles
            </Link>
            <Link href="/" className="text-cyan-300 transition hover:text-cyan-200">
              Back to home
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}

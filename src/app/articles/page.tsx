import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Practical articles on 3D web development, WebGL performance, and interactive design — written by Uddish Lakhwara.",
  alternates: {
    canonical: "/articles",
  },
};

export default function ArticlesIndexPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <header className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300 transition hover:text-cyan-200"
          >
            ← Home
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Articles</p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Notes on 3D web development & interactive design
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            Practical write-ups on building fast, accessible WebGL experiences — the things I learn while
            building real projects.
          </p>
        </header>

        <div className="flex flex-col gap-5">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_20px_50px_rgba(2,6,23,0.5)] sm:p-8"
            >
              <div className="mb-3 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-xs font-semibold text-cyan-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-semibold text-white transition group-hover:text-cyan-200 sm:text-2xl">
                {article.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-400">{article.excerpt}</p>
              <p className="mt-4 text-sm text-slate-500">
                {article.date} · {article.readingTime} read
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

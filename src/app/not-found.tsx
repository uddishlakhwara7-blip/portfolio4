import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 text-slate-100">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl"
      />
      <div className="relative z-10 max-w-xl text-center">
        <p className="text-7xl font-bold tracking-tight text-transparent sm:text-8xl bg-gradient-to-r from-cyan-300 via-teal-200 to-purple-400 bg-clip-text">
          404
        </p>
        <h1 className="mt-6 text-2xl font-semibold text-white sm:text-3xl">
          This page drifted out of orbit
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-400">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back
          somewhere solid.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:-translate-y-0.5 hover:shadow-cyan-400/40"
          >
            Back to Home
          </Link>
          <Link
            href="/articles"
            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-md transition hover:bg-white/15"
          >
            Browse Articles
          </Link>
        </div>
      </div>
    </main>
  );
}

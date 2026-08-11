"use client";

import { startTransition, useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("portfolio-theme") as Theme | null;
    const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    const nextTheme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : preferredTheme;

    startTransition(() => setTheme(nextTheme));
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="fixed right-6 top-6 z-50 grid size-11 place-items-center rounded-full border border-white/20 bg-slate-900/80 text-lg text-white shadow-lg shadow-black/20 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-400/50"
    >
      <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
      <span className="sr-only">{theme === "dark" ? "Use light theme" : "Use dark theme"}</span>
    </button>
  );
}
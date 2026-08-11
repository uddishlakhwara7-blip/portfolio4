const faqItems = [
  {
    question: "What technologies do you work with?",
    answer:
      "I build with Next.js, React, TypeScript, and Tailwind CSS, and I specialise in real-time 3D graphics using Three.js and WebGL for interactive, high-performance web experiences.",
  },
  {
    question: "What kind of projects do you take on?",
    answer:
      "I work on interactive landing pages, WebGL product showcases, dashboards with 3D data visualisation, and any project where motion and depth make the experience genuinely better.",
  },
  {
    question: "Are you available for freelance or full-time work?",
    answer:
      "Yes. I'm open to freelance 3D web projects, full-time frontend roles, and creative technical partnerships — feel free to reach out and we can talk about your project.",
  },
  {
    question: "How can I get in touch?",
    answer:
      "The easiest way is by email at hello@uddish.online — I usually reply within a couple of days.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="grid gap-8 rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-[0_20px_60px_rgba(2,6,23,0.35)] lg:p-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">FAQ</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Frequently Asked Questions</h2>
      </div>
      <div className="space-y-6 text-base leading-8 text-slate-300">
        {faqItems.map((item) => (
          <div key={item.question} className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
            <h3 className="text-xl font-semibold text-white">{item.question}</h3>
            <p className="mt-3">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const faqItems = [
  {
    question: "What does UDDISH mean on this website?",
    answer:
      "UDDISH is the core keyword and content theme used throughout the site. It represents a unified approach to digital strategy, design, and UX that keeps messaging consistent and meaningful.",
  },
  {
    question: "Why is FAQ included on the homepage and extras page?",
    answer:
      "A shared FAQ section helps visitors understand the site’s UDDISH focus and provides quick answers to common questions, improving the experience and the informational value of both pages.",
  },
  {
    question: "How does UDDISH support content strategy?",
    answer:
      "UDDISH serves as a strategic anchor for SEO and messaging. It makes it easier to build coherent page content by connecting keyword relevance to user needs, value propositions, and long-form storytelling.",
  },
  {
    question: "Can I apply UDDISH principles to my own project?",
    answer:
      "Yes. UDDISH is presented as a broadly applicable framework for digital projects, helping you align strategy, design, and growth around a single cohesive idea.",
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

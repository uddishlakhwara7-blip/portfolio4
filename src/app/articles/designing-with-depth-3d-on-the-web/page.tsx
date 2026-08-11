import type { Metadata } from "next";
import ArticlePage from "@/components/article-page";
import { articles } from "@/lib/articles";

const meta = articles.find((article) => article.slug === "designing-with-depth-3d-on-the-web")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.excerpt,
  alternates: {
    canonical: `/articles/${meta.slug}`,
  },
  openGraph: {
    title: meta.title,
    description: meta.excerpt,
    url: `https://www.uddish.online/articles/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <ArticlePage
      title={meta.title}
      description={meta.excerpt}
      date={meta.date}
      readingTime={meta.readingTime}
      tags={meta.tags}
      url={`articles/${meta.slug}`}
      sections={[
        {
          heading: "The question is not 'can we?' — it's 'should we?'",
          paragraphs: [
            "WebGL makes the impossible look easy: interactive scenes, camera orbits, volumetric lighting. But the best 3D on the web is almost always the most restrained. The moment depth stops explaining your product — and starts showing off — it becomes noise between the user and their goal.",
            "Before any 3D decision, write down the job the scene is doing. 'Showcase a physical product from every angle' is a job. 'Look impressive' is not.",
          ],
        },
        {
          heading: "Protect the hierarchy",
          paragraphs: [
            "A spinning 3D object will always out-draw a static headline — that's why it's dangerous. If the 3D competes with your primary message, users look at the wrong thing. Keep the core message, CTA, and navigation in a higher visual layer than the scene, and let the scene sit behind or beside them, never on top.",
            "A useful test: cover the 3D area with your hand. If the page still communicates what it does and what to do next, the hierarchy is safe.",
          ],
        },
        {
          heading: "Give depth a budget, not a blank cheque",
          paragraphs: [
            "Every polygon, light, and post-processing pass is paid for in load time and frame time — on phones you don't control. Set a performance budget up front and treat it like any other constraint:",
          ],
          list: [
            "Cap the renderer's pixel ratio to 2 and target a consistent frame rate on mid-range hardware.",
            "Lazy-load the 3D bundle so the page's text and layout render instantly.",
            "Reserve the heavy scenes for the moments that matter — the hero, the product view — and keep the rest of the site flat.",
            "Fall back to a static image or a gradient when WebGL isn't available or the device is low-power.",
          ],
        },
        {
          heading: "Accessibility is not optional",
          paragraphs: [
            "A beautiful 3D experience that a third of your visitors can't comfortably use isn't complete. Three requirements matter most:",
          ],
          list: [
            "Respect `prefers-reduced-motion` — render a static frame or subtle opacity change instead of continuous animation.",
            "Never put content only inside the 3D scene. Everything meaningful must exist as HTML, text, or an equivalent accessible alternative.",
            "Keep contrast high: gradients and emissive materials can wash out text. Verify every label against WCAG contrast ratios.",
            "Make sure the page is fully operable with a keyboard even if the scene is mouse-and-touch only.",
          ],
        },
        {
          heading: "Motion should feel like physics, not a screensaver",
          paragraphs: [
            "The best interactive motion follows the rules users already know: things accelerate and decelerate, heavy objects move slowly, nothing moves forever. Continuous idle rotation reads as decoration; motion that responds to the cursor feels like the page is listening. Small restraint — gentle easing, a maximum rotation speed, inertia that decays — is what separates craft from gimmick.",
          ],
        },
        {
          heading: "Patterns that genuinely earn their depth",
          paragraphs: [
            "When it works, 3D doesn't feel like a special effect — it feels like the most honest way to show something.",
            "If your project fits one of these patterns, depth will earn its cost. If it doesn't, the most professional decision is often the simplest one: skip the 3D and spend the budget on content, speed, and polish.",
          ],
          list: [
            "Product configurators: letting people rotate, zoom, and restyle a product is faster than any photo carousel.",
            "Data visualisation: real spatial data (maps, molecular structures, volume) is clearer in 3D than in a 2D compromise.",
            "Storytelling moments: a scene that unfolds as the user scrolls can carry a narrative a static page can't.",
            "Ambient atmosphere: subtle depth behind a hero — particles, parallax — adds texture without demanding attention.",
          ],
        },
      ]}
    />
  );
}

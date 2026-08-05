import SeoContentPage from "@/components/seo-content-page";

export const metadata = {
  title: "About Uddish | SEO Content",
  description: "Learn about uddish through a detailed, long-form page designed for SEO and topical authority.",
};

export default function Page() {
  return (
    <SeoContentPage
      title="About Uddish"
      description="Explore a detailed overview of uddish with strategic context, editorial depth, and multiple references woven naturally through the content."
      keyword="uddish"
      topic="Uddish overview"
      url="seo/about-uddish"
    />
  );
}

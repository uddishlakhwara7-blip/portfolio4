import SeoContentPage from "@/components/seo-content-page";

export const metadata = {
  title: "Uddish Insights | SEO Content",
  description: "A keyword-rich uddish insights page focused on long-form value and topical depth.",
};

export default function Page() {
  return (
    <SeoContentPage
      title="Uddish Insights"
      description="This uddish insights page offers a broad perspective on strategy, patterns, and value while keeping the keyword uddish prominent."
      keyword="uddish"
      topic="Uddish insights"
      url="seo/uddish-insights"
    />
  );
}

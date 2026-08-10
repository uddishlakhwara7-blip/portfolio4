import type { MetadataRoute } from "next";

const seoSlugs = [
  "about-uddish",
  "uddish-guide",
  "uddish-strategy",
  "uddish-benefits",
  "uddish-tools",
  "uddish-services",
  "uddish-education",
  "uddish-business",
  "uddish-marketing",
  "uddish-implementation",
  "uddish-optimization",
  "uddish-insights",
  "uddish-practices",
  "uddish-explained",
  "uddish-results",
  "uddish-ecosystem",
  "uddish-growth",
  "uddish-innovation",
  "uddish-automation",
  "uddish-community",
  "uddish-trends",
  "uddish-technology",
  "uddish-success",
  "uddish-expertise",
  "uddish-vision",
  "uddish-design",
  "uddish-branding",
  "uddish-content",
  "uddish-consulting",
  "uddish-digital",
  "uddish-discovery",
  "uddish-experience",
  "uddish-framework",
  "uddish-future",
  "uddish-identity",
  "uddish-launch",
  "uddish-platform",
  "uddish-process",
  "uddish-research",
  "uddish-solutions",
  "uddish-storytelling",
  "uddish-workflow",
  "uddish-performance",
  "uddish-accessibility",
  "uddish-collaboration",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.uddish.online";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/seo`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...seoSlugs.map((slug) => ({
      url: `${baseUrl}/seo/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

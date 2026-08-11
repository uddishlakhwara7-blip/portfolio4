const siteUrl = "https://www.uddish.online";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Uddish Lakhwara",
  url: `${siteUrl}/`,
  image: `${siteUrl}/opengraph-image`,
  jobTitle: "Frontend Developer & 3D UI Designer",
  description:
    "Frontend developer and 3D UI designer building interactive WebGL experiences with Next.js, Three.js, and user-centered design.",
  email: "mailto:hello@uddish.online",
  knowsAbout: [
    "3D WebGL Development",
    "UI/UX Design",
    "Responsive Design",
    "Performance Optimization",
    "Design Systems",
    "Interactive Motion",
    "Next.js",
    "Three.js",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Uddish Lakhwara",
  url: `${siteUrl}/`,
  description:
    "Portfolio of Uddish Lakhwara — frontend developer and 3D UI designer crafting interactive WebGL experiences.",
  inLanguage: "en",
};

const schemas = [personSchema, websiteSchema];

export default function JsonLd() {
  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}

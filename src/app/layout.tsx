import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import ThemeToggle from "@/components/theme-toggle";
import JsonLd from "@/components/json-ld";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteName = "Uddish Lakhwara";
const siteUrl = "https://www.uddish.online";
const siteTitle = `${siteName} | Frontend Developer & 3D UI Designer`;
const siteDescription =
  "Portfolio of Uddish Lakhwara — frontend developer and 3D UI designer crafting interactive WebGL experiences with Next.js, Three.js, and user-centered design.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Uddish Lakhwara",
    "frontend developer",
    "3D web development",
    "WebGL developer",
    "Three.js developer",
    "UI/UX design",
    "interactive web experiences",
    "Next.js developer",
    "creative portfolio",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  // Layout metadata cascades to every route. This canonical is correct while the
  // homepage is the only page — if you add new pages, override `alternates` in
  // their own metadata or every page will canonicalize to the homepage.
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.dataset.theme = localStorage.getItem("portfolio-theme") || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")`,
          }}
        />
        <meta
          name="google-site-verification"
          content="xwcPzX8a1EUYcmmFyVv5km__GAuXPFNCfC4T0uhfkko"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd />
        <ThemeToggle />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_Devanagari } from "next/font/google";
import FocusRefresher from "./components/FocusRefresher";
import {
  DEFAULT_SITE_GENERAL,
  DEFAULT_SITE_SOCIAL,
  SiteSettingsProvider,
} from "./components/SiteSettingsContext";
import { getSiteContent } from "./lib/server/content";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const devanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["500", "600", "700"],
});

const DEFAULT_SEO = {
  metaTitle: "Muslim Legal Aid Trust (India) | मुस्लिम कानूनी सहायता दल भारत",
  metaDescription:
    "Justice • Support • Rehabilitation. Providing legal assistance, rights protection and rehabilitation support for Muslim prisoners and their families.",
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSiteContent("site_seo", DEFAULT_SEO);
  return {
    title: seo.metaTitle || DEFAULT_SEO.metaTitle,
    description: seo.metaDescription || DEFAULT_SEO.metaDescription,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [
        { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [general, social] = await Promise.all([
    getSiteContent("site_general", DEFAULT_SITE_GENERAL),
    getSiteContent("site_social", DEFAULT_SITE_SOCIAL),
  ]);

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${devanagari.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F5F8FC] text-[#0E2238] font-sans">
        <FocusRefresher />
        <SiteSettingsProvider general={general} social={social}>
          {children}
        </SiteSettingsProvider>
      </body>
    </html>
  );
}

import { Anton, Bagel_Fat_One, Bodoni_Moda, Bricolage_Grotesque, Caveat, Fraunces, Instrument_Sans, Instrument_Serif, JetBrains_Mono, Unbounded } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getAll, getCategories, shortCategory } from "@/lib/data";
import { SITE, repoUrl, siteUrl } from "@/lib/site";
import NextLang from "@/components/NextLang";
import LanguageSwitch from "@/components/LanguageSwitch";
import { HEBREW_FONTS_URL, PREVIEW_FONTS_URL } from "@/lib/preview-fonts";

const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument-sans", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument-serif", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
// Display faces for the hero's rotating adjective (each word gets its own voice)
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], display: "swap", preload: false, weight: "800", variable: "--font-bricolage" });
const caveat = Caveat({ subsets: ["latin"], display: "swap", preload: false, weight: "700", variable: "--font-caveat" });
const bagel = Bagel_Fat_One({ subsets: ["latin"], display: "swap", preload: false, weight: "400", variable: "--font-bagel" });
const unbounded = Unbounded({ subsets: ["latin"], display: "swap", preload: false, weight: "300", variable: "--font-unbounded" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], display: "swap", preload: false, weight: "500", style: "italic", variable: "--font-bodoni" });
const anton = Anton({ subsets: ["latin"], display: "swap", preload: false, weight: "400", variable: "--font-anton" });
const fraunces = Fraunces({ subsets: ["latin"], display: "swap", preload: false, axes: ["SOFT", "WONK"], variable: "--font-fraunces" });
const rotatorFonts = [bricolage, caveat, bagel, unbounded, bodoni, anton, fraunces].map((f) => f.variable).join(" ");

export const metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${SITE.name} — Website designs & animated components with Claude prompts`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.author }],
  keywords: ["Claude prompts", "UI components", "Framer Motion", "Tailwind CSS", "React", "micro-interactions", "editorial design", "bento grid", "kinetic typography", "anti AI design"],
  alternates: { canonical: "/", languages: { en: "/", he: "/he", "x-default": "/" } },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: "/",
    locale: SITE.locale,
  },
  twitter: { card: "summary_large_image", title: `${SITE.name} — ${SITE.tagline}`, description: SITE.description },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: "#FAF9F6" };

export default function RootLayout({ children }) {
  const all = getAll();
  const cats = getCategories();
  const short = Object.fromEntries(cats.map((c) => [c, shortCategory(c)]));
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable} ${rotatorFonts}`}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={PREVIEW_FONTS_URL} />
        <link rel="stylesheet" href={HEBREW_FONTS_URL} />
      </head>
      <body className="grain min-h-dvh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
          Skip to content
        </a>
        <NextLang>
          <ToastProvider>
            <SiteHeader count={all.length} />
            <main id="main">{children}</main>
            <SiteFooter categories={cats} shortNames={short} repo={repoUrl()} />
            <LanguageSwitch />
          </ToastProvider>
        </NextLang>
      </body>
    </html>
  );
}

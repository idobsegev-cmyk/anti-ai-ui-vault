import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getAll, getCategories, shortCategory } from "@/lib/data";
import { SITE, siteUrl } from "@/lib/site";

const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument-sans", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument-serif", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${SITE.name} — Animated UI components & Claude prompts that feel human`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.author }],
  keywords: ["Claude prompts", "UI components", "Framer Motion", "Tailwind CSS", "React", "micro-interactions", "editorial design", "bento grid", "kinetic typography", "anti AI design"],
  alternates: { canonical: "/" },
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
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="grain min-h-dvh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
          Skip to content
        </a>
        <ToastProvider>
          <SiteHeader count={all.length} />
          <main id="main">{children}</main>
          <SiteFooter categories={cats} shortNames={short} />
        </ToastProvider>
      </body>
    </html>
  );
}

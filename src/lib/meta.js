// Metadata helpers shared by the English and Hebrew route trees.
import { SITE, siteUrl } from "@/lib/site";

export const HE_NAME = "דוגמית עיצוב";

/** hreflang + canonical for a path that exists in both languages ("/vault/x" ↔ "/he/vault/x"). */
export function alternates(path, lang) {
  const en = path === "" ? "/" : path;
  const he = path === "" ? "/he" : `/he${path}`;
  return { canonical: lang === "he" ? he : en, languages: { en, he, "x-default": en } };
}

export function baseMetadata(lang) {
  const he = lang === "he";
  return {
    metadataBase: new URL(siteUrl()),
    title: {
      default: he ? `${HE_NAME} — עיצוב אתרים ורכיבים מונפשים עם פרומפטים ל-Claude` : `${SITE.name} — Website design examples & animated components with Claude prompts`,
      template: he ? `%s · ${HE_NAME}` : `%s · ${SITE.name}`,
    },
    description: he
      ? "ספרייה חינמית של עיצובי אתרים שלמים ורכיבי ממשק מונפשים ב-16 שפות עיצוב. כל עיצוב רץ חי ומגיע עם קוד React ופרומפט מוכן ל-Claude."
      : SITE.description,
    applicationName: he ? HE_NAME : SITE.name,
    authors: [{ name: SITE.author }],
    creator: SITE.author,
    openGraph: { type: "website", siteName: he ? HE_NAME : SITE.name, locale: he ? "he_IL" : "en_US", alternateLocale: he ? ["en_US"] : ["he_IL"] },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  };
}

export function orgJsonLd() {
  const base = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    alternateName: HE_NAME,
    url: base,
    logo: `${base}/icon.svg`,
    founder: { "@type": "Person", name: SITE.author },
    sameAs: [SITE.instagram, "https://github.com/idobsegev-cmyk/anti-ai-ui-vault"],
  };
}

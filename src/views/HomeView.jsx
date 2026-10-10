import Hero from "@/components/Hero";
import VaultGrid from "@/components/VaultGrid";
import HowItWorks from "@/components/HowItWorks";
import LeadFunnel from "@/components/LeadFunnel";
import Faq from "@/components/Faq";
import Explore from "@/components/Explore";
import JsonLd from "@/components/JsonLd";
import { getAll, getBySlug, getStrip, getCategories, localize, shortCategory } from "@/lib/data";
import { FAQ } from "@/lib/seo-content";
import { SITE, siteUrl } from "@/lib/site";
import { HE_NAME, alternates, orgJsonLd } from "@/lib/meta";

const FEATURED = ["ledgerly-saas-landing-page", "nocturne-hotel-website", "loudmouth-agency-website", "bloom-root-skincare-shop", "sunwave-festival-website", "brutalist-pricing-toggle", "holo-chrome-card", "pixel-arcade-start-button"];

export function homeMetadata(lang) {
  const he = lang === "he";
  const title = he
    ? `${HE_NAME} — דוגמאות לעיצוב אתרים ופרומפטים ל-Claude`
    : `${SITE.name} — Website Design Examples & Claude Prompts`;
  const description = he
    ? "השראה לעיצוב אתרים: 10 אתרים שלמים ו־49 רכיבים מונפשים ב־16 שפות עיצוב, מברוטליזם ועד באוהאוס. כל עיצוב רץ חי ומגיע עם קוד React ופרומפט מוכן ל-Claude. בחינם."
    : "Website design inspiration you can copy: 10 full sites and 49 animated components in 16 design languages, from brutalist to Bauhaus. Each runs live with React code and a ready Claude prompt. Free.";
  return {
    title: { absolute: title },
    description,
    alternates: alternates("", lang),
    openGraph: { title, description, url: he ? "/he" : "/" },
    twitter: { title, description },
  };
}

export default function HomeView({ lang }) {
  const he = lang === "he";
  const items = getAll();
  const featured = FEATURED.map(getBySlug).filter(Boolean);
  const cats = getCategories();
  const short = Object.fromEntries(cats.map((c) => [c, shortCategory(c)]));
  const base = siteUrl();
  const root = he ? `${base}/he` : base;

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, alternateName: HE_NAME, url: root, inLanguage: lang, description: homeMetadata(lang).description },
    orgJsonLd(),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: he ? "ספר הדוגמיות" : "The specimen book",
      url: `${root}#vault`,
      inLanguage: lang,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: items.length,
        itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, url: `${root}/vault/${it.slug}`, name: localize(it, lang).title })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: lang,
      mainEntity: FAQ[lang].map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: `${SITE.name} Studio`,
      url: `${root}#custom`,
      description: he ? "בניית אתרים מותאמים שממירים, עם עיצוב מגזיני ותנועה שכוונה ביד." : "Custom, high-converting websites with editorial design and hand-tuned motion.",
      areaServed: ["IL", "Worldwide"],
      availableLanguage: ["en", "he"],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero count={items.length} featured={featured} strip={getStrip()} />
      <VaultGrid items={items} categories={cats} shortNames={short} />
      <HowItWorks />
      <Explore lang={lang} />
      <Faq lang={lang} />
      <LeadFunnel />
    </>
  );
}

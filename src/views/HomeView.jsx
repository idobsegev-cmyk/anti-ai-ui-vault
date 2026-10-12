import HeroStage from "@/components/HeroStage";
import VaultGrid from "@/components/VaultGrid";
import HowItWorks from "@/components/HowItWorks";
import LeadFunnel from "@/components/LeadFunnel";
import Faq from "@/components/Faq";
import Explore from "@/components/Explore";
import JsonLd from "@/components/JsonLd";
import { HERO_SLUGS, getBySlug, getSites, getStats, localize } from "@/lib/data";
import { faq } from "@/lib/seo-content";
import { SITE, siteUrl } from "@/lib/site";
import { HE_NAME, alternates, orgJsonLd } from "@/lib/meta";


export function homeMetadata(lang) {
  const he = lang === "he";
  const title = he
    ? `${HE_NAME} — דוגמאות לעיצוב אתרים ופרומפטים ל-Claude`
    : `${SITE.name} — Website Design Examples & Claude Prompts`;
  const s = getStats();
  const description = he
    ? `השראה לעיצוב אתרים: ${s.sites} עיצובים של אתרים שלמים ב־${s.styles} שפות עיצוב, מברוטליזם ועד באוהאוס. כל עיצוב רץ חי ומגיע עם קוד React ופרומפט מוכן ל-Claude. בחינם.`
    : `Website design inspiration you can copy: ${s.sites} full website designs in ${s.styles} design languages, from brutalist to Bauhaus. Each runs live with React code and a ready Claude prompt. Free.`;
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
  const items = getSites();
  const base = siteUrl();
  const root = he ? `${base}/he` : base;

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, alternateName: HE_NAME, url: root, inLanguage: lang, description: homeMetadata(lang).description },
    orgJsonLd(),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: he ? "ספר הדוגמיות: עיצובי אתרים מלאים" : "The specimen book: full website designs",
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
      mainEntity: faq(lang, getStats()).map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: `${SITE.name} Studio`,
      url: `${root}#custom`,
      description: he ? "בניית אתרים לעסקים: לוקחים עיצוב מהספרייה, או כיוון חדש, והופכים אותו לאתר אמיתי עם תוכן, עברית ואנגלית, SEO, אחסון וליווי." : "Websites for small businesses: we take a design from the library, or a new direction, and turn it into a real site with content, Hebrew and English, SEO, hosting and ongoing care.",
      areaServed: ["IL", "Worldwide"],
      availableLanguage: ["en", "he"],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <HeroStage count={items.length} items={HERO_SLUGS.map(getBySlug).filter(Boolean)} all={items.map(({ slug, title, style }) => ({ slug, title, style }))} />
      <VaultGrid items={items} />
      <HowItWorks />
      <Explore lang={lang} />
      <Faq lang={lang} />
      <LeadFunnel />
    </>
  );
}

import LabBody from "@/components/LabBody";
import Explore from "@/components/Explore";
import JsonLd from "@/components/JsonLd";
import { getComponents, getComponentCategories, localize, shortCategory } from "@/lib/data";
import { SITE, siteUrl } from "@/lib/site";
import { HE_NAME, alternates } from "@/lib/meta";

const COPY = {
  en: {
    title: "Components Lab — Animated Buttons, Navbars, Forms & More",
    h1: "Components lab",
    description: "Single animated UI components to drop into a site you already have: buttons, navigation, forms, cards, accordions and hero pieces. Live demos, React code and a Claude prompt for each.",
  },
  he: {
    title: "מעבדת רכיבים — כפתורים, תפריטים וטפסים מונפשים",
    h1: "מעבדת רכיבים",
    description: "רכיבי ממשק מונפשים בודדים לשילוב באתר קיים: כפתורים, ניווט, טפסים, כרטיסים, אקורדיונים ואזורי פתיחה. הדגמות חיות, קוד React ופרומפט ל-Claude לכל רכיב.",
  },
};

export function labMetadata(lang) {
  const he = lang === "he";
  const c = COPY[lang];
  return {
    title: { absolute: `${c.title} · ${he ? HE_NAME : SITE.name}` },
    description: c.description,
    alternates: alternates("/components", lang),
    openGraph: { title: c.title, description: c.description, url: he ? "/he/components" : "/components" },
    twitter: { title: c.title, description: c.description },
  };
}

export default function LabView({ lang }) {
  const he = lang === "he";
  const c = COPY[lang];
  const base = siteUrl();
  const root = he ? `${base}/he` : base;
  const url = `${root}/components`;
  const all = getComponents();
  const groups = getComponentCategories().map((cat) => [cat, all.filter((i) => i.category === cat)]).filter(([, l]) => l.length);
  const shortNames = Object.fromEntries(groups.map(([cat]) => [cat, shortCategory(cat)]));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: c.h1,
      description: c.description,
      url,
      inLanguage: lang,
      isPartOf: { "@type": "WebSite", name: SITE.name, url: root },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: all.length,
        itemListElement: all.map((it, i) => ({ "@type": "ListItem", position: i + 1, url: `${root}/vault/${it.slug}`, name: localize(it, lang).title })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: he ? HE_NAME : SITE.name, item: root },
        { "@type": "ListItem", position: 2, name: c.h1, item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <LabBody groups={groups} shortNames={shortNames} />
      <Explore lang={lang} current="components" />
    </>
  );
}

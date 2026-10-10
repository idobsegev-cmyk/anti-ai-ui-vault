import { notFound } from "next/navigation";
import ComponentDetail from "@/components/ComponentDetail";
import Explore from "@/components/Explore";
import JsonLd from "@/components/JsonLd";
import { WEBSITE, getAll, getBySlug, getRelated, localize } from "@/lib/data";
import { CATEGORY_HE, STYLE_HE } from "@/lib/labels";
import { categoryPage, categorySlug, styleSlug } from "@/lib/seo-content";
import { SITE, siteUrl } from "@/lib/site";
import { HE_NAME, alternates } from "@/lib/meta";

export function detailMetadata(slug, lang) {
  const item = getBySlug(slug);
  if (!item) return {};
  const he = lang === "he";
  const L = localize(item, lang);
  const isSite = item.category === WEBSITE;
  const kind = he
    ? isSite ? "עיצוב אתר מלא" : `${CATEGORY_HE[item.category] || "רכיב"}`
    : isSite ? "Website design" : item.category.replace(/s$/, "").replace(/ Sections$| Grids$| Banners$| Bars$/, "");
  const style = he ? STYLE_HE[item.style] || item.style : item.style;
  const title = he ? `${L.title} — ${kind} בסגנון ${style} עם פרומפט ל-Claude` : `${L.title} — ${style} ${isSite ? "website design" : "UI component"} + Claude prompt`;
  const description = he
    ? `${L.description} תצוגה חיה, קוד React + Tailwind + Framer Motion ופרומפט מוכן להעתקה.`
    : `${L.description} Live preview, React + Tailwind + Framer Motion code and a copy-ready Claude prompt.`;
  return {
    title: { absolute: title.length > 70 ? `${L.title} — ${he ? "עיצוב ופרומפט ל-Claude" : "design + Claude prompt"}` : title },
    description,
    keywords: [...item.tags, item.category, item.style, he ? "פרומפט ל-Claude" : "Claude prompt"],
    alternates: alternates(`/vault/${item.slug}`, lang),
    openGraph: { type: "article", title, description, url: `${he ? "/he" : ""}/vault/${item.slug}` },
    twitter: { title, description },
  };
}

export function detailParams() {
  return getAll().map((p) => ({ slug: p.slug }));
}

export default function DetailView({ slug, lang }) {
  const item = getBySlug(slug);
  if (!item) notFound();
  const he = lang === "he";
  const all = getAll();
  const idx = all.findIndex((p) => p.slug === slug);
  const prev = all[(idx - 1 + all.length) % all.length];
  const next = all[(idx + 1) % all.length];
  const related = getRelated(item);
  const base = siteUrl();
  const root = he ? `${base}/he` : base;
  const url = `${root}/vault/${item.slug}`;
  const L = localize(item, lang);
  const cat = categoryPage(categorySlug(item.category));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      name: L.title,
      alternateName: he ? item.title : undefined,
      description: L.description,
      url,
      inLanguage: lang,
      codeSampleType: "full solution",
      programmingLanguage: ["JavaScript", "React", "JSX"],
      runtimePlatform: "Web browser",
      keywords: [...item.tags, item.style].join(", "),
      text: item.previewCode,
      dateCreated: item.addedAt,
      license: "https://opensource.org/licenses/MIT",
      isPartOf: { "@type": "WebSite", name: SITE.name, url: root },
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: he ? `${L.title} — פרומפט ל-Claude` : `${L.title} — Claude prompt`,
      about: item.category,
      genre: item.style,
      description: he ? `פרומפט ל-Claude שבונה את „${L.title}”.` : `A design prompt for Claude that builds the "${item.title}" ${item.category === WEBSITE ? "website" : "component"}.`,
      text: item.claudePrompt,
      url: `${url}#prompt`,
      keywords: item.tags.join(", "),
      dateCreated: item.addedAt,
      author: { "@type": "Person", name: SITE.author },
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: he ? HE_NAME : SITE.name, item: root },
        { "@type": "ListItem", position: 2, name: cat ? cat[lang].h1 : item.category, item: `${root}/designs/${categorySlug(item.category)}` },
        { "@type": "ListItem", position: 3, name: L.title, item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <ComponentDetail item={item} prev={prev} next={next} related={related} />
      <Explore lang={lang} current={styleSlug(item.style)} />
    </>
  );
}

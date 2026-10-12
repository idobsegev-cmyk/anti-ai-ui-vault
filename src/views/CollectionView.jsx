import Link from "next/link";
import { notFound } from "next/navigation";
import { VaultCard } from "@/components/VaultGrid";
import Explore from "@/components/Explore";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { WEBSITE, getAll, localize } from "@/lib/data";
import { CATEGORY_PAGES, STYLE_PAGES, categoryPage, stylePage } from "@/lib/seo-content";
import { SITE, siteUrl } from "@/lib/site";
import { HE_NAME, alternates } from "@/lib/meta";

function resolve(kind, slug) {
  const page = kind === "designs" ? categoryPage(slug) : stylePage(slug);
  if (!page) return null;
  const items = getAll().filter((it) => (kind === "designs" ? it.category === page.key : (it.style || "Warm Editorial") === page.key));
  // Full sites first: they are the strongest examples of a style
  items.sort((a, b) => (b.category === WEBSITE) - (a.category === WEBSITE));
  return { page, items };
}

export function collectionParams(kind) {
  return (kind === "designs" ? CATEGORY_PAGES : STYLE_PAGES).map((p) => ({ slug: p.slug }));
}

export function collectionMetadata(kind, slug, lang) {
  const r = resolve(kind, slug);
  if (!r) return {};
  const c = r.page[lang];
  const path = `/${kind}/${slug}`;
  return {
    title: { absolute: `${c.title} · ${lang === "he" ? HE_NAME : SITE.name}` },
    description: c.description,
    alternates: alternates(path, lang),
    openGraph: { title: c.title, description: c.description, url: `${lang === "he" ? "/he" : ""}${path}` },
    twitter: { title: c.title, description: c.description },
  };
}

export default function CollectionView({ kind, slug, lang }) {
  const r = resolve(kind, slug);
  if (!r) notFound();
  const { page, items } = r;
  const c = page[lang];
  const he = lang === "he";
  const base = siteUrl();
  const root = he ? `${base}/he` : base;
  const url = `${root}/${kind}/${slug}`;
  const sites = items.filter((i) => i.category === WEBSITE);
  const parts = items.filter((i) => i.category !== WEBSITE);
  // A component category (buttons, navbars...) is a lab page: it links back to the lab, not to the main catalogue.
  const listed = sites.length > 0 ? sites : items; // JSON-LD lists the sites first; a components-only page lists its components
  const isLab = kind === "designs" && page.key !== WEBSITE;
  const labUrl = `${root}/components`;
  const labName = he ? "מעבדת רכיבים" : "Components lab";

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
        numberOfItems: listed.length,
        itemListElement: listed.map((it, i) => ({ "@type": "ListItem", position: i + 1, url: `${root}/vault/${it.slug}`, name: localize(it, lang).title })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: he ? HE_NAME : SITE.name, item: root },
        ...(isLab ? [{ "@type": "ListItem", position: 2, name: labName, item: labUrl }] : []),
        { "@type": "ListItem", position: isLab ? 3 : 2, name: c.h1, item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="pt-24 md:pt-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 border-b border-ink pb-2 label">
            <Link href={he ? "/he" : "/"} className="focus-ring hover:underline">{he ? HE_NAME : SITE.name}</Link>
            <span className="text-ink-3">/</span>
            {isLab ? (
              <Link href={he ? "/he/components" : "/components"} className="focus-ring hover:underline">{labName}</Link>
            ) : (
              <span className="text-ink-3">{kind === "designs" ? (he ? "סוגים" : "Types") : he ? "סגנונות" : "Styles"}</span>
            )}
            <span className="ms-auto text-ink-3">{sites.length > 0 ? sites.length : items.length} {sites.length > 0 ? (he ? "עיצובים" : "designs") : he ? "רכיבים" : "components"}</span>
          </nav>
          <header className="grid grid-cols-12 gap-6 py-10 md:py-14">
            <h1 className="col-span-12 text-[clamp(2.4rem,6vw,5.6rem)] font-semibold leading-[0.92] tracking-[-0.05em] [text-wrap:balance] lg:col-span-7 rtl:tracking-[-0.02em]">{c.h1}</h1>
            <p className="col-span-12 self-end text-lg leading-snug text-ink-2 lg:col-span-5">{c.intro}</p>
          </header>

          {sites.length > 0 && (
            <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-2">
              {sites.map((it, i) => <VaultCard key={it.slug} item={it} index={i} />)}
            </div>
          )}
          {parts.length > 0 && (
            <div className="pb-16">
              {sites.length > 0 && (
                <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2 border-b border-ink pb-3">
                  <h2 className="text-xl font-semibold tracking-[-0.02em]">{he ? "ועוד מהמעבדה" : "More from the components lab"}</h2>
                  <Link href={he ? "/he/components" : "/components"} className="focus-ring text-sm text-ink-2 underline underline-offset-4">{labName}</Link>
                </div>
              )}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {parts.map((it, i) => <VaultCard key={it.slug} item={it} index={i} />)}
              </div>
            </div>
          )}
          {items.length === 0 && <p className="pb-16 text-ink-3">{he ? "עיצובים חדשים בסגנון הזה בדרך." : "New designs in this style are on the way."}</p>}
        </div>
      </section>
      <Explore lang={lang} current={slug} />
      <Faq lang={lang} />
    </>
  );
}

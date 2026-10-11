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
        numberOfItems: items.length,
        itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, url: `${root}/vault/${it.slug}`, name: localize(it, lang).title })),
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
      <section className="pt-24 md:pt-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 border-b border-ink pb-2 label">
            <Link href={he ? "/he" : "/"} className="focus-ring hover:underline">{he ? HE_NAME : SITE.name}</Link>
            <span className="text-ink-3">/</span>
            <span className="text-ink-3">{kind === "designs" ? (he ? "סוגים" : "Types") : he ? "סגנונות" : "Styles"}</span>
            <span className="ms-auto text-ink-3">{items.length} {he ? "עיצובים" : "designs"}</span>
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
            <div className="grid grid-cols-1 gap-4 pb-16 sm:grid-cols-2 lg:grid-cols-3">
              {parts.map((it, i) => <VaultCard key={it.slug} item={it} index={i} />)}
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

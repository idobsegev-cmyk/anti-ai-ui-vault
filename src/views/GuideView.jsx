import Link from "next/link";
import { notFound } from "next/navigation";
import Explore from "@/components/Explore";
import LeadFunnel from "@/components/LeadFunnel";
import JsonLd from "@/components/JsonLd";
import { GuideBody, GuideToc, GuideMeta, GuideLabel, GuideDesigns, GuideCard, GuideCta, GuideFaq } from "@/components/GuideArticle";
import { getBySlug, localize } from "@/lib/data";
import { GUIDES, GUIDE_HUB, guideBySlug, wordCount } from "@/lib/guides-content";
import { SITE, siteUrl } from "@/lib/site";
import { HE_NAME, alternates } from "@/lib/meta";

// Long-form SEO guides: /guides (hub) and /guides/[slug].

const brand = (he) => (he ? HE_NAME : SITE.name);
const roots = (lang) => {
  const base = siteUrl();
  return { base, root: lang === "he" ? `${base}/he` : base };
};
const minutesOf = (g, lang) => Math.max(1, Math.ceil(wordCount(g[lang].body) / 220));
const plain = (s) => s.replace(/\*\*|`/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

export function guideParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function guideMetadata(slug, lang) {
  const c = slug ? guideBySlug(slug)?.[lang] : GUIDE_HUB[lang];
  if (!c) return {};
  const path = slug ? `/guides/${slug}` : "/guides";
  const og = { title: c.title, description: c.description, url: `${lang === "he" ? "/he" : ""}${path}` };
  return {
    title: { absolute: `${c.title} · ${brand(lang === "he")}` },
    description: c.description,
    alternates: alternates(path, lang),
    openGraph: slug ? { ...og, type: "article" } : og,
    twitter: { title: c.title, description: c.description },
  };
}

function Breadcrumb({ lang, trail }) {
  const he = lang === "he";
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 border-b border-ink pb-2 label">
      <Link href={he ? "/he" : "/"} className="focus-ring hover:underline">{brand(he)}</Link>
      {trail.map(([label, href]) => (
        <span key={label} className="flex items-center gap-2">
          <span className="text-ink-3">/</span>
          {href ? <Link href={href} className="focus-ring hover:underline">{label}</Link> : <span className="text-ink-3">{label}</span>}
        </span>
      ))}
    </nav>
  );
}

const crumbLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item })),
});

export function GuideHubView({ lang }) {
  const he = lang === "he";
  const c = GUIDE_HUB[lang];
  const { root } = roots(lang);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: c.h1,
      description: c.description,
      url: `${root}/guides`,
      inLanguage: lang,
      hasPart: GUIDES.map((g) => ({ "@type": "Article", headline: g[lang].h1, url: `${root}/guides/${g.slug}` })),
    },
    crumbLd([[brand(he), root], [c.h1, `${root}/guides`]]),
  ];
  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="pt-24 md:pt-28">
        <div className="mx-auto max-w-[1400px] px-5 pb-16 md:px-8">
          <Breadcrumb lang={lang} trail={[[c.h1]]} />
          <header className="grid grid-cols-12 gap-6 py-10 md:py-14">
            <h1 className="col-span-12 text-[clamp(2.4rem,6vw,5.6rem)] font-semibold leading-[0.92] tracking-[-0.05em] [text-wrap:balance] lg:col-span-7 rtl:tracking-[-0.02em]">{c.h1}</h1>
            <p className="col-span-12 self-end text-lg leading-snug text-ink-2 lg:col-span-5">{c.intro}</p>
          </header>
          <p className="border-t border-ink pt-3 label text-ink-3"><GuideLabel k="count" n={GUIDES.length} /></p>
          <ul className="grid grid-cols-1 gap-5 py-8 md:grid-cols-2">
            {GUIDES.map((g, i) => (
              <li key={g.slug}>
                <GuideCard index={i} guide={{ slug: g.slug, kicker: g[lang].kicker, h1: g[lang].h1, description: g[lang].description, minutes: minutesOf(g, lang) }} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <LeadFunnel />
      <Explore lang={lang} current="guides" />
    </>
  );
}

export default function GuideView({ slug, lang }) {
  const guide = guideBySlug(slug);
  if (!guide) notFound();
  const he = lang === "he";
  const c = guide[lang];
  const { base, root } = roots(lang);
  const url = `${root}/guides/${slug}`;
  const minutes = minutesOf(guide, lang);
  const headings = c.body.filter((b) => b[0] === "h2").map((b) => plain(b[1]));
  const designs = guide.designs.map(getBySlug).filter(Boolean).map((d) => ({ ...d, ...localize(d, lang) }));
  const related = guide.related.map(guideBySlug).filter(Boolean);
  const org = { "@type": "Organization", name: SITE.name, alternateName: HE_NAME, url: root, logo: { "@type": "ImageObject", url: `${base}/icon.svg` } };
  const hubPath = he ? "/he/guides" : "/guides";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: c.h1,
      description: c.description,
      inLanguage: lang,
      datePublished: guide.date,
      dateModified: guide.date,
      author: org,
      publisher: org,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
    crumbLd([[brand(he), root], [GUIDE_HUB[lang].h1, `${root}/guides`], [c.h1, url]]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <article className="pt-24 md:pt-28">
        <div className="mx-auto max-w-[1400px] px-5 pb-16 md:px-8">
          <Breadcrumb lang={lang} trail={[[GUIDE_HUB[lang].h1, hubPath], [c.short]]} />
          <header className="py-10 md:py-14">
            <p className="label text-terracotta">{c.kicker}</p>
            <h1 className="mt-3 max-w-5xl text-[clamp(2.2rem,5.2vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.045em] [text-wrap:balance] rtl:tracking-[-0.02em]">{c.h1}</h1>
            <p className="mt-6 max-w-3xl text-xl leading-snug text-ink-2">{c.intro}</p>
            <div className="mt-6"><GuideMeta minutes={minutes} date={guide.date} /></div>
          </header>
          <div className="grid grid-cols-12 gap-8 border-t border-ink pt-8 lg:gap-12">
            <aside className="col-span-12 lg:col-span-3"><GuideToc headings={headings} /></aside>
            <div className="col-span-12 max-w-3xl lg:col-span-9"><GuideBody body={c.body} /></div>
          </div>
          <div className="mx-auto max-w-[1400px] lg:ps-[calc(25%+1rem)]">
            <GuideDesigns designs={designs} />
            <GuideFaq faq={c.faq} />
            {related.length > 0 && (
              <section aria-labelledby="guide-more" className="mt-16">
                <h2 id="guide-more" className="border-t border-ink pt-3 label text-ink-3"><GuideLabel k="more" /></h2>
                <ul className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {related.map((g, i) => (
                    <li key={g.slug}>
                      <GuideCard index={i} guide={{ slug: g.slug, kicker: g[lang].kicker, h1: g[lang].h1, description: g[lang].description, minutes: minutesOf(g, lang) }} />
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <GuideCta />
          </div>
        </div>
      </article>
      <LeadFunnel />
      <Explore lang={lang} current={slug} />
    </>
  );
}

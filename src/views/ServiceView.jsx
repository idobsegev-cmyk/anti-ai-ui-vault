import Link from "next/link";
import { notFound } from "next/navigation";
import { VaultCard } from "@/components/VaultGrid";
import Explore from "@/components/Explore";
import LeadFunnel from "@/components/LeadFunnel";
import JsonLd from "@/components/JsonLd";
import { WEBSITE, getAll, getBySlug, localize } from "@/lib/data";
import { SERVICE_HUB, SERVICE_PAGES, servicePage } from "@/lib/services-content";
import { SITE, siteUrl } from "@/lib/site";
import { HE_NAME, alternates } from "@/lib/meta";

// Commercial landing pages: /services (hub) and /services/[slug] (one per industry).

const brand = (he) => (he ? HE_NAME : SITE.name);
const roots = (lang) => {
  const base = siteUrl();
  return { base, root: lang === "he" ? `${base}/he` : base };
};

export function serviceParams() {
  return SERVICE_PAGES.map((p) => ({ slug: p.slug }));
}

export function serviceMetadata(slug, lang) {
  const c = slug ? servicePage(slug)?.[lang] : SERVICE_HUB[lang];
  if (!c) return {};
  const path = slug ? `/services/${slug}` : "/services";
  return {
    title: { absolute: `${c.title} · ${brand(lang === "he")}` },
    description: c.description,
    alternates: alternates(path, lang),
    openGraph: { title: c.title, description: c.description, url: `${lang === "he" ? "/he" : ""}${path}` },
    twitter: { title: c.title, description: c.description },
  };
}

function providerLd(lang) {
  const { base, root } = roots(lang);
  return {
    "@type": "ProfessionalService",
    name: SITE.name,
    alternateName: HE_NAME,
    url: root,
    logo: `${base}/icon.svg`,
    sameAs: [SITE.instagram],
  };
}

function faqLd(faq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
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

function Header({ h1, intro, cta, ctaHref }) {
  return (
    <header className="grid grid-cols-12 gap-6 py-10 md:py-14">
      <h1 className="col-span-12 text-[clamp(2.4rem,6vw,5.6rem)] font-semibold leading-[0.92] tracking-[-0.05em] [text-wrap:balance] lg:col-span-7 rtl:tracking-[-0.02em]">{h1}</h1>
      <div className="col-span-12 flex flex-col items-start gap-5 self-end lg:col-span-5">
        <p className="text-lg leading-snug text-ink-2">{intro}</p>
        <a href={ctaHref} className="focus-ring inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-paper shadow-[3px_3px_0_#121212] transition-transform hover:-translate-y-0.5">
          {cta}
        </a>
      </div>
    </header>
  );
}

function FaqList({ lang, faq }) {
  const he = lang === "he";
  return (
    <section className="border-b border-ink" aria-labelledby="svc-faq-title">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8 px-5 py-16 md:px-8 md:py-20">
        <h2 id="svc-faq-title" className="col-span-12 text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[0.95] tracking-[-0.04em] md:col-span-4 rtl:tracking-[-0.01em]">
          {he ? "שאלות נפוצות" : "Questions, answered"}
        </h2>
        <div className="col-span-12 border-t border-ink md:col-span-8">
          {faq.map(([q, a]) => (
            <details key={q} className="group border-b border-ink">
              <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold tracking-tight [&::-webkit-details-marker]:hidden">
                <h3>{q}</h3>
                <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-2xl pb-5 text-base leading-relaxed text-ink-2">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustryLinks({ lang, current }) {
  const he = lang === "he";
  const p = (x) => (he ? `/he${x}` : x);
  return (
    <nav aria-label={SERVICE_HUB[lang].industriesTitle} className="flex flex-wrap gap-2">
      {SERVICE_PAGES.map((s) => (
        <Link
          key={s.slug}
          href={p(`/services/${s.slug}`)}
          className={`focus-ring rounded-full border px-3.5 py-1.5 text-sm transition-colors ${current === s.slug ? "border-ink bg-ink text-paper" : "border-ink/30 hover:border-ink"}`}
        >
          {s[lang].h1}
        </Link>
      ))}
    </nav>
  );
}

const ctaText = (he) => (he ? "לבריף קצר ←" : "Start a brief →");

export function ServiceHubView({ lang }) {
  const he = lang === "he";
  const c = SERVICE_HUB[lang];
  const { root } = roots(lang);
  const url = `${root}/services`;
  const sites = getAll().filter((i) => i.category === WEBSITE);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: c.h1,
      description: c.description,
      url,
      serviceType: he ? "בניית אתרים" : "Website design and development",
      inLanguage: lang,
      areaServed: [{ "@type": "Country", name: "Israel" }, "Worldwide"],
      provider: providerLd(lang),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: c.industriesTitle,
        itemListElement: SERVICE_PAGES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s[lang].h1, url: `${root}/services/${s.slug}` } })),
      },
    },
    faqLd(c.faq),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: brand(he), item: root },
        { "@type": "ListItem", position: 2, name: c.h1, item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="pt-24 md:pt-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <Breadcrumb lang={lang} trail={[[he ? "שירותים" : "Services"]]} />
          <Header h1={c.h1} intro={c.intro} cta={ctaText(he)} ctaHref="#custom" />

          <h2 className="border-t border-ink pt-3 label text-ink-3">{he ? "מה כלול" : "What's included"}</h2>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-6 py-8 sm:grid-cols-2 lg:grid-cols-3">
            {c.included.map(([t, d], i) => (
              <li key={t} className="border-t border-ink/20 pt-4">
                <span className="font-mono text-[11px] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 text-xl font-semibold tracking-tight">{t}</h3>
                <p className="mt-1.5 text-ink-2">{d}</p>
              </li>
            ))}
          </ul>

          <h2 className="border-t border-ink pt-3 label text-ink-3">{he ? "איך זה עובד" : "How it works"}</h2>
          <ol className="grid grid-cols-1 gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.steps.map(([t, d], i) => (
              <li key={t}>
                <span className="text-4xl font-semibold tracking-[-0.04em] text-cobalt">{i + 1}</span>
                <h3 className="mt-1 text-lg font-semibold">{t}</h3>
                <p className="mt-1 text-ink-2">{d}</p>
              </li>
            ))}
          </ol>

          <h2 className="border-t border-ink pt-3 label text-ink-3">{c.industriesTitle}</h2>
          <div className="py-8"><IndustryLinks lang={lang} /></div>

          <h2 className="border-t border-ink pt-3 label text-ink-3">{he ? "דוגמאות לעבודה" : "Sample work"}</h2>
          <div className="grid grid-cols-1 gap-5 py-8 md:grid-cols-2">
            {sites.slice(0, 4).map((it, i) => <VaultCard key={it.slug} item={it} index={i} />)}
          </div>
        </div>
      </section>
      <FaqList lang={lang} faq={c.faq} />
      <LeadFunnel />
      <Explore lang={lang} />
    </>
  );
}

export default function ServiceDetailView({ slug, lang }) {
  const page = servicePage(slug);
  if (!page) notFound();
  const he = lang === "he";
  const c = page[lang];
  const hub = SERVICE_HUB[lang];
  const { root } = roots(lang);
  const url = `${root}/services/${slug}`;
  const hubPath = he ? "/he/services" : "/services";
  const designs = page.designs.map(getBySlug).filter(Boolean);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: c.h1,
      description: c.description,
      url,
      serviceType: he ? "בניית אתרים" : "Website design and development",
      inLanguage: lang,
      areaServed: [{ "@type": "Country", name: "Israel" }, "Worldwide"],
      provider: providerLd(lang),
      subjectOf: designs.map((d) => ({ "@type": "CreativeWork", name: localize(d, lang).title, url: `${root}/vault/${d.slug}` })),
    },
    faqLd(c.faq),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: brand(he), item: root },
        { "@type": "ListItem", position: 2, name: hub.h1, item: `${root}/services` },
        { "@type": "ListItem", position: 3, name: c.h1, item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="pt-24 md:pt-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <Breadcrumb lang={lang} trail={[[he ? "שירותים" : "Services", hubPath], [c.h1]]} />
          <Header h1={c.h1} intro={c.intro} cta={ctaText(he)} ctaHref="#custom" />

          <div className="grid grid-cols-12 gap-6 border-t border-ink pt-6 pb-10">
            <h2 className="col-span-12 text-2xl font-semibold tracking-[-0.03em] md:col-span-4">{he ? "מה האתר צריך לעשות" : "What the site needs to do"}</h2>
            <ul className="col-span-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-8">
              {c.needs.map((n, i) => (
                <li key={n} className="flex gap-3 border-t border-ink/20 pt-3">
                  <span className="font-mono text-[11px] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-ink-2">{n}</span>
                </li>
              ))}
            </ul>
          </div>

          {designs.length > 0 && (
            <>
              <h2 className="border-t border-ink pt-3 label text-ink-3">{he ? "עיצוב לדוגמה מהספרייה" : "A sample from the library"}</h2>
              <div className="grid grid-cols-1 gap-5 py-8 md:grid-cols-2">
                {designs.map((it, i) => <VaultCard key={it.slug} item={it} index={i} />)}
              </div>
            </>
          )}

          <div className="grid grid-cols-12 gap-6 border-t border-ink pt-6 pb-12">
            <h2 className="col-span-12 text-2xl font-semibold tracking-[-0.03em] md:col-span-4">{he ? "מה כלול בכל אתר" : "Included in every site"}</h2>
            <ul className="col-span-12 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 md:col-span-8">
              {hub.included.map(([t]) => (
                <li key={t} className="border-t border-ink/20 pt-2 font-semibold">{t}</li>
              ))}
            </ul>
            <div className="col-span-12 md:col-span-8 md:col-start-5">
              <Link href={hubPath} className="focus-ring text-sm underline underline-offset-4">{he ? "כל השירותים ←" : "All services →"}</Link>
            </div>
          </div>

          <h2 className="border-t border-ink pt-3 label text-ink-3">{he ? "תחומים נוספים" : "Other industries"}</h2>
          <div className="py-8"><IndustryLinks lang={lang} current={slug} /></div>
        </div>
      </section>
      <FaqList lang={lang} faq={c.faq} />
      <LeadFunnel />
    </>
  );
}

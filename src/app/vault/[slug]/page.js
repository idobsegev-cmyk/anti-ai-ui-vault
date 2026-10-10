import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import DetailTabs from "@/components/DetailTabs";
import JsonLd from "@/components/JsonLd";
import LivePreview from "@/components/LivePreview";
import { getAll, getBySlug, getRelated, shortCategory } from "@/lib/data";
import { SITE, siteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAll().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getBySlug(slug);
  if (!item) return {};
  const title = `${item.title} — ${shortCategory(item.category)} component + Claude prompt`;
  const description = `${item.description} Live preview, copy-ready Claude prompt and React + Tailwind + Framer Motion code.`;
  return {
    title,
    description,
    keywords: [...item.tags, item.category, "Claude prompt", "React component"],
    alternates: { canonical: `/vault/${item.slug}` },
    openGraph: { type: "article", title, description, url: `/vault/${item.slug}`, siteName: SITE.name },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ComponentPage({ params }) {
  const { slug } = await params;
  const item = getBySlug(slug);
  if (!item) notFound();
  const all = getAll();
  const idx = all.findIndex((p) => p.slug === slug);
  const prev = all[(idx - 1 + all.length) % all.length];
  const next = all[(idx + 1) % all.length];
  const related = getRelated(item);
  const base = siteUrl();
  const url = `${base}/vault/${item.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      name: item.title,
      description: item.description,
      url,
      codeSampleType: "full solution",
      programmingLanguage: ["JavaScript", "React", "JSX"],
      runtimePlatform: "Web browser",
      keywords: item.tags.join(", "),
      text: item.previewCode,
      dateCreated: item.addedAt,
      license: "https://opensource.org/licenses/MIT",
      isPartOf: { "@type": "WebSite", name: SITE.name, url: base },
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: `${item.title} — Claude prompt`,
      about: item.category,
      description: `A design prompt for Claude that builds the "${item.title}" component.`,
      text: item.claudePrompt,
      url: `${url}#prompt`,
      genre: item.category,
      keywords: item.tags.join(", "),
      dateCreated: item.addedAt,
      author: { "@type": "Person", name: SITE.author },
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Vault", item: `${base}/#vault` },
        { "@type": "ListItem", position: 2, name: item.category, item: `${base}/#vault` },
        { "@type": "ListItem", position: 3, name: item.title, item: url },
      ],
    },
  ];

  return (
    <article className="pt-24 md:pt-28">
      <JsonLd data={jsonLd} />
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 border-b border-ink pb-2 font-mono text-[11px] uppercase tracking-[0.16em]">
          <Link href="/#vault" className="focus-ring inline-flex items-center gap-1 hover:underline">
            <ArrowLeft size={12} strokeWidth={2} /> Vault
          </Link>
          <span className="text-ink-3">/</span>
          <span className="text-ink-3">{shortCategory(item.category)}</span>
          <span className="ml-auto text-ink-3">{item.id}</span>
        </nav>

        <header className="grid grid-cols-12 gap-6 py-10 md:py-14">
          <div className="col-span-12 lg:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cobalt">{item.category}</p>
            <h1 className="mt-2 text-[clamp(2.4rem,6vw,5.6rem)] font-semibold leading-[0.92] tracking-[-0.05em]">{item.title}</h1>
          </div>
          <div className="col-span-12 flex flex-col justify-end gap-4 lg:col-span-4">
            <p className="text-lg leading-snug text-ink-2">{item.description}</p>
            <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
              {item.tags.map((t) => (
                <li key={t} className="rounded-full border border-ink px-2.5 py-0.5 font-mono text-[11px]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <DetailTabs item={item} />

        <section className="grid grid-cols-12 gap-6 py-12" aria-labelledby="use-title">
          <h2 id="use-title" className="col-span-12 text-2xl font-semibold tracking-[-0.03em] md:col-span-4">
            How to use <span className="font-serif font-normal italic">this prompt</span>
          </h2>
          <ol className="col-span-12 grid gap-4 text-sm leading-relaxed text-ink-2 sm:grid-cols-3 md:col-span-8">
            <li className="border-t border-ink pt-3"><b className="block text-ink">1. Copy</b>Use “Copy Claude Prompt” above — it includes the layout, the spring values and the design guardrails.</li>
            <li className="border-t border-ink pt-3"><b className="block text-ink">2. Paste into Claude</b>Add your own content (brand name, copy, colors) at the top of the prompt if you like.</li>
            <li className="border-t border-ink pt-3"><b className="block text-ink">3. Drop it in</b>The result is one file with React, Tailwind and Framer Motion. Install <code className="font-mono">framer-motion lucide-react</code>.</li>
          </ol>
        </section>

        {related.length > 0 && (
          <section className="border-t border-ink py-12" aria-labelledby="related-title">
            <h2 id="related-title" className="mb-6 text-2xl font-semibold tracking-[-0.03em]">More {shortCategory(item.category).toLowerCase()}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/vault/${r.slug}`} className="focus-ring group overflow-hidden rounded-2xl border border-ink">
                  <LivePreview code={r.previewCode} id={`rel-${r.slug}`} className="pointer-events-none w-full border-b border-ink" />
                  <div className="flex items-center justify-between p-4">
                    <span className="font-semibold tracking-tight">{r.title}</span>
                    <ArrowUpRight size={16} strokeWidth={1.75} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <nav aria-label="Pagination" className="grid grid-cols-2 border-t border-ink">
          <Link href={`/vault/${prev.slug}`} className="focus-ring group border-r border-ink py-8 pr-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">← Previous</span>
            <span className="mt-1 block text-lg font-semibold tracking-tight group-hover:underline">{prev.title}</span>
          </Link>
          <Link href={`/vault/${next.slug}`} className="focus-ring group py-8 pl-4 text-right">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">Next →</span>
            <span className="mt-1 block text-lg font-semibold tracking-tight group-hover:underline">{next.title}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}

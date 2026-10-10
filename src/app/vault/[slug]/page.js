import { notFound } from "next/navigation";
import ComponentDetail from "@/components/ComponentDetail";
import JsonLd from "@/components/JsonLd";
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
    <>
      <JsonLd data={jsonLd} />
      <ComponentDetail item={item} prev={prev} next={next} related={related} />
    </>
  );
}

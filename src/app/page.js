import Hero from "@/components/Hero";
import VaultGrid from "@/components/VaultGrid";
import HowItWorks from "@/components/HowItWorks";
import LeadFunnel from "@/components/LeadFunnel";
import JsonLd from "@/components/JsonLd";
import { getAll, getCategories, shortCategory } from "@/lib/data";
import { SITE, siteUrl } from "@/lib/site";

export default function Home() {
  const items = getAll();
  const cats = getCategories();
  const short = Object.fromEntries(cats.map((c) => [c, shortCategory(c)]));
  const base = siteUrl();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE.name,
      alternateName: SITE.nameHe,
      url: base,
      description: SITE.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${SITE.name} — component vault`,
      url: `${base}/#vault`,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: items.length,
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${base}/vault/${it.slug}`,
          name: it.title,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: `${SITE.name} Studio`,
      url: `${base}/#custom`,
      description: "Custom, high-converting websites with editorial design and hand-tuned motion.",
      areaServed: "Worldwide",
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero count={items.length} />
      <VaultGrid items={items} categories={cats} shortNames={short} />
      <HowItWorks />
      <LeadFunnel />
    </>
  );
}

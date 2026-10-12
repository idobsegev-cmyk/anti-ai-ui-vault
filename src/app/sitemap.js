import { getAll } from "@/lib/data";
import { CATEGORY_PAGES, STYLE_PAGES } from "@/lib/seo-content";
import { siteUrl } from "@/lib/site";
import { SERVICE_PAGES } from "@/lib/services-content";
import { GUIDES } from "@/lib/guides-content";

// Every page in both languages, each entry listing its counterpart (hreflang) for Google.
export default function sitemap() {
  const base = siteUrl();
  const items = getAll();
  const latest = items.reduce((d, i) => (i.addedAt > d ? i.addedAt : d), "2026-10-10");
  const pair = (path, opts) => {
    const en = `${base}${path || ""}` || base;
    const he = `${base}/he${path || ""}`;
    const languages = { en, he, "x-default": en };
    return [
      { url: en, alternates: { languages }, ...opts },
      { url: he, alternates: { languages }, ...opts },
    ];
  };
  return [
    ...pair("", { lastModified: new Date(latest), changeFrequency: "daily", priority: 1 }),
    ...pair("/services", { lastModified: new Date("2026-10-11"), changeFrequency: "monthly", priority: 0.9 }),
    ...pair("/components", { lastModified: new Date(latest), changeFrequency: "weekly", priority: 0.5 }),
    ...SERVICE_PAGES.flatMap((p) => pair(`/services/${p.slug}`, { lastModified: new Date("2026-10-11"), changeFrequency: "monthly", priority: 0.8 })),
    ...pair("/guides", { lastModified: new Date(GUIDES.reduce((d, g) => (g.date > d ? g.date : d), "2026-10-11")), changeFrequency: "weekly", priority: 0.8 }),
    ...GUIDES.flatMap((g) => pair(`/guides/${g.slug}`, { lastModified: new Date(g.date), changeFrequency: "monthly", priority: 0.8 })),
    ...CATEGORY_PAGES.flatMap((c) => pair(`/designs/${c.slug}`, { lastModified: new Date(latest), changeFrequency: "weekly", priority: 0.9 })),
    ...STYLE_PAGES.flatMap((s) => pair(`/styles/${s.slug}`, { lastModified: new Date(latest), changeFrequency: "weekly", priority: 0.8 })),
    ...items.flatMap((i) => pair(`/vault/${i.slug}`, { lastModified: new Date(i.addedAt), changeFrequency: "monthly", priority: i.category === "Full Website Designs" ? 0.8 : 0.6 })),
  ];
}

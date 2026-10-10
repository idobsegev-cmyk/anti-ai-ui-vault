import { getAll } from "@/lib/data";
import { siteUrl } from "@/lib/site";

export default function sitemap() {
  const base = siteUrl();
  const items = getAll();
  const latest = items.reduce((d, i) => (i.addedAt > d ? i.addedAt : d), "2026-10-10");
  return [
    { url: base, lastModified: new Date(latest), changeFrequency: "daily", priority: 1 },
    ...items.map((i) => ({
      url: `${base}/vault/${i.slug}`,
      lastModified: new Date(i.addedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}

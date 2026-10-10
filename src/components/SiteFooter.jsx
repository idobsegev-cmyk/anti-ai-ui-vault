import Link from "next/link";
import { SITE, repoUrl } from "@/lib/site";

export default function SiteFooter({ categories, shortNames }) {
  const year = new Date().getFullYear();
  const repo = repoUrl();
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-5 py-14 md:px-8">
        <div className="col-span-12 md:col-span-6">
          <p className="text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
            Made by <span className="font-serif font-normal italic text-terracotta">people.</span>
          </p>
          <p className="mt-4 text-sm text-paper/60" lang="he" dir="rtl">
            {SITE.nameHe} — רכיבי ממשק אנושיים, בחינם.
          </p>
        </div>
        <nav aria-label="Categories" className="col-span-6 md:col-span-3">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/50">Categories</p>
          <ul className="space-y-1.5 text-sm">
            {categories.map((c) => (
              <li key={c}>
                <Link href={`/#vault`} className="hover:underline">
                  {shortNames[c] || c}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="col-span-6 md:col-span-3">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/50">Studio</p>
          <ul className="space-y-1.5 text-sm">
            <li><Link href="/#custom" className="hover:underline">Book a custom site</Link></li>
            <li><Link href="/sitemap.xml" className="hover:underline">Sitemap</Link></li>
            {repo && <li><a href={repo} className="hover:underline">Source on GitHub</a></li>}
          </ul>
        </div>
        <div className="col-span-12 flex flex-wrap justify-between gap-2 border-t border-paper/20 pt-4 font-mono text-[11px] text-paper/50">
          <span>© {year} {SITE.name}. Components free to use (MIT).</span>
          <span>New components land every morning, 09:00 UTC.</span>
        </div>
      </div>
    </footer>
  );
}

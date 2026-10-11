import { faq } from "@/lib/seo-content";
import { getStats } from "@/lib/data";

/** Plain <details> so every answer is in the HTML for search engines and works without JavaScript. */
export default function Faq({ lang }) {
  const he = lang === "he";
  return (
    <section id="faq" className="scroll-mt-20 border-b border-ink" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8 px-5 py-16 md:px-8 md:py-24">
        <h2 id="faq-title" className="col-span-12 text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[0.95] tracking-[-0.04em] md:col-span-4 rtl:tracking-[-0.01em]">
          {he ? "שאלות נפוצות" : "Questions, answered"}
        </h2>
        <div className="col-span-12 border-t border-ink md:col-span-8">
          {faq(lang, getStats()).map(([q, a]) => (
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

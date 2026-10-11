"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import { useLang } from "@/lib/i18n";

// Long-form guide rendering (server-rendered HTML; client only for the copy buttons and UI strings).

/** **bold**, `code` and [label](/path) inside a line of guide text. */
function Inline({ text }) {
  const { href } = useLang();
  const parts = [];
  const re = /\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) parts.push(<strong key={k++} className="font-semibold text-ink">{m[1]}</strong>);
    else if (m[2]) parts.push(<code key={k++} dir="ltr" className="rounded-[3px] border border-ink/15 bg-paper-2 px-1 py-px font-mono text-[0.86em]">{m[2]}</code>);
    else parts.push(<Link key={k++} href={href(m[4])} className="focus-ring font-medium text-ink underline decoration-terracotta decoration-[1.5px] underline-offset-[3px] transition-colors hover:text-cobalt hover:decoration-cobalt">{m[3]}</Link>);
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export const sectionId = (i) => `s-${i + 1}`;

function CodeBlock({ label, code }) {
  const { t } = useLang();
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-ink bg-paper shadow-[4px_4px_0_#121212]">
      <figcaption className="flex items-center justify-between gap-3 border-b border-ink bg-paper-2 py-2 pe-2 ps-4">
        <span className="label text-ink-2">{label}</span>
        <CopyButton text={code} label={t.guides.copy} toastMessage={t.guides.copied} toastSub={label} size="sm" variant="ghost" />
      </figcaption>
      <pre dir="auto" className="max-h-[32rem] overflow-auto whitespace-pre-wrap break-words p-4 text-start font-mono text-[13px] leading-[1.7] text-ink md:p-5">
        <code>{code}</code>
      </pre>
    </figure>
  );
}

export function GuideBody({ body }) {
  let h = -1;
  return body.map((b, i) => {
    switch (b[0]) {
      case "h2":
        h += 1;
        return (
          <h2 key={i} id={sectionId(h)} className="mt-14 scroll-mt-28 border-t border-ink pt-5 text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-[1.08] tracking-[-0.03em] first:mt-0 rtl:tracking-normal">
            <Inline text={b[1]} />
          </h2>
        );
      case "h3":
        return <h3 key={i} className="mt-8 text-xl font-semibold tracking-[-0.015em]"><Inline text={b[1]} /></h3>;
      case "p":
        return <p key={i} className="mt-5 text-[17px] leading-[1.7] text-ink-2"><Inline text={b[1]} /></p>;
      case "ul":
        return (
          <ul key={i} className="mt-5 space-y-2.5 border-s border-ink/20 ps-5">
            {b[1].map((li, j) => (
              <li key={j} className="relative text-[17px] leading-[1.65] text-ink-2 before:absolute before:-start-[1.4rem] before:top-[0.72em] before:h-[5px] before:w-[5px] before:rounded-full before:bg-terracotta before:content-['']">
                <Inline text={li} />
              </li>
            ))}
          </ul>
        );
      case "ol":
        return (
          <ol key={i} className="mt-6 space-y-4">
            {b[1].map((li, j) => (
              <li key={j} className="grid grid-cols-[2.25rem_1fr] gap-x-3 border-t border-ink/15 pt-4 text-[17px] leading-[1.65] text-ink-2">
                <span className="font-mono text-sm font-medium text-cobalt">{String(j + 1).padStart(2, "0")}</span>
                <span><Inline text={li} /></span>
              </li>
            ))}
          </ol>
        );
      case "code":
        return <CodeBlock key={i} label={b[1]} code={b[2]} />;
      default:
        return null;
    }
  });
}

export function GuideToc({ headings }) {
  const { t } = useLang();
  return (
    <nav aria-label={t.guides.toc} className="lg:sticky lg:top-28">
      <p className="border-b border-ink pb-2 label text-ink-3">{t.guides.toc}</p>
      <ol className="mt-3 space-y-2 text-sm">
        {headings.map((h, i) => (
          <li key={i} className="grid grid-cols-[1.75rem_1fr] gap-1">
            <span className="font-mono text-[11px] leading-5 text-ink-3">{String(i + 1).padStart(2, "0")}</span>
            <a href={`#${sectionId(i)}`} className="focus-ring leading-snug text-ink-2 transition-colors hover:text-ink hover:underline">{h}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function GuideMeta({ minutes, date }) {
  const { t, lang } = useLang();
  const d = new Date(date).toLocaleDateString(lang === "he" ? "he-IL" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 label text-ink-3">
      <span>{t.guides.read(minutes)}</span>
      <span aria-hidden>·</span>
      <span>{t.guides.updated} <time dateTime={date}>{d}</time></span>
    </p>
  );
}

export function GuideLabel({ k, n }) {
  const { t } = useLang();
  const v = t.guides[k];
  return typeof v === "function" ? v(n) : v;
}

export function GuideDesigns({ designs }) {
  const { t, sty, cat, href } = useLang();
  if (!designs.length) return null;
  return (
    <section aria-labelledby="guide-designs" className="mt-16">
      <h2 id="guide-designs" className="border-t border-ink pt-3 label text-ink-3">{t.guides.designs}</h2>
      <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {designs.map((d) => (
          <li key={d.slug}>
            <Link href={href(`/vault/${d.slug}`)} className="focus-ring group flex h-full flex-col gap-2 rounded-xl border border-ink bg-paper p-4 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#121212]">
              <span className="flex items-center justify-between gap-2 label text-ink-3">
                <span>{cat(d.category)} · {sty(d.style)}</span>
                <ArrowUpRight size={15} strokeWidth={1.75} className="shrink-0 text-ink transition-transform group-hover:rotate-45 rtl:-scale-x-100" />
              </span>
              <span className="text-lg font-semibold leading-tight tracking-[-0.02em]">{d.title}</span>
              <span className="line-clamp-2 text-sm leading-snug text-ink-2">{d.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function GuideCard({ guide, index }) {
  const { t, href } = useLang();
  return (
    <Link href={href(`/guides/${guide.slug}`)} className="focus-ring group flex h-full flex-col gap-3 rounded-xl border border-ink bg-paper p-5 transition-[transform,box-shadow] duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#121212] rtl:hover:shadow-[-5px_5px_0_#121212] md:p-6">
      <span className="flex items-start justify-between gap-4">
        <span className="font-serif text-[3.2rem] italic leading-[0.8] text-cobalt rtl:not-italic" style={{ fontVariantNumeric: "tabular-nums" }}>{String(index + 1).padStart(2, "0")}</span>
        <span className="label pt-1 text-end text-ink-3">{guide.kicker}<br />{t.guides.read(guide.minutes)}</span>
      </span>
      <span className="text-[clamp(1.35rem,2.2vw,1.75rem)] font-semibold leading-[1.1] tracking-[-0.03em] [text-wrap:balance] rtl:tracking-normal">{guide.h1}</span>
      <span className="text-[15px] leading-relaxed text-ink-2">{guide.description}</span>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold">
        {t.guides.open}
        <ArrowUpRight size={15} strokeWidth={1.75} className="transition-transform group-hover:rotate-45 rtl:-scale-x-100" />
      </span>
    </Link>
  );
}

export function GuideCta() {
  const { t, href } = useLang();
  const [a, b, c] = t.guides.ctaTitle;
  return (
    <aside className="mt-16 rounded-2xl border border-ink bg-paper-2 p-6 shadow-[6px_6px_0_#D9534F] md:p-8">
      <p className="label text-terracotta">{t.guides.ctaKicker}</p>
      <p className="mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold leading-[1.02] tracking-[-0.04em] rtl:tracking-normal">
        {a}<span className="font-serif font-normal italic text-cobalt rtl:not-italic">{b}</span>{c}
      </p>
      <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-ink-2">{t.guides.ctaText}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="#custom" className="focus-ring inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-paper shadow-[3px_3px_0_#121212] transition-transform hover:-translate-y-0.5">
          {t.guides.ctaPrimary}
        </a>
        <Link href={href("/services")} className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink bg-paper px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-ink hover:text-paper">
          {t.guides.ctaSecondary}
        </Link>
      </div>
    </aside>
  );
}

export function GuideFaq({ faq }) {
  const { t } = useLang();
  return (
    <section aria-labelledby="guide-faq" className="mt-16">
      <h2 id="guide-faq" className="border-t border-ink pt-5 text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-[1.08] tracking-[-0.03em] rtl:tracking-normal">{t.guides.faq}</h2>
      <div className="mt-4 border-t border-ink/30">
        {faq.map(([q, a]) => (
          <details key={q} className="group border-b border-ink/30">
            <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
              <h3>{q}</h3>
              <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pb-5 text-[16px] leading-relaxed text-ink-2">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

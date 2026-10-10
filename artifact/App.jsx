import { useEffect, useLayoutEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ToastProvider } from "@/components/Toast";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Hero from "@/components/Hero";
import VaultGrid from "@/components/VaultGrid";
import HowItWorks from "@/components/HowItWorks";
import LeadFunnel from "@/components/LeadFunnel";
import DetailTabs from "@/components/DetailTabs";
import LivePreview from "@/components/LivePreview";
import { getAll, getBySlug, getCategories, getRelated, shortCategory } from "@/lib/data";

const items = getAll();
const cats = getCategories();
const short = Object.fromEntries(cats.map((c) => [c, shortCategory(c)]));

// Artifact preview: leads stay in this browser instead of going to /api/lead.
async function previewLead(form) {
  try {
    const key = "vault-preview-leads";
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    list.push({ ...form, at: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(list));
  } catch {}
  await new Promise((r) => setTimeout(r, 500));
}

function readRoute() {
  const h = decodeURIComponent(location.hash.slice(1));
  if (h.startsWith("c-") && getBySlug(h.slice(2))) return { view: "detail", slug: h.slice(2) };
  return { view: "home", anchor: h };
}

function Detail({ slug }) {
  const item = getBySlug(slug);
  const idx = items.findIndex((p) => p.slug === slug);
  const prev = items[(idx - 1 + items.length) % items.length];
  const next = items[(idx + 1) % items.length];
  const related = getRelated(item);
  useEffect(() => {
    document.title = `${item.title} · Anti-AI UI Vault`;
    return () => (document.title = "Anti-AI UI Vault");
  }, [item]);

  return (
    <article className="pt-24 md:pt-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 border-b border-ink pb-2 font-mono text-[11px] uppercase tracking-[0.16em]">
          <a href="#vault" className="focus-ring inline-flex items-center gap-1 hover:underline">
            <ArrowLeft size={12} strokeWidth={2} /> Vault
          </a>
          <span className="text-ink-3">/</span>
          <span className="text-ink-3">{shortCategory(item.category)}</span>
          <span className="ml-auto text-ink-3">{item.id}</span>
        </nav>

        <header className="grid grid-cols-12 gap-6 py-10 md:py-14">
          <div className="col-span-12 min-w-0 lg:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cobalt">{item.category}</p>
            <h1 className="mt-2 text-[clamp(2.4rem,6vw,5.6rem)] font-semibold leading-[0.92] tracking-[-0.05em] [text-wrap:balance]">{item.title}</h1>
          </div>
          <div className="col-span-12 flex flex-col justify-end gap-4 lg:col-span-4">
            <p className="text-lg leading-snug text-ink-2">{item.description}</p>
            <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
              {item.tags.map((t) => (
                <li key={t} className="rounded-full border border-ink px-2.5 py-0.5 font-mono text-[11px]">{t}</li>
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
            <li className="border-t border-ink pt-3"><b className="block text-ink">1. Copy</b>Use “Copy Claude Prompt” above. It includes the layout, the spring values and the design guardrails.</li>
            <li className="border-t border-ink pt-3"><b className="block text-ink">2. Paste into Claude</b>Add your own brand name, copy and colors at the top of the prompt if you like.</li>
            <li className="border-t border-ink pt-3"><b className="block text-ink">3. Drop it in</b>You get one file with React, Tailwind and Framer Motion. Install <code className="font-mono">framer-motion lucide-react</code>.</li>
          </ol>
        </section>

        {related.length > 0 && (
          <section className="border-t border-ink py-12" aria-labelledby="related-title">
            <h2 id="related-title" className="mb-6 text-2xl font-semibold tracking-[-0.03em]">More {shortCategory(item.category).toLowerCase()}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <a key={r.slug} href={`#c-${r.slug}`} className="focus-ring group overflow-hidden rounded-2xl border border-ink">
                  <LivePreview code={r.previewCode} id={`rel-${r.slug}`} className="pointer-events-none w-full border-b border-ink" />
                  <div className="flex items-center justify-between gap-3 p-4">
                    <span className="font-semibold tracking-tight">{r.title}</span>
                    <ArrowUpRight size={16} strokeWidth={1.75} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        <nav aria-label="Pagination" className="grid grid-cols-2 border-t border-ink">
          <a href={`#c-${prev.slug}`} className="focus-ring group min-w-0 border-r border-ink py-8 pr-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">← Previous</span>
            <span className="mt-1 block text-lg font-semibold tracking-tight group-hover:underline">{prev.title}</span>
          </a>
          <a href={`#c-${next.slug}`} className="focus-ring group min-w-0 py-8 pl-4 text-right">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">Next →</span>
            <span className="mt-1 block text-lg font-semibold tracking-tight group-hover:underline">{next.title}</span>
          </a>
        </nav>
      </div>
    </article>
  );
}

function App() {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const on = () => setRoute(readRoute());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  useLayoutEffect(() => {
    if (route.view === "detail") {
      window.scrollTo(0, 0);
      return;
    }
    const id = route.anchor;
    if (!id || id === "top") {
      window.scrollTo(0, 0);
      return;
    }
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }));
  }, [route]);

  return (
    <ToastProvider>
      <div id="top" />
      <SiteHeader count={items.length} />
      <main id="main">
        {route.view === "detail" ? (
          <Detail key={route.slug} slug={route.slug} />
        ) : (
          <>
            <Hero count={items.length} />
            <VaultGrid items={items} categories={cats} shortNames={short} />
            <HowItWorks />
            <LeadFunnel submitLead={previewLead} note="Preview mode: briefs sent from this page stay in your browser. The live site delivers them to your inbox or CRM." />
          </>
        )}
      </main>
      <SiteFooter categories={cats} shortNames={short} />
    </ToastProvider>
  );
}

createRoot(document.getElementById("root")).render(<App />);

import { useEffect, useLayoutEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ToastProvider } from "@/components/Toast";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Hero from "@/components/Hero";
import VaultGrid from "@/components/VaultGrid";
import HowItWorks from "@/components/HowItWorks";
import LeadFunnel from "@/components/LeadFunnel";
import Faq from "@/components/Faq";
import ComponentDetail from "@/components/ComponentDetail";
import LanguageSwitch from "@/components/LanguageSwitch";
import { LangProvider, useLang } from "@/lib/i18n";
import { getAll, getBySlug, getStrip, getCategories, getRelated, shortCategory } from "@/lib/data";

window.__VAULT_ARTIFACT__ = true;

const items = getAll();
const cats = getCategories();
const featured = ["ledgerly-saas-landing-page", "nocturne-hotel-website", "loudmouth-agency-website", "bloom-root-skincare-shop", "sunwave-festival-website", "brutalist-pricing-toggle", "holo-chrome-card", "pixel-arcade-start-button"].map(getBySlug).filter(Boolean);
const short = Object.fromEntries(cats.map((c) => [c, shortCategory(c)]));
const REPO = "https://github.com/idobsegev-cmyk/anti-ai-ui-vault";

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
  useEffect(() => {
    document.title = `${item.title} · Specimen Design`;
    return () => (document.title = "Specimen Design");
  }, [item]);
  return (
    <ComponentDetail
      item={item}
      prev={items[(idx - 1 + items.length) % items.length]}
      next={items[(idx + 1) % items.length]}
      related={getRelated(item)}
    />
  );
}

function Site() {
  const { t, lang } = useLang();
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
    <>
      <div id="top" />
      <SiteHeader count={items.length} />
      <main id="main">
        {route.view === "detail" ? (
          <Detail key={route.slug} slug={route.slug} />
        ) : (
          <>
            <Hero count={items.length} featured={featured} strip={getStrip()} />
            <VaultGrid items={items} categories={cats} shortNames={short} />
            <HowItWorks />
            <Faq lang={lang} />
            <LeadFunnel submitLead={previewLead} note={t.lead.preview} />
          </>
        )}
      </main>
      <SiteFooter categories={cats} shortNames={short} repo={REPO} />
      <LanguageSwitch />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <LangProvider initial="en">
    <ToastProvider>
      <Site />
    </ToastProvider>
  </LangProvider>,
);

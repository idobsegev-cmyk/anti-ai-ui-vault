"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

// UI copy for both languages. Hebrew addresses everyone: plural imperatives (neutral) or slash forms.
export const STRINGS = {
  en: {
    brand: "Specimen Design",
    nav: { vault: "Specimens", how: "How it works", guides: "Guides", custom: "Custom site", book: "Book a site", count: (n) => `${n} components · updated daily` },
    hero: {
      meta: ["Issue Nº 01 — The Anti-Template Issue", (n) => `${n} live components`, "Free · Copy · Paste into Claude"],
      l1: "Build Websites",
      l2: "That Feel",
      sr: "Build websites that feel alive, human, creative, young, modern, timeless, bold and warm.",
      lede: ["Complete website designs and animated components, each with a ", "copy-ready Claude prompt", " and a live preview. Sixteen design languages, from brutalist to Bauhaus to 8-bit. The site on screen is running for real: hover it, then copy its prompt."],
      stripLabel: "Live features · each one comes with its Claude prompt",
      browse: (n) => `Browse all ${n}`,
      bookCustom: "Book Custom Site",
      nextWord: (w) => `Next word (now: ${w})`,
    },
    marquee: ["Full Websites", "Editorial Heroes", "Bento Grids", "Tactile Buttons", "Kinetic Type", "3D Cards", "Accordions", "Navigation", "Forms"],
    showcase: { live: "Live", pause: "Pause showcase", resume: "Resume showcase", tryIt: "try it", label: "Featured components" },
    copy: { prompt: "Copy Claude Prompt", copied: "Copied", toast: "Prompt copied", code: "Copy code", codeToast: "Code copied" },
    vault: {
      kicker: (n) => `The specimen book — ${n} designs`,
      title: ["Touch everything. ", "Copy", " what you love."],
      search: "Search: magnetic, drag, accordion…",
      searchLabel: "Search components",
      clear: "Clear search",
      all: "All",
      allStyles: "All styles",
      language: "Design language",
      style: "Style",
      live: "Live",
      empty: (q) => `Nothing matches “${q}”. Try “drag” or “spring”.`,
      filter: "Filter by category",
      websites: ["Full websites", "Complete sites, top to bottom. Hover a shot to scroll the whole page."],
      components: ["Components", "Single pieces to drop into any site."],
      sites: (n) => `${n} sites`,
    },
    how: {
      kicker: "How it works",
      title: ["Four steps, ", "zero", " templates."],
      chips: ["Pick a design", "Copy its prompt", "Paste into Claude", "Ship it"],
      steps: [
        ["Pick a component", "Play with the live preview. Drag it, hover it, break it. Every specimen here is running real code."],
        ["Copy the Claude prompt", "Each prompt spells out layout, spring values, accessibility and the design rules that keep it from looking generated."],
        ["Paste & ship", "Paste into Claude and get a self-contained React + Tailwind + Framer Motion file. Or take the preview code from the component page."],
      ],
      demo: { cards: ["Pricing", "Hero", "Buttons"], copy: "Copy prompt", copied: "Copied", reply: "Reply to Claude…", live: "Live", buttons: ["Add to cart", "Save", "Share"], domain: "yourbrand.com" },
    },
    lead: {
      kicker: "Studio — by commission",
      banner: "Need a website that looks made by hand, not by a template?",
      accentWord: "hand",
      aside: "The specimens here are a sample of how we build client work: type set by hand, motion tuned on real devices, and pages structured to turn visitors into enquiries.",
      bullets: ["Strategy, copy & design in one team", "Next.js build, fast by default", "SEO structure & analytics from day one", "4–6 weeks for most studio sites"],
      step: (n) => `Step ${n} / 3`,
      titles: ["Who are we talking to?", "How do we reach you?", "What are we building?"],
      name: "Your name",
      company: "Business name (optional)",
      email: "Email",
      phone: "Phone / WhatsApp (optional)",
      type: "Project type",
      budget: "Budget (USD)",
      details: "Anything we should know?",
      detailsPh: "Goals, deadline, sites you like…",
      types: ["Business site", "Online shop", "Landing page", "Portfolio", "Web app"],
      back: "Back",
      next: "Continue",
      send: "Send brief",
      sending: "Sending…",
      errName: "Your name, please",
      errContact: "An email or a phone number",
      errType: "Pick one",
      fail: "Something went wrong. Please try again in a moment.",
      received: "RECEIVED",
      thanks: (n) => `Thanks, ${n}.`,
      soon: "Talk soon.",
      reply: "You will hear back within one working day with a few questions and a rough plan.",
      preview: "Preview mode: briefs sent from this page stay in your browser. The live site delivers them to your inbox or CRM.",
    },
    footer: {
      made: ["Made by ", "people."],
      tagline: "Free, human-feeling UI components.",
      categories: "Categories",
      studio: "Studio",
      bookCustom: "Book a custom site",
      services: "Website design services",
      guides: "Guides",
      sitemap: "Sitemap",
      source: "Source on GitHub",
      rights: (y) => `© ${y} Specimen Design. Designs free to use (MIT).`,
      daily: "New specimens land every morning.",
      instagram: "Follow on Instagram",
    },
    detail: {
      vault: "Specimens",
      tabs: { preview: "Live Preview", prompt: "Claude Prompt", code: "Preview Code" },
      replay: "Replay",
      howTitle: ["How to use ", "this prompt"],
      how: [
        ["1. Copy", "Use “Copy Claude Prompt” above. It includes the layout, the spring values and the design rules."],
        ["2. Paste into Claude", "Add your own brand name, copy and colors at the top of the prompt if you like."],
        ["3. Drop it in", "You get one file with React, Tailwind and Framer Motion. Install framer-motion and lucide-react."],
      ],
      more: (c) => `More ${c.toLowerCase()}`,
      prev: "← Previous",
      next: "Next →",
      tags: "Tags",
    },
    guides: {
      kicker: "Guides",
      all: "All guides",
      count: (n) => `${n} guides`,
      toc: "On this page",
      read: (n) => `${n} min read`,
      updated: "Updated",
      copy: "Copy prompt",
      copied: "Prompt copied",
      designs: "Designs mentioned in this guide",
      more: "Keep reading",
      faq: "Questions, answered",
      open: "Read the guide",
      ctaKicker: "Studio — by commission",
      ctaTitle: ["Rather have it ", "built for you", "?"],
      ctaText: "We design and build websites for small businesses with the same rules you just read. Strategy, copy, design and a fast Next.js build, in one team.",
      ctaPrimary: "Start a brief",
      ctaSecondary: "See the service",
    },
    switchTo: "עברית",
    switchLabel: "הצגת האתר בעברית",
  },
  he: {
    brand: "דוגמית עיצוב",
    nav: { vault: "עיצובים", how: "איך זה עובד", guides: "מדריכים", custom: "אתר בהזמנה", book: "לבניית אתר", count: (n) => `${n} עיצובים · מתעדכן כל יום` },
    hero: {
      meta: ["ספריית עיצובים לאתרים", (n) => `${n} עיצובים חיים`, "חינם · מעתיקים · מדביקים ב-Claude"],
      l1: "בונים אתרים",
      l2: "שמרגישים",
      sr: "בונים אתרים שמרגישים חיים, אנושיים, יצירתיים, צעירים, מודרניים, על־זמניים, נועזים וחמים.",
      lede: ["עיצובים לאתרים שלמים ולרכיבי אנימציה, ולכל אחד ", "פרומפט מוכן ל-Claude", " ותצוגה חיה. שש־עשרה שפות עיצוב, מברוטליזם ועד באוהאוס."],
      stripLabel: "רכיבים חיים · לכל אחד פרומפט מוכן",
      browse: (n) => `לכל ${n} העיצובים`,
      bookCustom: "אתר בהתאמה אישית",
      services: "בניית אתרים לעסקים",
      nextWord: (w) => `למילה הבאה (כרגע: ${w})`,
    },
    marquee: ["אתרים מלאים", "אזורי פתיחה", "גרידים בסגנון בנטו", "כפתורים מוחשיים", "טיפוגרפיה בתנועה", "כרטיסי תלת־ממד", "אקורדיונים", "תפריטי ניווט", "טפסים"],
    showcase: { live: "תצוגה חיה", pause: "עצירת התצוגה", resume: "המשך התצוגה", tryIt: "אפשר לגעת", label: "עיצובים נבחרים" },
    copy: { prompt: "העתקת הפרומפט", copied: "הועתק", toast: "הפרומפט הועתק", code: "העתקת הקוד", codeToast: "הקוד הועתק" },
    vault: {
      kicker: (n) => `${n} עיצובים · מתעדכן כל יום`,
      title: ["לגעת, לנסות, ", "להעתיק", "."],
      search: "חיפוש לפי שם, סגנון או אפקט…",
      searchLabel: "חיפוש עיצובים",
      clear: "ניקוי החיפוש",
      all: "הכול",
      allStyles: "כל הסגנונות",
      language: "סגנון",
      style: "סגנון",
      live: "חי",
      empty: (q) => `לא נמצאו תוצאות עבור „${q}”. אפשר לנסות מילה אחרת, למשל „כפתור”.`,
      filter: "סינון לפי קטגוריה",
      websites: ["אתרים מלאים", "עמודים שלמים, מהכותרת ועד הפוטר. מעבר עם העכבר מעל אתר מגלגל אותו עד הסוף."],
      components: ["רכיבים", "חלקים בודדים שאפשר לשלב בכל אתר."],
      sites: (n) => `${n} אתרים`,
    },
    how: {
      kicker: "איך זה עובד",
      title: ["ארבעה צעדים, ", "בלי", " תבניות."],
      chips: ["בוחרים עיצוב", "מעתיקים את הפרומפט", "מדביקים ב-Claude", "מעלים לאוויר"],
      steps: [
        ["בוחרים עיצוב", "כל דוגמית כאן מריצה קוד אמיתי: אפשר לגרור, לרחף וללחוץ."],
        ["מעתיקים את הפרומפט", "הפרומפט מפרט פריסה, תנועה, נגישות וכללי עיצוב, כדי שהתוצאה לא תיראה גנרית."],
        ["מדביקים ומעלים", "Claude מחזיר קובץ React אחד עם Tailwind ו-Framer Motion, מוכן לשילוב באתר."],
      ],
      demo: { cards: ["תמחור", "פתיחה", "כפתורים"], copy: "העתקת פרומפט", copied: "הועתק", reply: "תשובה ל-Claude…", live: "באוויר", buttons: ["הוספה לסל", "שמירה", "שיתוף"], domain: "yourbrand.co.il" },
    },
    lead: {
      kicker: "הסטודיו · אתרים בהזמנה",
      banner: "אתר שמביא לקוחות, ונראה אחרת מכל השאר.",
      accentWord: "אחרת",
      aside: "הדוגמיות כאן הן טעימה מהעבודה שלנו עם לקוחות: טיפוגרפיה שנבחרת בקפידה, תנועה שנבדקת על מכשירים אמיתיים ועמודים שבנויים להפוך גולשים לפניות.",
      bullets: ["אסטרטגיה, תוכן ועיצוב בצוות אחד", "פיתוח ב-Next.js, מהיר כבר מהיסוד", "SEO ואנליטיקס מהיום הראשון", "רוב הפרויקטים באוויר תוך 4–6 שבועות"],
      step: (n) => `שלב ${n} מתוך 3`,
      titles: ["נעים להכיר", "איך אפשר לחזור אליך?", "מה בונים?"],
      name: "שם מלא",
      company: "שם העסק (לא חובה)",
      email: "אימייל",
      phone: "טלפון או וואטסאפ (לא חובה)",
      type: "סוג הפרויקט",
      budget: "תקציב משוער (בדולרים)",
      details: "עוד משהו שחשוב שנדע?",
      detailsPh: "מטרות, לוחות זמנים, אתרים שאהבת…",
      types: ["אתר תדמית", "חנות אונליין", "דף נחיתה", "תיק עבודות", "אפליקציית ווב"],
      back: "חזרה",
      next: "המשך",
      send: "שליחה",
      sending: "שולחים…",
      errName: "נשמח לדעת איך לפנות אליך",
      errContact: "צריך אימייל או מספר טלפון",
      errType: "יש לבחור אחת מהאפשרויות",
      fail: "משהו השתבש. אפשר לנסות שוב בעוד רגע.",
      received: "התקבל",
      thanks: (n) => `תודה, ${n}.`,
      soon: "נדבר בקרוב.",
      reply: "נחזור אליך תוך יום עבודה, עם כמה שאלות ותוכנית ראשונית.",
      preview: "תצוגה מקדימה: פניות מהעמוד הזה נשמרות רק בדפדפן שלך. באתר החי הן מגיעות ישירות למייל.",
    },
    footer: {
      made: ["עוצב ונבנה ", "ביד."],
      tagline: "עיצובים אנושיים לאתרים, בחינם.",
      categories: "קטגוריות",
      studio: "סטודיו",
      bookCustom: "אתר בהתאמה אישית",
      services: "בניית אתרים לעסקים",
      guides: "מדריכים",
      sitemap: "מפת האתר",
      source: "הקוד ב-GitHub",
      rights: (y) => `© ${y} דוגמית עיצוב. העיצובים חופשיים לשימוש (MIT).`,
      daily: "עיצובים חדשים נוספים כל בוקר.",
      instagram: "אנחנו באינסטגרם",
    },
    detail: {
      vault: "כל העיצובים",
      tabs: { preview: "תצוגה חיה", prompt: "הפרומפט", code: "קוד" },
      replay: "הפעלה מחדש",
      howTitle: ["איך משתמשים ", "בפרומפט"],
      how: [
        ["1. מעתיקים", "לחיצה על „העתקת הפרומפט” מעתיקה את כל ההנחיות: פריסה, תנועה וכללי עיצוב."],
        ["2. מדביקים ב-Claude", "כדאי להוסיף בתחילת הפרומפט את שם העסק, הטקסטים והצבעים שלך."],
        ["3. משלבים באתר", "מתקבל קובץ React אחד. צריך להתקין את framer-motion ואת lucide-react."],
      ],
      more: (c) => `עוד ${c}`,
      prev: "→ הקודם",
      next: "הבא ←",
      tags: "תגיות",
    },
    guides: {
      kicker: "מדריכים",
      all: "כל המדריכים",
      count: (n) => `${n} מדריכים`,
      toc: "בעמוד הזה",
      read: (n) => `${n} דקות קריאה`,
      updated: "עודכן",
      copy: "העתקת הפרומפט",
      copied: "הפרומפט הועתק",
      designs: "העיצובים שמוזכרים במדריך",
      more: "להמשיך לקרוא",
      faq: "שאלות נפוצות",
      open: "למדריך",
      ctaKicker: "סטודיו · בהזמנה",
      ctaTitle: ["מעדיפים ", "שנבנה בשבילכם", "?"],
      ctaText: "אנחנו מעצבים ובונים אתרים לעסקים קטנים לפי אותם כללים שבמדריך. אסטרטגיה, תוכן, עיצוב ופיתוח מהיר ב-Next.js, בצוות אחד.",
      ctaPrimary: "לבריף קצר",
      ctaSecondary: "מה כלול בשירות",
    },
    switchTo: "English",
    switchLabel: "View the site in English",
  },
};

import { CATEGORY_HE, STYLE_HE, TAG_HE } from "./labels";
export { CATEGORY_HE, STYLE_HE, TAG_HE };

const LangCtx = createContext({ lang: "en", t: STRINGS.en, setLang: () => {}, cat: (c) => c, sty: (s) => s, tags: (l) => l, href: (p) => p });

const KEY = "vault-lang";

/**
 * Visitors who arrive from Google with a Hebrew browser (or via google.co.il) start in Hebrew;
 * everyone else starts in English. An explicit choice from the switch always wins and is remembered.
 * (Google itself also sends Hebrew searchers to /he through the hreflang tags on the live site.)
 */
export function detectFromSearch() {
  try {
    const ref = document.referrer || "";
    const fromGoogle = /^https?:\/\/(www\.)?google\.[a-z.]+\//i.test(ref);
    if (!fromGoogle) return null;
    const hebrewGoogle = /google\.co\.il/i.test(ref);
    const hebrewBrowser = (navigator.languages || [navigator.language]).some((l) => /^(he|iw)\b/i.test(l || ""));
    return hebrewGoogle || hebrewBrowser ? "he" : null;
  } catch {
    return null;
  }
}

/** The same page in the other language: "/vault/x" ↔ "/he/vault/x". */
export function counterpartPath(path, to) {
  const bare = path.replace(/^\/he(?=\/|$)/, "") || "/";
  if (to === "he") return bare === "/" ? "/he" : `/he${bare}`;
  return bare;
}

/**
 * mode "routes" (the live site): each language has its own URLs, so switching navigates.
 * mode "state" (the single-file artifact): switching re-renders in place.
 */
export function LangProvider({ initial = "en", mode = "state", children }) {
  const [lang, setLangState] = useState(initial);

  const go = useCallback(
    (l) => {
      if (mode === "routes") {
        const { pathname, hash } = window.location;
        const next = counterpartPath(pathname, l);
        if (next !== pathname) {
          window.location.assign(next + hash);
          return;
        }
      }
      setLangState(l);
    },
    [mode],
  );

  // First visit: a saved choice wins; otherwise a Hebrew Google visitor gets Hebrew.
  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {}
    const want = saved === "en" || saved === "he" ? saved : detectFromSearch();
    if (want && want !== lang) go(want);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mode === "routes") return; // the server already set lang/dir on <html>
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "he" ? "rtl" : "ltr";
  }, [lang, mode]);

  const setLang = useCallback(
    (l) => {
      try {
        localStorage.setItem(KEY, l);
      } catch {}
      go(l);
    },
    [go],
  );

  const value = useMemo(
    () => ({
      lang,
      t: STRINGS[lang],
      setLang,
      cat: (c) => (lang === "he" ? CATEGORY_HE[c] || c : c),
      sty: (s) => (lang === "he" ? STYLE_HE[s] || s : s),
      // Hebrew shows only tags that have a Hebrew name; library names would just be noise there.
      tags: (list) => (lang === "he" ? list.filter((x) => TAG_HE[x]).map((x) => TAG_HE[x]) : list),
      href: (p) => (lang === "he" ? counterpartPath(p, "he") : p),
    }),
    [lang, setLang],
  );

  return (
    <LangCtx.Provider value={value}>
      <div lang={lang} dir={lang === "he" ? "rtl" : "ltr"} className="contents">
        {children}
      </div>
    </LangCtx.Provider>
  );
}

export function useLang() {
  return useContext(LangCtx);
}

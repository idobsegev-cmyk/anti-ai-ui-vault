"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

// UI copy for both languages. Hebrew addresses everyone: plural imperatives (neutral) or slash forms.
export const STRINGS = {
  en: {
    brand: "Specimen Design",
    nav: { vault: "Specimens", how: "How it works", custom: "Custom site", book: "Book a site", count: (n) => `${n} components · updated daily` },
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
    },
    lead: {
      kicker: "Studio — by commission",
      banner: "Need a high-converting, award-winning site for your business?",
      accentWord: "award-winning",
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
      sitemap: "Sitemap",
      source: "Source on GitHub",
      rights: (y) => `© ${y} Specimen Design. Designs free to use (MIT).`,
      daily: "New specimens land every morning.",
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
    switchTo: "עברית",
    switchLabel: "הצגת האתר בעברית",
  },
  he: {
    brand: "דוגמית עיצוב",
    nav: { vault: "הדוגמיות", how: "איך זה עובד", custom: "אתר בהזמנה", book: "להזמנת אתר", count: (n) => `${n} רכיבים · מתעדכן כל יום` },
    hero: {
      meta: ["גיליון 01 — הגיליון נגד התבניות", (n) => `${n} רכיבים חיים`, "בחינם · מעתיקים · מדביקים ב-Claude"],
      l1: "בונים אתרים",
      l2: "שמרגישים",
      sr: "בונים אתרים שמרגישים חיים, אנושיים, יצירתיים, צעירים, מודרניים, על־זמניים, נועזים וחמים.",
      lede: ["עיצובים של אתרים שלמים ורכיבי אנימציה, ולכל אחד ", "פרומפט מוכן ל-Claude", " ותצוגה חיה. שש־עשרה שפות עיצוב, מברוטליזם ועד באוהאוס ו־8 ביט. האתר שעל המסך פועל באמת: רחפו מעליו, ואז העתיקו את הפרומפט."],
      stripLabel: "פיצ׳רים חיים · לכל אחד פרומפט מוכן ל-Claude",
      browse: (n) => `לכל ה-${n}`,
      bookCustom: "להזמנת אתר מותאם",
      nextWord: (w) => `למילה הבאה (כעת: ${w})`,
    },
    marquee: ["אתרים מלאים", "הירו מגזיני", "גרידי בנטו", "כפתורים מוחשיים", "טיפוגרפיה בתנועה", "כרטיסי תלת־ממד", "אקורדיונים", "ניווט", "טפסים"],
    showcase: { live: "חי", pause: "השהיית התצוגה", resume: "המשך התצוגה", tryIt: "נסו", label: "רכיבים נבחרים" },
    copy: { prompt: "העתקת הפרומפט ל-Claude", copied: "הועתק", toast: "הפרומפט הועתק", code: "העתקת הקוד", codeToast: "הקוד הועתק" },
    vault: {
      kicker: (n) => `ספר הדוגמיות — ${n} עיצובים`,
      title: ["געו בהכול. ", "העתיקו", " את מה שאהבתם."],
      search: "חיפוש: מגנטי, גרירה, אקורדיון…",
      searchLabel: "חיפוש רכיבים",
      clear: "ניקוי החיפוש",
      all: "הכול",
      allStyles: "כל הסגנונות",
      language: "שפת עיצוב",
      style: "סגנון",
      live: "חי",
      empty: (q) => `אין תוצאות עבור „${q}”. נסו „drag” או „spring”.`,
      filter: "סינון לפי קטגוריה",
      websites: ["אתרים מלאים", "אתרים שלמים מלמעלה עד למטה. רחפו מעל צילום כדי לגלול את כל העמוד."],
      components: ["רכיבים", "חלקים בודדים לשילוב בכל אתר."],
      sites: (n) => `${n} אתרים`,
    },
    how: {
      kicker: "איך זה עובד",
      title: ["ארבעה צעדים, ", "אפס", " תבניות."],
      chips: ["בוחרים עיצוב", "מעתיקים את הפרומפט", "מדביקים ב-Claude", "מעלים לאוויר"],
      steps: [
        ["בוחרים רכיב", "משחקים עם התצוגה החיה: גוררים, מרחפים, שוברים. כל דוגמית כאן מריצה קוד אמיתי."],
        ["מעתיקים את הפרומפט", "כל פרומפט מפרט פריסה, ערכי קפיץ, נגישות וכללי עיצוב שמונעים ממנו להיראות כמו תוצר של AI."],
        ["מדביקים ומעלים", "מדביקים ב-Claude ומקבלים קובץ React + Tailwind + Framer Motion אחד. אפשר גם לקחת את קוד התצוגה מעמוד הרכיב."],
      ],
    },
    lead: {
      kicker: "הסטודיו — בהזמנה אישית",
      banner: "צריכים אתר שממיר, ושיכול לזכות בפרסים, לעסק שלכם?",
      accentWord: "לזכות",
      aside: "הדוגמיות כאן הן טעימה מהאופן שבו אנחנו בונים ללקוחות: טיפוגרפיה שנבחרה ביד, תנועה שכוונה על מכשירים אמיתיים, ועמודים שבנויים להפוך מבקרים לפניות.",
      bullets: ["אסטרטגיה, תוכן ועיצוב בצוות אחד", "פיתוח ב-Next.js, מהיר מהיסוד", "מבנה SEO ואנליטיקס מהיום הראשון", "4–6 שבועות לרוב אתרי הסטודיו"],
      step: (n) => `שלב ${n} מתוך 3`,
      titles: ["עם מי אנחנו מדברים?", "איך נחזור אליכם?", "מה אנחנו בונים?"],
      name: "שם",
      company: "שם העסק (לא חובה)",
      email: "אימייל",
      phone: "טלפון / וואטסאפ (לא חובה)",
      type: "סוג הפרויקט",
      budget: "תקציב (דולר)",
      details: "משהו שחשוב שנדע?",
      detailsPh: "מטרות, לוח זמנים, אתרים שאהבתם…",
      types: ["אתר עסקי", "חנות אונליין", "דף נחיתה", "תיק עבודות", "אפליקציית ווב"],
      back: "חזרה",
      next: "המשך",
      send: "שליחת הבריף",
      sending: "שולחים…",
      errName: "נשמח לשם",
      errContact: "אימייל או מספר טלפון",
      errType: "בחרו אחת מהאפשרויות",
      fail: "משהו השתבש. נסו שוב בעוד רגע.",
      received: "התקבל",
      thanks: (n) => `תודה, ${n}.`,
      soon: "נדבר בקרוב.",
      reply: "נחזור אליכם תוך יום עבודה אחד עם כמה שאלות ותוכנית ראשונית.",
      preview: "מצב תצוגה מקדימה: בריפים שנשלחים מהעמוד הזה נשמרים בדפדפן שלכם בלבד. באתר החי הם מגיעים לתיבת המייל או ל-CRM.",
    },
    footer: {
      made: ["נעשה בידי ", "אנשים."],
      tagline: "רכיבי ממשק אנושיים, בחינם.",
      categories: "קטגוריות",
      studio: "סטודיו",
      bookCustom: "להזמנת אתר מותאם",
      sitemap: "מפת האתר",
      source: "הקוד ב-GitHub",
      rights: (y) => `© ${y} דוגמית עיצוב. העיצובים חופשיים לשימוש (MIT).`,
      daily: "דוגמיות חדשות נוספות כל בוקר.",
    },
    detail: {
      vault: "הדוגמיות",
      tabs: { preview: "תצוגה חיה", prompt: "פרומפט ל-Claude", code: "קוד התצוגה" },
      replay: "הפעלה מחדש",
      howTitle: ["איך משתמשים ", "בפרומפט"],
      how: [
        ["1. מעתיקים", "לוחצים על „העתקת הפרומפט” למעלה. הוא כולל את הפריסה, ערכי הקפיץ וכללי העיצוב."],
        ["2. מדביקים ב-Claude", "אפשר להוסיף בראש הפרומפט את שם המותג, הטקסטים והצבעים שלכם."],
        ["3. משלבים באתר", "מקבלים קובץ אחד עם React, Tailwind ו-Framer Motion. מתקינים framer-motion ו-lucide-react."],
      ],
      more: (c) => `עוד ${c}`,
      prev: "→ הקודם",
      next: "הבא ←",
      tags: "תגיות",
    },
    switchTo: "English",
    switchLabel: "View the site in English",
  },
};

export const CATEGORY_HE = {
  "Full Website Designs": "אתרים מלאים",
  "Editorial Hero Sections": "הירו",
  "Bento Feature Grids": "בנטו",
  "Tactile Micro-Interaction Buttons": "כפתורים",
  "Kinetic Typography Banners": "טיפוגרפיה בתנועה",
  "Parallax/3D Interactive Cards": "כרטיסי תלת־ממד",
  "Dynamic Accordions": "אקורדיונים",
  "Animated Navigation Bars": "ניווט",
  "Interactive Forms": "טפסים",
};

export const STYLE_HE = {
  "Warm Editorial": "מגזיני חם",
  "Neo-Brutalist": "ניאו־ברוטליסטי",
  Bauhaus: "באוהאוס",
  "Memphis 90s": "ממפיס שנות ה־90",
  "Retro 70s": "רטרו שנות ה־70",
  "Luxury Noir": "יוקרה שחורה",
  "Japanese Minimal": "מינימליזם יפני",
  "Y2K Chrome": "כרום Y2K",
  "Retro OS": "מערכת הפעלה רטרו",
  Claymorphism: "קליימורפיזם",
  "Risograph Zine": "זין ריזוגרף",
  "Organic Earth": "אורגני אדמתי",
  "Art Deco": "ארט דקו",
  "8-bit Arcade": "ארקייד 8 ביט",
  "Mono Data": "דאטה מונו",
  "Swiss International": "סגנון שוויצרי",
};

const LangCtx = createContext({ lang: "en", t: STRINGS.en, setLang: () => {}, cat: (c) => c, sty: (s) => s });

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

export function LangProvider({ initial = "en", children }) {
  const [lang, setLangState] = useState(initial);

  // First visit: a saved choice wins; otherwise a Hebrew Google visitor gets Hebrew.
  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {}
    if (saved === "en" || saved === "he") {
      if (saved !== lang) setLangState(saved);
      return;
    }
    const detected = detectFromSearch();
    if (detected && detected !== lang) setLangState(detected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "he" ? "rtl" : "ltr";
    // Keep the home URL in step with the language on the live site (/ ↔ /he)
    if (!window.__VAULT_ARTIFACT__) {
      const p = window.location.pathname;
      const want = lang === "he" ? "/he" : "/";
      if ((p === "/" || p === "/he") && p !== want) window.history.replaceState(null, "", want + window.location.hash);
    }
  }, [lang]);

  const setLang = useCallback((l) => {
    try {
      localStorage.setItem(KEY, l);
    } catch {}
    setLangState(l);
  }, []);

  const value = useMemo(
    () => ({
      lang,
      t: STRINGS[lang],
      setLang,
      cat: (c) => (lang === "he" ? CATEGORY_HE[c] || c : c),
      sty: (s) => (lang === "he" ? STYLE_HE[s] || s : s),
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

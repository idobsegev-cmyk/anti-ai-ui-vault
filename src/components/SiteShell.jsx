import "../app/globals.css";
import { ToastProvider } from "@/components/Toast";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LanguageSwitch from "@/components/LanguageSwitch";
import { LangProvider } from "@/lib/i18n";
import { getAll, getCategories, shortCategory } from "@/lib/data";
import { repoUrl } from "@/lib/site";
import { fontClasses } from "@/lib/fonts";
import { HEBREW_FONTS_URL, PREVIEW_FONTS_URL } from "@/lib/preview-fonts";

/** The whole document, rendered on the server in the page's own language and direction. */
export default function SiteShell({ lang, children }) {
  const all = getAll();
  const cats = getCategories();
  const short = Object.fromEntries(cats.map((c) => [c, shortCategory(c)]));
  return (
    <html lang={lang} dir={lang === "he" ? "rtl" : "ltr"} className={fontClasses}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={PREVIEW_FONTS_URL} />
        <link rel="stylesheet" href={HEBREW_FONTS_URL} />
      </head>
      <body className="grain min-h-dvh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
          {lang === "he" ? "דילוג לתוכן" : "Skip to content"}
        </a>
        <LangProvider initial={lang} mode="routes">
          <ToastProvider>
            <SiteHeader count={all.length} />
            <main id="main">{children}</main>
            <SiteFooter categories={cats} shortNames={short} repo={repoUrl()} />
            <LanguageSwitch />
          </ToastProvider>
        </LangProvider>
      </body>
    </html>
  );
}

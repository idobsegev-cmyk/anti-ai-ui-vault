"use client";

import { usePathname } from "next/navigation";
import { LangProvider } from "@/lib/i18n";

/** Starts the site in Hebrew under /he, in English everywhere else. */
export default function NextLang({ children }) {
  const path = usePathname() || "/";
  return <LangProvider initial={path === "/he" || path.startsWith("/he/") ? "he" : "en"}>{children}</LangProvider>;
}

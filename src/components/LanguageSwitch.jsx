"use client";

import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useLang } from "@/lib/i18n";

/** A tab pinned to the side of the screen that flips the whole site between English and Hebrew. */
export default function LanguageSwitch() {
  const { lang, setLang, t } = useLang();
  const next = lang === "he" ? "en" : "he";

  const flip = () => setLang(next);

  return (
    <motion.button
      type="button"
      onClick={flip}
      aria-label={t.switchLabel}
      lang={next}
      initial={{ x: 40 }}
      animate={{ x: 0 }}
      whileHover={{ x: -4 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 28, delay: 1.2 }}
      className={[
        "focus-ring fixed z-[55] flex items-center gap-1.5 border border-ink bg-ink text-paper",
        // phones: a small pill in the bottom corner, clear of the content
        "bottom-4 left-4 rounded-full px-3 py-2 shadow-[2px_2px_0_var(--color-terracotta)]",
        // larger screens: the tab on the right edge
        "md:bottom-auto md:left-auto md:right-0 md:top-1/2 md:-translate-y-1/2 md:flex-col md:gap-2 md:rounded-none md:rounded-l-xl md:border-r-0 md:px-2 md:py-3 md:shadow-[-3px_3px_0_var(--color-terracotta)]",
      ].join(" ")}
    >
      <Languages size={15} strokeWidth={1.75} />
      <span className="text-xs font-bold" dir={next === "he" ? "rtl" : "ltr"}>
        {next === "he" ? "עב" : "EN"}
      </span>
    </motion.button>
  );
}

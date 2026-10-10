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
      style={{ right: 0, left: "auto" }}
      className="focus-ring fixed top-1/2 z-[55] flex -translate-y-1/2 flex-col items-center gap-2 rounded-l-xl border border-r-0 border-ink bg-ink px-2 py-3 text-paper shadow-[-3px_3px_0_var(--color-terracotta)]"
    >
      <Languages size={15} strokeWidth={1.75} />
      <span className="text-xs font-semibold [writing-mode:vertical-rl]" dir={next === "he" ? "rtl" : "ltr"}>
        {t.switchTo}
      </span>
    </motion.button>
  );
}

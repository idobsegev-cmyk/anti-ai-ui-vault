"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useToast } from "./Toast";
import { useLang } from "@/lib/i18n";

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers/iframes without the async clipboard
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

export default function CopyButton({ text, label, toastMessage, toastSub, variant = "solid", size = "md", className = "" }) {
  const { t } = useLang();
  label = label ?? t.copy.prompt;
  toastMessage = toastMessage ?? t.copy.toast;
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  const onClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const ok = await copyText(text);
    if (!ok) return;
    setDone(true);
    toast(toastMessage, toastSub);
    setTimeout(() => setDone(false), 1600);
  };

  const base =
    variant === "solid"
      ? done
        ? "bg-cobalt text-paper border-cobalt"
        : "bg-ink text-paper border-ink"
      : done
        ? "bg-cobalt text-paper border-cobalt"
        : "bg-paper text-ink border-ink hover:bg-paper-2";
  const pad = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
      className={`focus-ring inline-flex items-center gap-2 rounded-full border font-medium transition-colors ${base} ${pad} ${className}`}
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        <AnimatePresence mode="popLayout" initial={false}>
          {done ? (
            <motion.span key="ok" initial={{ scale: 0, rotate: -60 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 600, damping: 20 }}>
              <Check size={15} strokeWidth={2.25} />
            </motion.span>
          ) : (
            <motion.span key="cp" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Copy size={14} strokeWidth={1.75} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      {done ? t.copy.copied : label}
    </motion.button>
  );
}

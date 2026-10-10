"use client";

import { useState } from "react";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import { Code2, Eye, MessageSquareText, RotateCcw } from "lucide-react";
import LivePreview from "./LivePreview";
import CopyButton from "./CopyButton";
import { useLang } from "@/lib/i18n";

const TABS = [
  { id: "preview", Icon: Eye },
  { id: "prompt", Icon: MessageSquareText },
  { id: "code", Icon: Code2 },
];

export default function DetailTabs({ item }) {
  const { t } = useLang();
  const [tab, setTab] = useState("preview");
  const [run, setRun] = useState(0);

  return (
    <div className="overflow-hidden rounded-3xl border border-ink bg-paper">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink p-3">
        <LayoutGroup id="detail-tabs">
          <div role="tablist" aria-label="View" className="flex gap-1 rounded-full border border-ink p-1">
            {TABS.map(({ id, Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                aria-controls={`panel-${id}`}
                onClick={() => setTab(id)}
                className="focus-ring relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm"
              >
                {tab === id && <motion.span layoutId="detail-pill" transition={{ type: "spring", stiffness: 500, damping: 36 }} className="absolute inset-0 rounded-full bg-ink" />}
                <span className={`relative flex items-center gap-1.5 ${tab === id ? "text-paper" : ""}`}>
                  <Icon size={14} strokeWidth={1.75} />
                  <span className="hidden sm:inline">{t.detail.tabs[id]}</span>
                </span>
              </button>
            ))}
          </div>
        </LayoutGroup>
        <div className="flex items-center gap-2">
          {tab === "preview" && (
            <button onClick={() => setRun((r) => r + 1)} className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-ink px-3 py-1.5 text-xs hover:bg-paper-2">
              <RotateCcw size={13} strokeWidth={1.75} /> {t.detail.replay}
            </button>
          )}
          {tab === "code" ? (
            <CopyButton text={item.previewCode} label={t.copy.code} toastMessage={t.copy.codeToast} variant="outline" size="sm" />
          ) : (
            <CopyButton text={item.claudePrompt} size="sm" toastSub={item.title} />
          )}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          id={`panel-${tab}`}
          role="tabpanel"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ type: "spring", stiffness: 400, damping: 34 }}
        >
          {tab === "preview" && (
            <LivePreview key={run} eager code={item.previewCode} id={`detail-${item.slug}`} className="h-[min(72vh,640px)] w-full bg-paper-2" fit maxScale={1.6} designWidth={640} designHeight={420} />
          )}
          {tab === "prompt" && (
            <pre dir="ltr" lang="en" className="max-h-[560px] overflow-auto whitespace-pre-wrap bg-paper-2 p-6 font-mono text-[13px] leading-relaxed text-ink">{item.claudePrompt}</pre>
          )}
          {tab === "code" && (
            <pre dir="ltr" className="max-h-[560px] overflow-auto bg-ink p-6 font-mono text-[12.5px] leading-relaxed text-paper">
              <code>{item.previewCode}</code>
            </pre>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

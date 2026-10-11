"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import { Code2, Eye, MessageSquareText, RotateCcw } from "lucide-react";
import LivePreview from "./LivePreview";
import SitePreview from "./SitePreview";
import { WEBSITE } from "@/lib/data";
import CopyButton from "./CopyButton";
import { useLang } from "@/lib/i18n";
import { bulletHead, promptParts } from "@/lib/prompt-parts";

const TABS = [
  { id: "preview", Icon: Eye },
  { id: "prompt", Icon: MessageSquareText },
  { id: "code", Icon: Code2 },
];

export default function DetailTabs({ item }) {
  const { t } = useLang();
  const [tab, setTab] = useState("preview");
  const [run, setRun] = useState(0);
  const box = useRef(null);
  const [sec, setSec] = useState({ i: 0, n: 0 });
  const onSection = useCallback((i, n) => setSec((s) => (s.i === i && s.n === n ? s : { i, n })), []);

  // Switching from a long page preview to a short panel would shrink the page under the reader.
  // Bring the panel's top back into view first, so the switch happens where they are looking.
  const choose = (id) => {
    const top = box.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) window.scrollTo({ top: window.scrollY + top - 12, behavior: "instant" });
    setTab(id);
  };

  return (
    <div ref={box} className="scroll-mt-24 overflow-clip rounded-3xl border border-ink bg-paper">
      {/* stays in reach while a full-length site scrolls past */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-ink bg-paper p-3">
        <LayoutGroup id="detail-tabs">
          <div role="tablist" aria-label="View" className="flex gap-1 rounded-full border border-ink p-1">
            {TABS.map(({ id, Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                aria-controls={`panel-${id}`}
                onClick={() => choose(id)}
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
          {tab === "preview" && item.category === WEBSITE && (
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_340px]">
              <SitePreview key={run} eager mode="full" code={item.previewCode} id={`detail-${item.slug}`} className="w-full bg-paper-2" onSection={onSection} />
              <PromptLens item={item} sec={sec} />
            </div>
          )}
          {tab === "preview" && item.category !== WEBSITE && (
            <LivePreview key={run} eager code={item.previewCode} id={`detail-${item.slug}`} className="h-[min(72vh,640px)] w-full bg-paper-2" fit maxScale={1.6} designWidth={640} designHeight={420} />
          )}
          {tab === "prompt" && (
            <pre dir="ltr" lang="en" className="overflow-x-auto whitespace-pre-wrap bg-paper-2 p-6 font-mono text-[13px] leading-relaxed text-ink">{item.claudePrompt}</pre>
          )}
          {tab === "code" && (
            <pre dir="ltr" className="overflow-x-auto bg-ink p-6 font-mono text-[12.5px] leading-relaxed text-paper">
              <code>{item.previewCode}</code>
            </pre>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Detail-page lens: follows the live design as it scrolls and shows the prompt line that made each section. */
function PromptLens({ item, sec }) {
  const { t } = useLang();
  const P = useMemo(() => promptParts(item.claudePrompt), [item.claudePrompt]);
  const bullets = P.layout;
  const i = Math.min(sec.i, Math.max(0, bullets.length - 1));
  const b = bullets[i] || "";
  const head = bulletHead(b);
  const body = head ? b.slice(b.indexOf(":") + 1).trim() : b;
  const key = head.split(/[ /]/)[0].toLowerCase();
  const motionLine = key ? P.motion.find((m) => m.toLowerCase().startsWith(key) || m.toLowerCase().includes(key + " ")) : null;
  const total = Math.max(sec.n, bullets.length);
  return (
    <aside className="hidden border-s border-ink bg-paper lg:block" aria-label={t.detail.lens}>
      <div className="sticky top-[60px] flex max-h-[calc(100vh-72px)] flex-col gap-4 overflow-hidden p-5">
        <p className="label text-cobalt">{t.detail.lens}</p>
        <p className="text-[13px] leading-relaxed text-ink-3">{t.detail.lensHint}</p>
        <div className="h-px bg-ink/15" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-3"
          >
            <p className="label text-ink-3" style={{ fontVariantNumeric: "tabular-nums" }}>{t.detail.section(i + 1, total)}</p>
            {head && <h3 dir="ltr" lang="en" className="text-xl font-semibold tracking-[-0.02em] text-start">{head}</h3>}
            <p dir="ltr" lang="en" className="font-mono text-[12px] leading-[1.6] text-ink-2">{body}</p>
            {motionLine && (
              <div className="rounded-xl bg-paper-2 p-3">
                <p className="label mb-1 text-ink-3">{t.detail.motion}</p>
                <p dir="ltr" lang="en" className="font-mono text-[11.5px] leading-[1.55] text-ink-2">{motionLine}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <ol className="mt-auto flex gap-1 pt-2" aria-hidden>
          {bullets.map((_, n) => (
            <li key={n} className={`h-1 flex-1 rounded-full transition-colors duration-200 ${n === i ? "bg-ink" : "bg-ink/15"}`} />
          ))}
        </ol>
      </div>
    </aside>
  );
}

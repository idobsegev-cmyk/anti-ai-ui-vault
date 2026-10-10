"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

const ToastCtx = createContext({ toast: () => {} });

export function useToast() {
  return useContext(ToastCtx);
}

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const id = useRef(0);

  const toast = useCallback((message, sub) => {
    const key = ++id.current;
    setItems((list) => [...list.slice(-2), { key, message, sub }]);
    setTimeout(() => setItems((list) => list.filter((t) => t.key !== key)), 2600);
  }, []);

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex flex-col items-center gap-2 px-4">
        <AnimatePresence initial={false}>
          {items.map((t) => (
            <motion.div
              key={t.key}
              layout
              initial={{ y: 40, opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 460, damping: 30 }}
              className="pointer-events-auto flex items-center gap-3 rounded-full border border-ink bg-ink py-2 pl-2 pr-5 text-paper shadow-[4px_4px_0_var(--color-cobalt)]"
            >
              <motion.span
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 600, damping: 18, delay: 0.05 }}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-cobalt"
              >
                <Check size={15} strokeWidth={2.25} />
              </motion.span>
              <span className="text-sm font-medium">{t.message}</span>
              {t.sub && <span className="hidden font-mono text-[11px] text-paper/60 sm:inline">{t.sub}</span>}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}

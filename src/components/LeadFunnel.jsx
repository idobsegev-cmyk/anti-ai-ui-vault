"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Send } from "lucide-react";

const BANNER = "Need a high-converting, award-winning site for your business?".split(" ");

const TYPES = ["Business site", "Online shop", "Landing page", "Portfolio", "Web app"];
const BUDGETS = ["< $3k", "$3–8k", "$8–20k", "$20k+"];

function Word({ word, i, total, progress }) {
  const start = i / total;
  const opacity = useTransform(progress, [start * 0.6, start * 0.6 + 0.18], [0.12, 1]);
  const y = useTransform(progress, [start * 0.6, start * 0.6 + 0.18], [18, 0]);
  const accent = word.startsWith("award") ? "font-serif font-normal italic text-terracotta" : "";
  return (
    <motion.span style={{ opacity, y }} className={`mr-[0.22em] inline-block ${accent}`}>
      {word}
    </motion.span>
  );
}

function Field({ id, label, type = "text", value, onChange, autoComplete, textarea, error, placeholder }) {
  const [focus, setFocus] = useState(false);
  const up = focus || value.length > 0;
  const Tag = textarea ? "textarea" : "input";
  return (
    <motion.div
      key={error ? `err-${error}` : "ok"}
      animate={error ? { x: [0, -8, 8, -5, 5, 0] } : {}}
      transition={{ duration: 0.4 }}
      className="relative border-b border-ink pt-7"
    >
      <motion.label
        htmlFor={id}
        animate={{ y: up ? -24 : 0, scale: up ? 0.72 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        style={{ originX: 0 }}
        className={`pointer-events-none absolute left-0 top-7 text-xl ${error ? "text-terracotta" : "text-ink-2"}`}
      >
        {error || label}
      </motion.label>
      <Tag
        id={id}
        name={id}
        type={textarea ? undefined : type}
        rows={textarea ? 3 : undefined}
        value={value}
        autoComplete={autoComplete}
        placeholder={focus ? placeholder : ""}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-none bg-transparent pb-2 text-xl text-ink outline-none placeholder:text-ink-3/60"
      />
      <motion.span
        animate={{ scaleX: focus ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="absolute -bottom-px left-0 h-[2px] w-full origin-left bg-cobalt"
      />
    </motion.div>
  );
}

function Chips({ options, value, onChange, label }) {
  return (
    <fieldset>
      <legend className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value === o;
          return (
            <motion.button
              type="button"
              key={o}
              whileTap={{ scale: 0.94 }}
              aria-pressed={on}
              onClick={() => onChange(o)}
              className={`focus-ring flex items-center gap-1.5 rounded-full border border-ink px-4 py-2 text-sm transition-colors ${on ? "bg-ink text-paper" : "hover:bg-paper-2"}`}
            >
              {on && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 600, damping: 20 }}>
                  <Check size={14} strokeWidth={2.25} />
                </motion.span>
              )}
              {o}
            </motion.button>
          );
        })}
      </div>
    </fieldset>
  );
}

const STEP_TITLES = ["Who are we talking to?", "How do we reach you?", "What are we building?"];

export default function LeadFunnel() {
  const section = useRef(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start 85%", "start 15%"] });

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", type: "", budget: "", details: "", website: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = (s) => {
    const e = {};
    if (s === 0 && form.name.trim().length < 2) e.name = "Your name, please";
    if (s === 1) {
      const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email);
      const phoneOk = form.phone.replace(/\D/g, "").length >= 7;
      if (!emailOk && !phoneOk) e.email = "An email or a phone number";
    }
    if (s === 2 && !form.type) e.type = "Pick one";
    setErrors((prev) => {
      const n = {};
      for (const k of Object.keys(e)) n[k] = `${e[k]}${prev[k] ? "​" : ""}`; // retrigger shake
      return n;
    });
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    setDir(1);
    setStep((s) => s + 1);
  };
  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (step < 2) return next();
    if (!validate(2)) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="custom" ref={section} className="scroll-mt-20 border-b border-ink bg-paper" aria-labelledby="custom-title">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-28">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">Studio — by commission</p>
        <h2 id="custom-title" className="mt-3 max-w-6xl text-[clamp(2.4rem,6.4vw,6.4rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
          {BANNER.map((w, i) => (
            <Word key={i} word={w} i={i} total={BANNER.length} progress={scrollYProgress} />
          ))}
        </h2>

        <div className="mt-14 grid grid-cols-12 gap-8">
          <aside className="col-span-12 flex flex-col justify-between gap-8 md:col-span-4">
            <p className="text-lg leading-snug text-ink-2">
              The components in this vault are a sample of how we build client work: type set by hand, motion tuned on real devices, and pages
              structured to turn visitors into enquiries.
            </p>
            <ul className="border-t border-ink">
              {["Strategy, copy & design in one team", "Next.js build, fast by default", "SEO structure & analytics from day one", "4–6 weeks for most studio sites"].map((t) => (
                <li key={t} className="flex items-center gap-3 border-b border-ink py-3 text-sm">
                  <span className="h-2 w-2 rounded-full bg-terracotta" />
                  {t}
                </li>
              ))}
            </ul>
          </aside>

          <div className="col-span-12 md:col-span-8">
            <div className="relative overflow-hidden rounded-3xl border border-ink bg-paper-2 p-6 shadow-[6px_6px_0_var(--color-ink)] md:p-10">
              <AnimatePresence mode="wait" initial={false}>
                {status === "done" ? (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 24 }} className="flex min-h-[340px] flex-col items-start justify-center gap-4">
                    <motion.span initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: -6 }} transition={{ type: "spring", stiffness: 400, damping: 14, delay: 0.1 }} className="rounded-lg border-2 border-cobalt px-3 py-1 font-mono text-sm font-bold tracking-widest text-cobalt">
                      RECEIVED
                    </motion.span>
                    <h3 className="text-4xl font-semibold tracking-[-0.04em]">
                      Thanks, {form.name.split(" ")[0]}. <span className="font-serif font-normal italic">Talk soon.</span>
                    </h3>
                    <p className="max-w-md text-ink-2">You will hear back within one working day with a few questions and a rough plan.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0, y: -12 }} className="flex min-h-[340px] flex-col">
                    {/* honeypot */}
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set("website")(e.target.value)} className="hidden" aria-hidden />

                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
                        Step {step + 1} / 3
                      </span>
                      <div className="flex w-40 gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-paper-3">
                            <motion.span className="block h-full origin-left bg-cobalt" animate={{ scaleX: i <= step ? 1 : 0 }} transition={{ type: "spring", stiffness: 220, damping: 28 }} />
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="relative mt-6 flex-1">
                      <AnimatePresence mode="popLayout" custom={dir} initial={false}>
                        <motion.div
                          key={step}
                          custom={dir}
                          variants={{
                            enter: (d) => ({ x: d * 80, opacity: 0 }),
                            center: { x: 0, opacity: 1 },
                            exit: (d) => ({ x: d * -80, opacity: 0 }),
                          }}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ type: "spring", stiffness: 300, damping: 32 }}
                          className="flex flex-col gap-6"
                        >
                          <h3 className="text-3xl font-semibold tracking-[-0.03em]">{STEP_TITLES[step]}</h3>
                          {step === 0 && (
                            <>
                              <Field id="name" label="Your name" value={form.name} onChange={set("name")} autoComplete="name" error={errors.name} />
                              <Field id="company" label="Business name (optional)" value={form.company} onChange={set("company")} autoComplete="organization" />
                            </>
                          )}
                          {step === 1 && (
                            <>
                              <Field id="email" type="email" label="Email" value={form.email} onChange={set("email")} autoComplete="email" error={errors.email} placeholder="you@business.com" />
                              <Field id="phone" type="tel" label="Phone / WhatsApp (optional)" value={form.phone} onChange={set("phone")} autoComplete="tel" />
                            </>
                          )}
                          {step === 2 && (
                            <>
                              <Chips label={errors.type ? `Project type — ${errors.type}` : "Project type"} options={TYPES} value={form.type} onChange={set("type")} />
                              <Chips label="Budget (USD)" options={BUDGETS} value={form.budget} onChange={set("budget")} />
                              <Field id="details" label="Anything we should know?" value={form.details} onChange={set("details")} textarea placeholder="Goals, deadline, sites you like…" />
                            </>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                      <button type="button" onClick={back} disabled={step === 0} className="focus-ring inline-flex items-center gap-1.5 text-sm underline-offset-4 hover:underline disabled:invisible">
                        <ArrowLeft size={15} strokeWidth={1.75} /> Back
                      </button>
                      <motion.button
                        type="submit"
                        whileTap={{ scale: 0.95, x: 3, y: 3, boxShadow: "0 0 0 var(--color-ink)" }}
                        initial={{ boxShadow: "3px 3px 0 var(--color-ink)" }}
                        transition={{ type: "spring", stiffness: 600, damping: 22 }}
                        disabled={status === "sending"}
                        className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink bg-terracotta px-6 py-3 text-sm font-semibold text-paper disabled:opacity-60"
                      >
                        {step < 2 ? (
                          <>
                            Continue <ArrowRight size={15} strokeWidth={1.75} />
                          </>
                        ) : status === "sending" ? (
                          "Sending…"
                        ) : (
                          <>
                            Send brief <Send size={15} strokeWidth={1.75} />
                          </>
                        )}
                      </motion.button>
                    </div>
                    {status === "error" && <p className="mt-3 text-sm text-terracotta">Something went wrong. Please try again in a moment.</p>}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

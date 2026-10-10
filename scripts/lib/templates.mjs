// Parametric component families for the daily generator (offline mode).
// Each family × each business vertical yields a distinct, working component.
// Generated previewCode must not contain backticks; data is injected with JSON.stringify.

export const VERTICALS = [
  { key: "bakery", name: "Bakery", brand: "Crumb & Co.", accent: "#D9534F", icon: "Coffee", words: ["sourdough", "slow", "warm", "daily"], items: ["Country loaf", "Rye & seeds", "Morning buns", "Olive focaccia"], stat: [312, "loaves a day"], cta: "Order for pickup" },
  { key: "architect", name: "Architecture Studio", brand: "Haddad Arch.", accent: "#1D4ED8", icon: "Compass", words: ["quiet", "built", "light", "lasting"], items: ["Residential", "Adaptive reuse", "Interiors", "Competitions"], stat: [48, "buildings completed"], cta: "See the projects" },
  { key: "yoga", name: "Yoga Studio", brand: "Studio Salt", accent: "#D9534F", icon: "Leaf", words: ["breathe", "slow", "strong", "here"], items: ["Morning flow", "Yin & rest", "Strength", "Private sessions"], stat: [22, "classes a week"], cta: "Book a class" },
  { key: "law", name: "Law Firm", brand: "Ben-Ami & Katz", accent: "#1D4ED8", icon: "Lock", words: ["clear", "steady", "direct", "careful"], items: ["Startups", "Real estate", "Employment", "Disputes"], stat: [19, "years in practice"], cta: "Request a consult" },
  { key: "clinic", name: "Dental Clinic", brand: "Smile Lab", accent: "#1D4ED8", icon: "Sun", words: ["gentle", "bright", "calm", "honest"], items: ["Checkups", "Whitening", "Aligners", "Emergencies"], stat: [4.9, "average rating"], cta: "Book a visit" },
  { key: "coffee", name: "Coffee Roaster", brand: "Fieldnote Roasters", accent: "#D9534F", icon: "Coffee", words: ["roasted", "fresh", "small", "fair"], items: ["Single origin", "House blend", "Decaf", "Subscriptions"], stat: [64, "farms we buy from"], cta: "Shop beans" },
  { key: "gym", name: "Boxing Gym", brand: "Third Round", accent: "#D9534F", icon: "Zap", words: ["sharp", "loud", "fit", "ready"], items: ["Fundamentals", "Sparring", "Conditioning", "Kids club"], stat: [6, "coaches on the floor"], cta: "Try a free class" },
  { key: "florist", name: "Florist", brand: "Petal & Stem", accent: "#D9534F", icon: "Leaf", words: ["seasonal", "wild", "fresh", "local"], items: ["Weekly vase", "Weddings", "Dried bunches", "Workshops"], stat: [120, "stems in a big bouquet"], cta: "Send flowers" },
  { key: "realestate", name: "Real Estate Agency", brand: "Open Door", accent: "#1D4ED8", icon: "Home", words: ["honest", "local", "fast", "patient"], items: ["Buy", "Sell", "Rent", "Valuation"], stat: [230, "homes sold last year"], cta: "Get a valuation" },
  { key: "bookshop", name: "Independent Bookshop", brand: "Margins", accent: "#1D4ED8", icon: "Bookmark", words: ["curious", "paper", "slow", "shared"], items: ["New fiction", "Essays", "Kids corner", "Book club"], stat: [9000, "books on the shelves"], cta: "Visit the shop" },
  { key: "photo", name: "Photography Studio", brand: "Grain House", accent: "#D9534F", icon: "Eye", words: ["candid", "honest", "natural", "framed"], items: ["Portraits", "Weddings", "Products", "Editorial"], stat: [14, "years behind the lens"], cta: "Check dates" },
  { key: "winery", name: "Winery", brand: "Hill 412", accent: "#D9534F", icon: "Globe", words: ["sunny", "patient", "aged", "rooted"], items: ["Tastings", "Wine club", "Vineyard tours", "Events"], stat: [7, "grape varieties"], cta: "Book a tasting" },
];

const J = (v) => JSON.stringify(v);
const fmt = (n) => (Number.isInteger(n) ? String(n) : String(n));

export const FAMILIES = [
  // 1 — Hero
  {
    key: "hero-rotator",
    category: "Editorial Hero Sections",
    title: (v) => `${v.name} Hero with Spring Word Rotator`,
    description: (v) => `An editorial hero for a ${v.name.toLowerCase()} — ${v.brand} — where the closing word rotates through ${v.words.length} values on a masked spring slot, with a magnetic call-to-action.`,
    tags: (v) => ["Framer Motion", "Editorial", "Kinetic Type", v.name],
    prompt: (v) => ({
      brief: `A hero section for "${v.brand}", a ${v.name.toLowerCase()}. Big grotesk headline ending in a rotating italic serif word, a short deck line and one magnetic CTA.`,
      details: [
        `Top meta row: brand name left, 'Est. 2014' right, 1px charcoal rule below.`,
        `Headline: 'We keep it' + rotating word (${v.words.join(", ")}) in italic serif, colored ${v.accent}.`,
        `CTA pill: '${v.cta}' in charcoal with an arrow.`,
      ],
      interactions: [
        "Rotate the word every 2s with AnimatePresence mode='popLayout' inside an overflow-hidden mask (y 100% → 0 → -100%), spring stiffness 400 damping 30.",
        "CTA follows the pointer within its padding (35% of offset), spring stiffness 220 damping 15.",
      ],
    }),
    code: (v) => String.raw`
const WORDS = ${J(v.words)};
function Demo() {
  const [i, setI] = useState(0);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15 }), sy = useSpring(y, { stiffness: 220, damping: 15 });
  useEffect(() => { const t = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2000); return () => clearInterval(t); }, []);
  return (
    <section className="flex h-full w-full flex-col justify-between bg-[#FAF9F6] p-7 text-[#121212]">
      <div className="flex justify-between border-b border-[#121212] pb-2 font-mono text-[10px] uppercase tracking-widest"><span>${v.brand}</span><span>Est. 2014</span></div>
      <h1 className="text-[3rem] font-semibold leading-[0.95] tracking-[-0.045em]">
        We keep it
        <span className="relative block h-[1.05em] overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={WORDS[i]} initial={{ y: "100%" }} animate={{ y: "0%" }} exit={{ y: "-100%" }} transition={{ type: "spring", stiffness: 400, damping: 30 }} className="absolute left-0 font-serif italic font-normal" style={{ color: ${J(v.accent)} }}>{WORDS[i]}.</motion.span>
          </AnimatePresence>
        </span>
      </h1>
      <div onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.35); y.set((e.clientY - r.top - r.height / 2) * 0.35); }} onPointerLeave={() => { x.set(0); y.set(0); }} className="-m-4 w-fit p-4">
        <motion.a href="#" style={{ x: sx, y: sy }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 rounded-full bg-[#121212] px-5 py-3 text-sm font-medium text-[#FAF9F6]">${v.cta} <ArrowRight size={15} strokeWidth={1.5} /></motion.a>
      </div>
    </section>
  );
}
render(<Demo />);
`,
  },
  // 2 — Bento
  {
    key: "bento-spotlight",
    category: "Bento Feature Grids",
    title: (v) => `${v.name} Spotlight Bento`,
    description: (v) => `A four-tile bento for ${v.brand} where hovering a tile floods it with the accent color while the others recede — with a live count-up headline stat.`,
    tags: (v) => ["Framer Motion", "Bento", "Hover", v.name],
    prompt: (v) => ({
      brief: `A feature bento for "${v.brand}" (${v.name.toLowerCase()}). One stat tile and four offering tiles; hover spotlights one tile at a time.`,
      details: [
        `Stat tile (spans 2 rows): '${fmt(v.stat[0])}' counting up, label '${v.stat[1]}'.`,
        `Offering tiles: ${v.items.join(", ")} — mono index, title, 1px charcoal borders on paper.`,
      ],
      interactions: [
        `Hovered tile animates backgroundColor to ${v.accent} and text to cream; non-hovered tiles fade to opacity 0.55 (spring stiffness 300 damping 28).`,
        "Stat counts from 0 with animate() spring when in view.",
      ],
    }),
    code: (v) => String.raw`
const ITEMS = ${J(v.items)};
const TARGET = ${J(v.stat[0])};
function Demo() {
  const [h, setH] = useState(null);
  const [n, setN] = useState(0);
  useEffect(() => { const c = animate(0, TARGET, { type: "spring", stiffness: 50, damping: 20, onUpdate: (val) => setN(Number.isInteger(TARGET) ? Math.round(val) : Math.round(val * 10) / 10) }); return () => c.stop(); }, []);
  return (
    <div className="grid h-full w-full grid-cols-3 grid-rows-2 gap-2 bg-[#FAF9F6] p-4 text-[#121212]">
      <div className="row-span-2 flex flex-col justify-between rounded-lg border border-[#121212] bg-[#F2EFE8] p-3">
        <span className="font-mono text-[10px] uppercase tracking-widest">${v.brand}</span>
        <div><div className="text-4xl font-semibold tracking-[-0.04em]">{n.toLocaleString("en-US")}</div><div className="text-xs text-[#3a3a38]">${v.stat[1]}</div></div>
      </div>
      {ITEMS.map((t, i) => (
        <motion.div key={t} onPointerEnter={() => setH(i)} onPointerLeave={() => setH(null)}
          animate={{ backgroundColor: h === i ? ${J(v.accent)} : "#FAF9F6", color: h === i ? "#FAF9F6" : "#121212", opacity: h === null || h === i ? 1 : 0.55 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="flex flex-col justify-between rounded-lg border border-[#121212] p-3">
          <span className="font-mono text-[10px]">{"0" + (i + 1)}</span>
          <span className="text-sm font-semibold">{t}</span>
        </motion.div>
      ))}
    </div>
  );
}
render(<Demo />);
`,
  },
  // 3 — Buttons
  {
    key: "icon-press-row",
    category: "Tactile Micro-Interaction Buttons",
    title: (v) => `${v.name} Tactile Action Buttons`,
    description: (v) => `A pair of tactile buttons for ${v.brand}: a primary that presses into its hard shadow and a secondary icon button that spins its icon on a spring.`,
    tags: (v) => ["Framer Motion", "Tactile", "Press", v.name],
    prompt: (v) => ({
      brief: `Primary and secondary actions for "${v.brand}" that feel like physical keys.`,
      details: [
        `Primary: '${v.cta}', fill ${v.accent}, 1.5px charcoal border, hard shadow 4px 4px 0 #121212.`,
        `Secondary: 48px square cream icon button with a lucide '${v.icon}' icon.`,
      ],
      interactions: [
        "Primary whileTap: translate 4px,4px and shadow to 0 (spring stiffness 600 damping 20).",
        "Secondary: on click the icon rotates +360° with spring and the button squashes (scaleY 0.9).",
      ],
    }),
    code: (v) => String.raw`
function Demo() {
  const [spin, setSpin] = useState(0);
  return (
    <div className="flex h-full w-full items-center justify-center gap-4 bg-[#F2EFE8]">
      <motion.button initial={{ boxShadow: "4px 4px 0 #121212" }} whileHover={{ x: -1, y: -1, boxShadow: "5px 5px 0 #121212" }} whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0 #121212" }} transition={{ type: "spring", stiffness: 600, damping: 20 }}
        className="rounded-xl border-[1.5px] border-[#121212] px-5 py-3 text-sm font-bold text-[#FAF9F6]" style={{ background: ${J(v.accent)} }}>${v.cta}</motion.button>
      <motion.button aria-label="${v.name} action" onClick={() => setSpin((s) => s + 1)} whileTap={{ scaleY: 0.9 }} initial={{ boxShadow: "3px 3px 0 #121212" }}
        className="flex h-12 w-12 items-center justify-center rounded-xl border-[1.5px] border-[#121212] bg-[#FAF9F6]">
        <motion.span animate={{ rotate: spin * 360 }} transition={{ type: "spring", stiffness: 200, damping: 14 }}><${v.icon} size={20} strokeWidth={1.5} /></motion.span>
      </motion.button>
    </div>
  );
}
render(<Demo />);
`,
  },
  // 4 — Kinetic type
  {
    key: "stagger-word-banner",
    category: "Kinetic Typography Banners",
    title: (v) => `${v.name} Staggered Word Banner`,
    description: (v) => `A statement banner for ${v.brand} whose words drop in one by one with springy rotation, then lean away from the cursor on hover.`,
    tags: (v) => ["Framer Motion", "Kinetic Type", "Stagger", v.name],
    prompt: (v) => ({
      brief: `A typographic banner reading '${v.words.map((w) => w[0].toUpperCase() + w.slice(1)).join(". ")}.' for "${v.brand}".`,
      details: ["Four words, each on its own line at ~3.5rem, heavy grotesk; the last word in italic serif with the accent color.", "Replay link in mono bottom-right."],
      interactions: ["Each word: initial y -40, rotate -8, opacity 0 → 0 with spring stiffness 350 damping 14 and 90ms stagger.", "whileHover per word: x 10, skewX -6."],
    }),
    code: (v) => String.raw`
const WORDS = ${J(v.words.map((w) => w[0].toUpperCase() + w.slice(1) + "."))};
function Demo() {
  const [k, setK] = useState(0);
  return (
    <div className="relative flex h-full w-full flex-col justify-center bg-[#FAF9F6] px-8 text-[#121212]">
      <div key={k}>
        {WORDS.map((w, i) => (
          <motion.div key={w} initial={{ y: -40, rotate: -8, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }} whileHover={{ x: 10, skewX: -6 }}
            transition={{ type: "spring", stiffness: 350, damping: 14, delay: i * 0.09 }}
            className={"w-fit text-[3.1rem] font-black leading-[0.95] tracking-[-0.04em] " + (i === WORDS.length - 1 ? "font-serif italic font-normal" : "")}
            style={i === WORDS.length - 1 ? { color: ${J(v.accent)} } : undefined}>{w}</motion.div>
        ))}
      </div>
      <button onClick={() => setK(k + 1)} className="absolute bottom-4 right-5 font-mono text-[10px] uppercase tracking-widest underline underline-offset-4">Replay</button>
    </div>
  );
}
render(<Demo />);
`,
  },
  // 5 — 3D cards
  {
    key: "fan-deck",
    category: "Parallax/3D Interactive Cards",
    title: (v) => `${v.name} Fanned Card Deck`,
    description: (v) => `Three offering cards for ${v.brand} stacked like a hand of cards; hovering fans them out in 3D and the hovered card lifts forward.`,
    tags: (v) => ["Framer Motion", "3D", "Hover", v.name],
    prompt: (v) => ({
      brief: `A fanned deck of three cards for "${v.brand}" showing ${v.items.slice(0, 3).join(", ")}.`,
      details: ["Cards 150x200, rounded-xl, 1px charcoal border; alternating fills paper, accent, charcoal.", "Each card: mono index top, title bottom."],
      interactions: ["Stacked at rest (rotate 0, x 0). On container hover: rotate -12/0/12 and x -110/0/110 with spring stiffness 260 damping 20.", "Hovered card: y -16, z 40 (perspective 900px on the container)."],
    }),
    code: (v) => String.raw`
const ITEMS = ${J(v.items.slice(0, 3))};
const FILLS = [["#FAF9F6", "#121212"], [${J(v.accent)}, "#FAF9F6"], ["#121212", "#FAF9F6"]];
function Demo() {
  const [open, setOpen] = useState(false);
  const [h, setH] = useState(null);
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#F2EFE8]" style={{ perspective: 900 }} onPointerEnter={() => setOpen(true)} onPointerLeave={() => { setOpen(false); setH(null); }}>
      <div className="relative h-[200px] w-[150px]">
        {ITEMS.map((t, i) => (
          <motion.div key={t} onPointerEnter={() => setH(i)}
            animate={{ rotate: open ? (i - 1) * 12 : (i - 1) * 2, x: open ? (i - 1) * 110 : 0, y: h === i ? -16 : 0, z: h === i ? 40 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            style={{ background: FILLS[i][0], color: FILLS[i][1], zIndex: h === i ? 5 : i }}
            className="absolute inset-0 flex flex-col justify-between rounded-xl border border-[#121212] p-3">
            <span className="font-mono text-[10px]">{"0" + (i + 1)} / ${v.brand}</span>
            <span className="text-lg font-semibold leading-tight">{t}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
render(<Demo />);
`,
  },
  // 6 — Accordion
  {
    key: "menu-accordion",
    category: "Dynamic Accordions",
    title: (v) => `${v.name} Offerings Accordion`,
    description: (v) => `A single-open accordion listing what ${v.brand} offers; the open row gets an accent bar that grows from the left and its detail unfolds on a spring.`,
    tags: (v) => ["Framer Motion", "Accordion", "Services", v.name],
    prompt: (v) => ({
      brief: `An offerings accordion for "${v.brand}" with four rows: ${v.items.join(", ")}.`,
      details: ["Rows on 1px charcoal rules, mono index, title, chevron.", `Open row: 4px left bar in ${v.accent}, one-sentence detail and a '${v.cta}' text link.`],
      interactions: ["Detail panel height 0 ↔ auto with AnimatePresence, spring stiffness 300 damping 32.", "Left bar scaleY 0 → 1 origin-top; chevron rotates 180°."],
    }),
    code: (v) => String.raw`
const ITEMS = ${J(v.items)};
function Demo() {
  const [o, setO] = useState(0);
  return (
    <div className="flex h-full w-full items-center bg-[#FAF9F6] p-6 text-[#121212]">
      <div className="w-full border-b border-[#121212]">
        {ITEMS.map((t, i) => (
          <div key={t} className="relative border-t border-[#121212]">
            <motion.span animate={{ scaleY: o === i ? 1 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 28 }} className="absolute left-0 top-0 h-full w-1 origin-top" style={{ background: ${J(v.accent)} }} />
            <button aria-expanded={o === i} onClick={() => setO(o === i ? -1 : i)} className="flex w-full items-center gap-3 py-2.5 pl-4 text-left">
              <span className="font-mono text-[10px]">{"0" + (i + 1)}</span>
              <span className="flex-1 text-base font-semibold tracking-tight">{t}</span>
              <motion.span animate={{ rotate: o === i ? 180 : 0 }}><ChevronDown size={16} strokeWidth={1.5} /></motion.span>
            </button>
            <AnimatePresence initial={false}>
              {o === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 32 }} className="overflow-hidden pl-4">
                  <p className="pb-3 text-xs text-[#3a3a38]">{t} at ${v.brand}, done properly and explained in plain words. <a href="#" className="underline underline-offset-2">${v.cta}</a></p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
render(<Demo />);
`,
  },
  // 7 — Navigation
  {
    key: "underline-nav",
    category: "Animated Navigation Bars",
    title: (v) => `${v.name} Ink Underline Navbar`,
    description: (v) => `A navigation bar for ${v.brand} with an accent underline that slides between links via shared layout, plus a CTA that squishes on press.`,
    tags: (v) => ["Framer Motion", "layoutId", "Navigation", v.name],
    prompt: (v) => ({
      brief: `A top nav for "${v.brand}": wordmark, four links (${v.items.join(", ")}), and a '${v.cta}' button.`,
      details: ["Paper background, 1px bottom rule; links in small grotesk.", `Active underline: 2px bar in ${v.accent} under the active link.`],
      interactions: ["Underline uses layoutId='underline' (spring stiffness 500 damping 35); follows hover, returns to active on leave.", "CTA whileTap scale 0.94."],
    }),
    code: (v) => String.raw`
const LINKS = ${J(v.items)};
function Demo() {
  const [a, setA] = useState(0);
  const [h, setH] = useState(null);
  const s = h === null ? a : h;
  return (
    <div className="flex h-full w-full items-start bg-[#FAF9F6] text-[#121212]">
      <nav className="flex w-full items-center justify-between border-b border-[#121212] px-5 py-4">
        <span className="flex items-center gap-1.5 text-sm font-bold tracking-tight"><${v.icon} size={16} strokeWidth={1.5} />${v.brand}</span>
        <ul className="flex gap-4" onPointerLeave={() => setH(null)}>
          {LINKS.map((l, i) => (
            <li key={l} className="relative">
              <a href="#" onPointerEnter={() => setH(i)} onClick={(e) => { e.preventDefault(); setA(i); }} className="block py-1 text-xs font-medium">{l}</a>
              {s === i && <motion.span layoutId="underline" transition={{ type: "spring", stiffness: 500, damping: 35 }} className="absolute -bottom-1 left-0 h-[2px] w-full" style={{ background: ${J(v.accent)} }} />}
            </li>
          ))}
        </ul>
        <motion.button whileTap={{ scale: 0.94 }} className="rounded-full bg-[#121212] px-3 py-1.5 text-[11px] font-medium text-[#FAF9F6]">${v.cta}</motion.button>
      </nav>
    </div>
  );
}
render(<Demo />);
`,
  },
  // 8 — Forms
  {
    key: "chip-picker-form",
    category: "Interactive Forms",
    title: (v) => `${v.name} Spring Chip Booking Form`,
    description: (v) => `A compact booking form for ${v.brand}: pick a service from springy chips, enter an email with a drawing underline, and get a stamped confirmation.`,
    tags: (v) => ["Framer Motion", "Form", "Lead Gen", v.name],
    prompt: (v) => ({
      brief: `A two-field booking form for "${v.brand}".`,
      details: [`Chips: ${v.items.join(", ")} — pills with 1px charcoal border; selected fills charcoal with a check icon.`, "Email field on a hairline baseline with floating label.", `Submit: '${v.cta}' in ${v.accent}.`],
      interactions: ["Chip check icon scales 0 → 1 with spring; chips whileTap scale 0.94.", "Underline scaleX 0 → 1 on focus.", "On valid submit, swap form for a rotated 'BOOKED' stamp (scale 2 → 1, rotate -20 → -6, spring stiffness 400 damping 15)."],
    }),
    code: (v) => String.raw`
const OPTS = ${J(v.items)};
function Demo() {
  const [pick, setPick] = useState(null);
  const [email, setEmail] = useState("");
  const [focus, setFocus] = useState(false);
  const [done, setDone] = useState(false);
  const ok = pick !== null && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#FAF9F6] p-6 text-[#121212]">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="d" initial={{ scale: 2, rotate: -20, opacity: 0 }} animate={{ scale: 1, rotate: -6, opacity: 1 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} className="rounded-lg border-2 px-4 py-2 font-mono text-lg font-bold tracking-widest" style={{ borderColor: ${J(v.accent)}, color: ${J(v.accent)} }}>BOOKED — {OPTS[pick]}</motion.div>
        ) : (
          <motion.form key="f" exit={{ opacity: 0 }} onSubmit={(e) => { e.preventDefault(); if (ok) setDone(true); }} className="flex w-full max-w-sm flex-col gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest">${v.brand} — booking</span>
            <div className="flex flex-wrap gap-2">
              {OPTS.map((o, i) => (
                <motion.button type="button" key={o} whileTap={{ scale: 0.94 }} onClick={() => setPick(i)} aria-pressed={pick === i} className={"flex items-center gap-1 rounded-full border border-[#121212] px-3 py-1.5 text-xs " + (pick === i ? "bg-[#121212] text-[#FAF9F6]" : "")}>
                  {pick === i && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}><Check size={12} strokeWidth={2} /></motion.span>}{o}
                </motion.button>
              ))}
            </div>
            <label className="relative block border-b border-[#121212] pt-4">
              <motion.span animate={{ y: focus || email ? -16 : 0, scale: focus || email ? 0.8 : 1 }} style={{ originX: 0 }} className="pointer-events-none absolute left-0 top-4 text-sm text-[#3a3a38]">Email</motion.span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} className="w-full bg-transparent pb-1 text-sm outline-none" />
              <motion.span animate={{ scaleX: focus ? 1 : 0 }} className="absolute -bottom-px left-0 h-[2px] w-full origin-left" style={{ background: ${J(v.accent)} }} />
            </label>
            <motion.button whileTap={{ scale: 0.95 }} disabled={!ok} className="w-fit rounded-full px-5 py-2.5 text-sm font-semibold text-[#FAF9F6] disabled:opacity-40" style={{ background: ${J(v.accent)} }}>${v.cta}</motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
render(<Demo />);
`,
  },
];

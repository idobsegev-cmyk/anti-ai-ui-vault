// Seed components, part 2: 3D cards, accordions, navigation, forms.
// Rule: no backticks or ${} inside previewCode strings.

export default [
  // ───────────────────────── PARALLAX / 3D CARDS ─────────────────────────
  {
    title: "Layered Parallax Postcard",
    category: "Parallax/3D Interactive Cards",
    description:
      "A postcard built from flat paper layers — sky, hills, sun, stamp — that separate in depth as the pointer moves, like a pop-up book.",
    tags: ["Framer Motion", "Parallax", "3D", "Illustration"],
    prompt: {
      title: "Layered Parallax Postcard",
      brief:
        "A travel postcard illustration made entirely of flat CSS/SVG shapes on separate depth layers. Moving the pointer tilts the card and shifts each layer by a different amount.",
      details: [
        "Card 320x210, cream border 8px, charcoal 1px outline. Layers back-to-front: sky (#F2EFE8), terracotta sun circle, cobalt far hills, charcoal near hills, a postage stamp in the top-right, and the caption 'Greetings from Somewhere Quiet' in italic serif.",
        "No images; build the hills from SVG paths.",
      ],
      interactions: [
        "Card rotateX/rotateY ±10deg from pointer position (springs stiffness 200 damping 20).",
        "Each layer gets translateZ (0, 20, 35, 55, 80px) and an extra x/y shift proportional to depth, so near layers move more.",
        "Parent perspective 900px; preserve-3d on the card.",
      ],
    },
    previewCode: String.raw`
function Layer({ z, px, py, children, className }) {
  const x = useTransform(px, (v) => v * z * 0.25);
  const y = useTransform(py, (v) => v * z * 0.25);
  return <motion.div style={{ x, y, translateZ: z }} className={"absolute inset-0 " + (className || "")}>{children}</motion.div>;
}

function Demo() {
  const px = useSpring(0, { stiffness: 200, damping: 20 });
  const py = useSpring(0, { stiffness: 200, damping: 20 });
  const rx = useTransform(py, [-1, 1], [10, -10]);
  const ry = useTransform(px, [-1, 1], [-10, 10]);
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-[#FAF9F6]"
      style={{ perspective: 900 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set(((e.clientX - r.left) / r.width) * 2 - 1);
        py.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => { px.set(0); py.set(0); }}
    >
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative h-[210px] w-[320px] overflow-hidden rounded-sm border-[8px] border-[#FAF9F6] bg-[#F2EFE8] outline outline-1 outline-[#121212]">
        <Layer z={20} px={px} py={py}><div className="absolute left-[46%] top-[22%] h-16 w-16 rounded-full bg-[#D9534F]" /></Layer>
        <Layer z={35} px={px} py={py}>
          <svg viewBox="0 0 320 210" className="absolute bottom-0 h-full w-full" preserveAspectRatio="none"><path d="M-20 150 Q 60 90 140 135 T 340 120 V 230 H -20 Z" fill="#1D4ED8" /></svg>
        </Layer>
        <Layer z={55} px={px} py={py}>
          <svg viewBox="0 0 320 210" className="absolute bottom-0 h-full w-full" preserveAspectRatio="none"><path d="M-20 185 Q 90 130 180 175 T 340 165 V 230 H -20 Z" fill="#121212" /></svg>
        </Layer>
        <Layer z={80} px={px} py={py}>
          <div className="absolute right-3 top-3 flex h-12 w-10 items-center justify-center border-2 border-dashed border-[#121212] bg-[#FAF9F6] font-mono text-[8px]">04¢</div>
          <p className="absolute bottom-3 left-4 font-serif text-lg italic leading-none text-[#FAF9F6]">Greetings from<br />Somewhere Quiet</p>
        </Layer>
      </motion.div>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Specimen Flip Card",
    category: "Parallax/3D Interactive Cards",
    description:
      "A type-specimen card that flips in true 3D on click to reveal the glyph's metrics on the back, with a springy overshoot.",
    tags: ["Framer Motion", "3D Flip", "Typography", "Card"],
    prompt: {
      title: "Specimen Flip Card",
      brief:
        "A type-foundry specimen card: front shows a single huge glyph 'Ag' and font name; clicking flips the card 180° on the Y axis to reveal weights, sizes and a pangram on the back.",
      details: [
        "Card 260x320, cream front with charcoal border; back in cobalt with cream text.",
        "Front: 'Ag' at 9rem, font name 'Norm Grotesk', a small 'Flip ↻' hint. Back: list of weights (Light 300 → Black 900) with 1px rules and the pangram 'Sphinx of black quartz, judge my vow.'",
      ],
      interactions: [
        "Container perspective 1000px; inner wrapper animates rotateY 0 ↔ 180 with spring stiffness 260 damping 20 (visible overshoot).",
        "Both faces use backface-visibility hidden; back face pre-rotated 180deg.",
        "Hover (not flipped): lift with rotateX 4deg. The card is a <button> with aria-pressed.",
      ],
    },
    previewCode: String.raw`
function Demo() {
  const [flip, setFlip] = useState(false);
  const face = "absolute inset-0 flex flex-col rounded-xl border border-[#121212] p-5";
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#F2EFE8]" style={{ perspective: 1000 }}>
      <motion.button
        aria-pressed={flip}
        aria-label="Flip specimen card"
        onClick={() => setFlip(!flip)}
        animate={{ rotateY: flip ? 180 : 0 }}
        whileHover={flip ? {} : { rotateX: 4, y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="focus-ring relative h-[300px] w-[230px] text-left"
      >
        <div className={face + " justify-between bg-[#FAF9F6] text-[#121212]"} style={{ backfaceVisibility: "hidden" }}>
          <span className="font-mono text-[10px] uppercase tracking-widest">Specimen 07</span>
          <span className="text-[7.5rem] font-semibold leading-none tracking-[-0.05em]">Ag</span>
          <div className="flex items-end justify-between"><span className="text-sm font-medium">Norm Grotesk</span><span className="font-mono text-[10px]">Flip ↻</span></div>
        </div>
        <div className={face + " justify-between bg-[#1D4ED8] text-[#FAF9F6]"} style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div>
            {[["Light", 300], ["Regular", 400], ["Medium", 500], ["Bold", 700], ["Black", 900]].map(([n, w]) => (
              <div key={n} className="flex justify-between border-b border-[#FAF9F6]/40 py-1.5 text-sm" style={{ fontWeight: w }}><span>{n}</span><span className="font-mono text-[10px]">{w}</span></div>
            ))}
          </div>
          <p className="font-serif text-lg italic leading-tight">Sphinx of black quartz, judge my vow.</p>
        </div>
      </motion.button>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Swipe Deck Testimonials",
    category: "Parallax/3D Interactive Cards",
    description:
      "A stack of testimonial cards you can fling left or right; the top card rotates with drag and the next one rises to take its place.",
    tags: ["Framer Motion", "Drag", "Gesture", "Testimonials"],
    prompt: {
      title: "Swipe Deck Testimonials",
      brief:
        "Client testimonials presented as a physical deck of index cards. Drag the top card past a threshold (120px or fast velocity) to throw it; the stack advances and loops.",
      details: [
        "Cards 280x190 with alternating fills (paper, terracotta-soft #F6DCD9, cobalt-soft #DBE4FB), 1px charcoal border, quote in a serif italic, client name + role in mono.",
        "Show 3 cards stacked with offsets y 8px and scale 0.96 per depth.",
        "Prev/Next buttons beneath for keyboard and accessibility.",
      ],
      interactions: [
        "Top card: drag='x', rotate = useTransform(x, [-200, 200], [-14, 14]).",
        "onDragEnd: if |offset.x| > 120 or |velocity.x| > 600, animate x off-screen in that direction then move the card to the back of the array; otherwise spring back.",
        "Lower cards animate scale/y into new positions with spring stiffness 300 damping 25.",
      ],
    },
    previewCode: String.raw`
const quotes = [
  { q: "It is the first site we have that feels like us.", n: "Dana Levi", r: "Founder, Kiln & Co.", bg: "bg-[#FAF9F6]" },
  { q: "Clients keep asking who built it. That never happened before.", n: "Omar Haddad", r: "Partner, Haddad Arch.", bg: "bg-[#F6DCD9]" },
  { q: "Bookings doubled and the team finally likes our own website.", n: "Noa Ben-Ami", r: "Owner, Studio Salt", bg: "bg-[#DBE4FB]" },
  { q: "Quiet, fast and impossible to mistake for a template.", n: "Lior Katz", r: "CMO, Fieldnote", bg: "bg-[#FAF9F6]" },
];

function Card({ item, depth, onThrow }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-14, 14]);
  const isTop = depth === 0;
  return (
    <motion.div
      drag={isTop ? "x" : false}
      style={{ x: isTop ? x : 0, rotate: isTop ? rotate : 0, zIndex: 10 - depth }}
      animate={{ scale: 1 - depth * 0.04, y: depth * 9 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 120 || Math.abs(info.velocity.x) > 600) {
          const dir = info.offset.x > 0 ? 1 : -1;
          animate(x, dir * 500, { duration: 0.25 }).then(() => { onThrow(); x.set(0); });
        } else {
          animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
        }
      }}
      className={"absolute flex h-[190px] w-[280px] cursor-grab flex-col justify-between rounded-xl border border-[#121212] p-5 active:cursor-grabbing " + item.bg}
    >
      <p className="font-serif text-xl italic leading-snug">“{item.q}”</p>
      <div className="font-mono text-[10px] uppercase tracking-wider">{item.n} — {item.r}</div>
    </motion.div>
  );
}

function Demo() {
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const next = () => setOrder((o) => o.slice(1).concat(o[0]));
  const prev = () => setOrder((o) => [o[o.length - 1]].concat(o.slice(0, -1)));
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 bg-[#F2EFE8] text-[#121212]">
      <div className="relative h-[210px] w-[280px]">
        {order.slice(0, 3).reverse().map((idx) => (
          <Card key={idx} item={quotes[idx]} depth={order.indexOf(idx)} onThrow={next} />
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={prev} aria-label="Previous" className="focus-ring rounded-full border border-[#121212] p-2"><ArrowLeft size={16} strokeWidth={1.5} /></button>
        <button onClick={next} aria-label="Next" className="focus-ring rounded-full border border-[#121212] p-2"><ArrowRight size={16} strokeWidth={1.5} /></button>
      </div>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Hover Lift Product Card",
    category: "Parallax/3D Interactive Cards",
    description:
      "A product card whose object floats forward in Z on hover while the price tag swings on a pin, with a spring-driven shadow underneath.",
    tags: ["Framer Motion", "3D", "E-commerce", "Hover"],
    prompt: {
      title: "Hover Lift Product Card",
      brief:
        "An e-commerce card for a ceramic mug built from CSS shapes. On hover the mug lifts toward the viewer, its contact shadow shrinks, and a hanging price tag swings like a pendulum.",
      details: [
        "Card 260x320 cream with charcoal border; mug drawn with divs (terracotta body, charcoal handle ring) centered on an oval shadow.",
        "Price tag top-right: rotated paper tag '₪ 89' hanging from a pin by a 1px string.",
        "Bottom: product name 'Kiln Mug No. 3', 'Stoneware, 350ml' and an 'Add' pill.",
      ],
      interactions: [
        "whileHover on card: mug translateY -14 and translateZ 40 with spring stiffness 300 damping 18; shadow scale 0.7 opacity 0.5.",
        "Tag: on hover enter animate rotate keyframes [0, 14, -9, 5, -2, 0] over 1.2s (pendulum decay), transform-origin at the pin.",
        "Add pill uses whileTap scale 0.92.",
      ],
    },
    previewCode: String.raw`
function Demo() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#FAF9F6]" style={{ perspective: 800 }}>
      <motion.article initial="rest" animate="rest" whileHover="hover" className="relative flex h-[300px] w-[240px] flex-col justify-between rounded-xl border border-[#121212] bg-[#F2EFE8] p-4 text-[#121212]">
        <motion.div variants={{ hover: { rotate: [0, 14, -9, 5, -2, 0], transition: { duration: 1.2 } } }} style={{ originX: 0.5, originY: 0 }} className="absolute right-6 top-3 flex flex-col items-center">
          <span className="h-1.5 w-1.5 rounded-full bg-[#121212]" />
          <span className="h-5 w-px bg-[#121212]" />
          <span className="rounded-sm border border-[#121212] bg-[#FAF9F6] px-2 py-1 font-mono text-[11px]">₪ 89</span>
        </motion.div>
        <div className="relative mt-10 flex h-36 items-end justify-center">
          <motion.div variants={{ rest: { scale: 1, opacity: 0.25 }, hover: { scale: 0.7, opacity: 0.12 } }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="absolute bottom-0 h-3 w-28 rounded-[50%] bg-[#121212]" />
          <motion.div variants={{ rest: { y: 0, z: 0 }, hover: { y: -14, z: 40 } }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="relative mb-2 flex items-center">
            <div className="h-24 w-20 rounded-b-2xl rounded-t-md border border-[#121212] bg-[#D9534F]" />
            <div className="-ml-1 h-12 w-8 rounded-r-full border-[6px] border-l-0 border-[#121212]" />
          </motion.div>
        </div>
        <div className="flex items-end justify-between">
          <div><h3 className="text-sm font-semibold">Kiln Mug No. 3</h3><p className="font-mono text-[10px] text-[#6f6c66]">Stoneware, 350ml</p></div>
          <motion.button whileTap={{ scale: 0.92 }} className="focus-ring flex items-center gap-1 rounded-full bg-[#121212] px-3 py-1.5 text-xs font-medium text-[#FAF9F6]"><Plus size={13} strokeWidth={2} />Add</motion.button>
        </div>
      </motion.article>
    </div>
  );
}
render(<Demo />);
`,
  },

  // ───────────────────────── DYNAMIC ACCORDIONS ─────────────────────────
  {
    title: "Editorial FAQ Accordion",
    category: "Dynamic Accordions",
    description:
      "A numbered FAQ with hairline rules where the plus rotates into a cross and answers unfold on measured-height springs.",
    tags: ["Framer Motion", "Accordion", "FAQ", "Editorial"],
    prompt: {
      title: "Editorial FAQ Accordion",
      brief:
        "A frequently-asked-questions block styled like a printed index: big numbers, tight grotesk questions, serif answers, and a single-open accordion behavior.",
      details: [
        "Four questions: 'How long does a site take?', 'Do you use templates?', 'Who writes the copy?', 'What happens after launch?' with real 1–2 sentence answers.",
        "Each row: mono number 01–04, question, plus icon on the right in a 28px circle; rows separated by 1px charcoal rules.",
      ],
      interactions: [
        "Answer panel animates height 0 → 'auto' and opacity with AnimatePresence initial={false}, spring stiffness 300 damping 32.",
        "Plus icon rotates 45° (becoming ×) and the circle fills charcoal when open.",
        "The open question text shifts 6px right. Buttons have aria-expanded and aria-controls.",
      ],
    },
    previewCode: String.raw`
const faqs = [
  ["How long does a site take?", "Most studio sites take four to six weeks, from first sketch to launch."],
  ["Do you use templates?", "No. Every layout starts on paper and is built for one brand only."],
  ["Who writes the copy?", "You bring the facts, we shape the words together in two short workshops."],
  ["What happens after launch?", "Thirty days of fixes are included, then an optional monthly care plan."],
];

function Demo() {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#FAF9F6] p-6 text-[#121212]">
      <div className="w-full max-w-md border-b border-[#121212]">
        {faqs.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <div key={q} className="border-t border-[#121212]">
              <button aria-expanded={isOpen} aria-controls={"faq-" + i} onClick={() => setOpen(isOpen ? -1 : i)} className="focus-ring flex w-full items-center gap-4 py-3 text-left">
                <span className="font-mono text-[10px]">{"0" + (i + 1)}</span>
                <motion.span animate={{ x: isOpen ? 6 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 30 }} className="flex-1 text-sm font-semibold tracking-tight">{q}</motion.span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? "#121212" : "#FAF9F6", color: isOpen ? "#FAF9F6" : "#121212" }} transition={{ type: "spring", stiffness: 400, damping: 25 }} className="flex h-7 w-7 items-center justify-center rounded-full border border-[#121212]">
                  <Plus size={14} strokeWidth={1.5} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div id={"faq-" + i} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 32 }} className="overflow-hidden">
                    <p className="pb-4 pl-8 font-serif text-base italic leading-snug text-[#3a3a38]">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Horizontal Column Accordion",
    category: "Dynamic Accordions",
    description:
      "Five vertical panels side by side; the hovered panel widens to reveal its story while the rest compress into rotated spine labels.",
    tags: ["Framer Motion", "Flex Grow", "Hover", "Showcase"],
    prompt: {
      title: "Horizontal Column Accordion",
      brief:
        "A horizontal accordion for a portfolio: five columns, like book spines on a shelf. The active one grows wide to show a project title, year and short blurb.",
      details: [
        "Columns alternate colors: paper, charcoal, terracotta, cobalt, paper-2. Collapsed columns show a vertical rotated title and a mono index.",
        "Expanded column shows index, title at 2rem, year, one-line blurb, and an arrow link.",
      ],
      interactions: [
        "Animate flex-grow (1 → 5) with spring stiffness 260 damping 30 on hover and on focus (keyboard).",
        "Rotated label fades out while expanded content fades in with a 100ms delay.",
        "On mobile (<640px) switch to vertical stacking with height instead of width.",
      ],
    },
    previewCode: String.raw`
const cols = [
  { t: "Kiln & Co.", y: "2026", b: "Ceramics shop with a slow scroll.", c: "bg-[#FAF9F6] text-[#121212]" },
  { t: "Fieldnote", y: "2025", b: "Editorial site for a notebook brand.", c: "bg-[#121212] text-[#FAF9F6]" },
  { t: "Studio Salt", y: "2025", b: "Booking flow for a yoga studio.", c: "bg-[#D9534F] text-[#FAF9F6]" },
  { t: "Haddad Arch.", y: "2024", b: "Portfolio built around floor plans.", c: "bg-[#1D4ED8] text-[#FAF9F6]" },
  { t: "Norm Type", y: "2024", b: "A type foundry specimen site.", c: "bg-[#F2EFE8] text-[#121212]" },
];

function Demo() {
  const [a, setA] = useState(0);
  return (
    <div className="flex h-full w-full gap-1.5 bg-[#FAF9F6] p-4">
      {cols.map((c, i) => {
        const on = a === i;
        return (
          <motion.a
            href="#"
            key={c.t}
            onPointerEnter={() => setA(i)}
            onFocus={() => setA(i)}
            animate={{ flexGrow: on ? 5 : 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className={"focus-ring relative flex basis-0 overflow-hidden rounded-lg border border-[#121212] p-3 " + c.c}
          >
            <span className="absolute left-3 top-3 font-mono text-[10px]">{"0" + (i + 1)}</span>
            <AnimatePresence mode="wait" initial={false}>
              {on ? (
                <motion.div key="open" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} exit={{ opacity: 0 }} className="mt-auto min-w-[12rem]">
                  <span className="font-mono text-[10px]">{c.y}</span>
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">{c.t}</h3>
                  <p className="mt-1 text-xs opacity-80">{c.b}</p>
                  <ArrowUpRight className="mt-2" size={16} strokeWidth={1.5} />
                </motion.div>
              ) : (
                <motion.span key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-auto whitespace-nowrap text-xs font-medium [writing-mode:vertical-rl] rotate-180">{c.t}</motion.span>
              )}
            </AnimatePresence>
          </motion.a>
        );
      })}
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Process Stepper Accordion",
    category: "Dynamic Accordions",
    description:
      "A vertical process timeline where opening a step draws the connecting line down to it and checks off every earlier step.",
    tags: ["Framer Motion", "Timeline", "Process", "Accordion"],
    prompt: {
      title: "Process Stepper Accordion",
      brief:
        "A 'How we work' section: four process steps on a vertical line. Selecting a step expands its details and fills the progress line from the top down to that step.",
      details: [
        "Steps: Listen, Sketch, Build, Launch — each with a 2-sentence description and a duration chip (e.g. '1 week').",
        "Left rail: a 1px charcoal line with a cobalt fill overlay; each step has a 20px node circle that becomes a cobalt check when passed.",
      ],
      interactions: [
        "Rail fill scaleY animates to (activeIndex / (steps-1)) with origin-top spring stiffness 200 damping 28.",
        "Nodes before/at active animate background to cobalt and show a check (scale 0 → 1).",
        "Detail panel expands with height auto animation; others collapse.",
      ],
    },
    previewCode: String.raw`
const steps = [
  ["Listen", "1 week", "We interview you and two customers. You get a one-page brief back."],
  ["Sketch", "1 week", "Paper first, then grey boxes. Nothing pretty until the order feels right."],
  ["Build", "3 weeks", "Real components, real copy, weekly links you can click on your phone."],
  ["Launch", "2 days", "We move the domain, check every form and stay on call for the first week."],
];

function Demo() {
  const [a, setA] = useState(1);
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#FAF9F6] p-6 text-[#121212]">
      <div className="relative w-full max-w-sm">
        <div className="absolute bottom-3 left-[9px] top-3 w-px bg-[#121212]" />
        <motion.div className="absolute left-[8px] top-3 w-[3px] origin-top bg-[#1D4ED8]" style={{ height: "calc(100% - 24px)" }} animate={{ scaleY: a / (steps.length - 1) }} transition={{ type: "spring", stiffness: 200, damping: 28 }} />
        {steps.map(([t, d, body], i) => {
          const done = i <= a;
          return (
            <div key={t} className="relative pb-2 pl-9">
              <motion.span animate={{ backgroundColor: done ? "#1D4ED8" : "#FAF9F6" }} className="absolute left-0 top-2.5 flex h-5 w-5 items-center justify-center rounded-full border border-[#121212] text-[#FAF9F6]">
                <motion.span animate={{ scale: done ? 1 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}><Check size={11} strokeWidth={2.5} /></motion.span>
              </motion.span>
              <button aria-expanded={a === i} onClick={() => setA(i)} className="focus-ring flex w-full items-center justify-between py-2 text-left">
                <span className="text-sm font-semibold">{t}</span>
                <span className="rounded-full border border-[#121212] px-2 py-0.5 font-mono text-[10px]">{d}</span>
              </button>
              <AnimatePresence initial={false}>
                {a === i && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 32 }} className="overflow-hidden text-xs leading-relaxed text-[#3a3a38]">
                    <span className="block pb-2">{body}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Image Reveal Service List",
    category: "Dynamic Accordions",
    description:
      "A service list where opening an item reveals a color-block 'photo' that wipes in from a clip-path, paired with its deliverables.",
    tags: ["Framer Motion", "Clip Path", "Accordion", "Services"],
    prompt: {
      title: "Image Reveal Service List",
      brief:
        "A services accordion for an agency. Each opened service reveals a two-column panel: a visual block on the left that wipes in via clip-path, and a list of deliverables on the right.",
      details: [
        "Services: Brand Identity, Website, Motion. Visual blocks are composed color fields (terracotta, cobalt, charcoal) with simple geometric shapes inside — no stock images.",
        "Deliverables as small pill chips with 1px borders.",
      ],
      interactions: [
        "Panel height auto spring; visual uses clipPath inset(0 100% 0 0) → inset(0 0% 0 0) over a spring stiffness 120 damping 22.",
        "Chips stagger in 40ms apart from y 8.",
        "Header row arrow rotates 90° when open.",
      ],
    },
    previewCode: String.raw`
const services = [
  { t: "Brand Identity", c: "#D9534F", chips: ["Logo", "Type system", "Color", "Guidelines"] },
  { t: "Website", c: "#1D4ED8", chips: ["Design", "Next.js build", "CMS", "SEO"] },
  { t: "Motion", c: "#121212", chips: ["Micro-interactions", "Launch film", "Social loops"] },
];

function Demo() {
  const [o, setO] = useState(0);
  return (
    <div className="flex h-full w-full items-center bg-[#FAF9F6] p-5 text-[#121212]">
      <div className="w-full border-b border-[#121212]">
        {services.map((s, i) => (
          <div key={s.t} className="border-t border-[#121212]">
            <button aria-expanded={o === i} onClick={() => setO(o === i ? -1 : i)} className="focus-ring flex w-full items-center justify-between py-2.5 text-left text-lg font-semibold tracking-tight">
              {s.t}
              <motion.span animate={{ rotate: o === i ? 90 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}><ChevronRight size={18} strokeWidth={1.5} /></motion.span>
            </button>
            <AnimatePresence initial={false}>
              {o === i && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ type: "spring", stiffness: 300, damping: 32 }} className="overflow-hidden">
                  <div className="grid grid-cols-2 gap-3 pb-3">
                    <motion.div initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ type: "spring", stiffness: 120, damping: 22 }} className="relative h-20 overflow-hidden rounded-md" style={{ background: s.c }}>
                      <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-[#FAF9F6]/90" />
                      <div className="absolute bottom-2 left-2 h-6 w-14 bg-[#F2EFE8]" />
                    </motion.div>
                    <div className="flex flex-wrap content-start gap-1.5">
                      {s.chips.map((c, j) => (
                        <motion.span key={c} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + j * 0.04 }} className="rounded-full border border-[#121212] px-2 py-0.5 text-[11px]">{c}</motion.span>
                      ))}
                    </div>
                  </div>
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

  // ───────────────────────── ANIMATED NAVIGATION ─────────────────────────
  {
    title: "Sliding Pill Navigation",
    category: "Animated Navigation Bars",
    description:
      "A centered nav with a charcoal pill that glides under the hovered link via shared layout, returning to the active page when you leave.",
    tags: ["Framer Motion", "layoutId", "Navigation", "Hover"],
    prompt: {
      title: "Sliding Pill Navigation",
      brief:
        "A top navigation bar where a single highlight pill follows the hovered item and snaps back to the current page on pointer leave.",
      details: [
        "Bar: logo wordmark left ('norm.' with italic serif dot), links center (Work, Studio, Journal, Contact), a 'Book a call' outline button right.",
        "Container: paper background, 1px charcoal bottom rule.",
      ],
      interactions: [
        "Hover pill uses layoutId='nav-pill' with spring stiffness 500 damping 38; text color inverts to cream over the pill.",
        "Track hovered index; on mouse leave fall back to active index.",
        "Clicking a link sets it active. aria-current='page' on active.",
      ],
    },
    previewCode: String.raw`
const links = ["Work", "Studio", "Journal", "Contact"];

function Demo() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(null);
  const shown = hover === null ? active : hover;
  return (
    <div className="flex h-full w-full items-start bg-[#FAF9F6] text-[#121212]">
      <nav className="flex w-full items-center justify-between border-b border-[#121212] px-5 py-4">
        <span className="text-lg font-bold tracking-tight">norm<span className="font-serif italic text-[#1D4ED8]">.</span></span>
        <ul onPointerLeave={() => setHover(null)} className="flex gap-1">
          {links.map((l, i) => (
            <li key={l}>
              <a
                href="#"
                aria-current={active === i ? "page" : undefined}
                onPointerEnter={() => setHover(i)}
                onClick={(e) => { e.preventDefault(); setActive(i); }}
                className="focus-ring relative block rounded-full px-3 py-1.5 text-xs font-medium"
              >
                {shown === i && <motion.span layoutId="nav-pill" transition={{ type: "spring", stiffness: 500, damping: 38 }} className="absolute inset-0 rounded-full bg-[#121212]" />}
                <span className={"relative transition-colors " + (shown === i ? "text-[#FAF9F6]" : "")}>{l}</span>
              </a>
            </li>
          ))}
        </ul>
        <button className="focus-ring rounded-full border border-[#121212] px-3 py-1.5 text-xs font-medium hover:bg-[#121212] hover:text-[#FAF9F6]">Book a call</button>
      </nav>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Full-Screen Index Menu",
    category: "Animated Navigation Bars",
    description:
      "A hamburger that morphs into a cross and unrolls a full-bleed terracotta menu with giant staggered links rising through masks.",
    tags: ["Framer Motion", "Menu", "Stagger", "Mobile"],
    prompt: {
      title: "Full-Screen Index Menu",
      brief:
        "A mobile-first menu: tapping the burger rolls a terracotta sheet down from the top, and oversized numbered links rise into view one after another.",
      details: [
        "Header: wordmark left, burger button right (two 1.5px lines).",
        "Overlay: full container, terracotta #D9534F, cream text; links 'Work', 'Studio', 'Journal', 'Contact' at 2.5rem with mono numbers; footer row with an email and city.",
      ],
      interactions: [
        "Burger lines rotate to ±45° and meet in the middle (spring stiffness 400 damping 25).",
        "Overlay clipPath from inset(0 0 100% 0) to inset(0 0 0% 0) (spring stiffness 180 damping 26).",
        "Links: each inside overflow-hidden mask, y 100% → 0 with stagger 0.06 after 0.15s; exit reverses quickly.",
        "Escape closes; focus moves to first link on open.",
      ],
    },
    previewCode: String.raw`
const links = ["Work", "Studio", "Journal", "Contact"];

function Demo() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const k = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#FAF9F6] text-[#121212]">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ type: "spring", stiffness: 180, damping: 26 }} className="absolute inset-0 z-10 flex flex-col justify-between bg-[#D9534F] px-5 pb-4 pt-16 text-[#FAF9F6]">
            <ul>
              {links.map((l, i) => (
                <li key={l} className="overflow-hidden">
                  <motion.a href="#" initial={{ y: "100%" }} animate={{ y: 0, transition: { delay: 0.15 + i * 0.06, type: "spring", stiffness: 260, damping: 24 } }} exit={{ y: "100%", transition: { duration: 0.15 } }} className="flex items-baseline gap-3 text-[2.2rem] font-semibold leading-[1.05] tracking-[-0.03em]">
                    <span className="font-mono text-[10px]">{"0" + (i + 1)}</span>{l}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="flex justify-between border-t border-[#FAF9F6]/50 pt-2 font-mono text-[10px]"><span>hello@norm.studio</span><span>Tel Aviv</span></div>
          </motion.div>
        )}
      </AnimatePresence>
      <header className={"relative z-20 flex items-center justify-between px-5 py-4 " + (open ? "text-[#FAF9F6]" : "")}>
        <span className="text-lg font-bold tracking-tight">norm.</span>
        <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="focus-ring relative h-8 w-8">
          <motion.span animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} className="absolute left-1 right-1 top-1/2 h-[1.5px] bg-current" />
          <motion.span animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} className="absolute left-1 right-1 top-1/2 h-[1.5px] bg-current" />
        </button>
      </header>
      {!open && <p className="px-5 text-3xl font-semibold leading-tight tracking-tight">Tap the menu.<br /><span className="font-serif italic font-normal text-[#6f6c66]">It unrolls.</span></p>}
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Magnifying Dock Bar",
    category: "Animated Navigation Bars",
    description:
      "A bottom app dock whose icons swell based on cursor distance, with labels that pop above — flat paper icons, no gloss.",
    tags: ["Framer Motion", "Dock", "Proximity", "useTransform"],
    prompt: {
      title: "Magnifying Dock Bar",
      brief:
        "A floating bottom navigation dock inspired by desktop docks but in a flat, editorial style. Icons grow according to the pointer's horizontal distance.",
      details: [
        "Dock: cream pill with 1px charcoal border, hard 3px shadow. Six items: Home, Search, Inbox, Calendar, Bookmark, Settings (lucide icons).",
        "Each icon sits in a 40px square tile; tiles alternate cream and paper-2; the active one is cobalt.",
      ],
      interactions: [
        "Track mouseX on the dock (useMotionValue, Infinity when outside). For each tile compute distance to tile center; width = useTransform(distance, [-120, 0, 120], [40, 64, 40]) then useSpring mass 0.1 stiffness 170 damping 12.",
        "Tooltip label appears above hovered tile with y 6 → 0 and opacity.",
        "Click sets active with a small bounce (y [0,-8,0]).",
      ],
    },
    previewCode: String.raw`
const icons = [["Home", Home], ["Search", Search], ["Inbox", Inbox], ["Calendar", Calendar], ["Saved", Bookmark], ["Settings", Settings]];

function Tile({ mouseX, label, Icon, active, onClick }) {
  const ref = useRef(null);
  const [hov, setHov] = useState(false);
  const dist = useTransform(mouseX, (v) => {
    const r = ref.current ? ref.current.getBoundingClientRect() : { x: 0, width: 0 };
    return v - r.x - r.width / 2;
  });
  const w = useSpring(useTransform(dist, [-120, 0, 120], [40, 64, 40]), { mass: 0.1, stiffness: 170, damping: 12 });
  return (
    <motion.button
      ref={ref}
      aria-label={label}
      onClick={onClick}
      onPointerEnter={() => setHov(true)}
      onPointerLeave={() => setHov(false)}
      style={{ width: w, height: w }}
      animate={active ? { y: [0, -8, 0] } : { y: 0 }}
      className={"focus-ring relative flex shrink-0 items-center justify-center rounded-xl border border-[#121212] " + (active ? "bg-[#1D4ED8] text-[#FAF9F6]" : "bg-[#F2EFE8] text-[#121212]")}
    >
      <Icon size={18} strokeWidth={1.5} />
      <AnimatePresence>
        {hov && <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute -top-8 rounded-md bg-[#121212] px-2 py-0.5 text-[10px] text-[#FAF9F6]">{label}</motion.span>}
      </AnimatePresence>
    </motion.button>
  );
}

function Demo() {
  const mouseX = useMotionValue(Infinity);
  const [a, setA] = useState(0);
  return (
    <div className="flex h-full w-full items-end justify-center bg-[#FAF9F6] pb-8">
      <div onPointerMove={(e) => mouseX.set(e.clientX)} onPointerLeave={() => mouseX.set(Infinity)} className="flex h-[64px] items-end gap-2 rounded-2xl border border-[#121212] bg-[#FAF9F6] px-3 pb-3" style={{ boxShadow: "3px 3px 0 #121212" }}>
        {icons.map(([l, I], i) => <Tile key={l} mouseX={mouseX} label={l} Icon={I} active={a === i} onClick={() => setA(i)} />)}
      </div>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Hide-on-Scroll Header",
    category: "Animated Navigation Bars",
    description:
      "A header that tucks away when you scroll down, slides back on the slightest scroll up, and shows a reading-progress hairline.",
    tags: ["Framer Motion", "useScroll", "Header", "Progress"],
    prompt: {
      title: "Hide-on-Scroll Header",
      brief:
        "An article page header that respects reading: it hides on downward scroll, reappears on upward scroll, compacts after 80px, and draws a cobalt progress bar along its bottom edge.",
      details: [
        "Header: wordmark, section name in mono, and a 'Subscribe' pill. Paper background, bottom 1px rule.",
        "Body: an article with a headline and several paragraphs for scrolling.",
      ],
      interactions: [
        "useScroll on the page (or a scroll container) and useMotionValueEvent(scrollY, 'change') to compare with previous value; set hidden when delta > 0 and y > 80.",
        "Animate header y: hidden ? '-100%' : 0 with spring stiffness 400 damping 40.",
        "Progress bar scaleX = scrollYProgress smoothed by useSpring stiffness 200 damping 30, origin-left.",
      ],
    },
    previewCode: String.raw`
function Demo() {
  const ref = useRef(null);
  const { scrollY, scrollYProgress } = useScroll({ container: ref });
  const [hidden, setHidden] = useState(false);
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() || 0;
    setHidden(y > prev && y > 80);
  });
  return (
    <div ref={ref} className="relative h-full w-full overflow-y-auto bg-[#FAF9F6] text-[#121212]">
      <motion.header animate={{ y: hidden ? "-100%" : "0%" }} transition={{ type: "spring", stiffness: 400, damping: 40 }} className="sticky top-0 z-10 flex items-center justify-between border-b border-[#121212] bg-[#FAF9F6] px-5 py-3">
        <span className="font-bold tracking-tight">Margins</span>
        <span className="font-mono text-[10px] uppercase tracking-widest">Essay — 6 min</span>
        <button className="rounded-full bg-[#121212] px-3 py-1 text-[11px] font-medium text-[#FAF9F6]">Subscribe</button>
        <motion.span style={{ scaleX: progress }} className="absolute -bottom-px left-0 h-[2px] w-full origin-left bg-[#1D4ED8]" />
      </motion.header>
      <article className="mx-auto max-w-md px-5 py-8">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#6f6c66]">Scroll inside this box</p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight">Why the web started to look the <span className="font-serif italic font-normal">same</span>.</h1>
        {Array.from({ length: 7 }).map((_, i) => (
          <p key={i} className="mt-4 text-sm leading-relaxed text-[#3a3a38]">Templates made publishing cheap and design uniform. The fix is not more effects but more decisions: a typeface chosen on purpose, a grid you can feel, a single color that means something, and motion that behaves like the physical world.</p>
        ))}
      </article>
    </div>
  );
}
render(<Demo />);
`,
  },

  // ───────────────────────── INTERACTIVE FORMS ─────────────────────────
  {
    title: "Ink Underline Contact Form",
    category: "Interactive Forms",
    description:
      "A minimal contact form with floating labels and an underline that draws from the caret side on focus, plus a send button that flies its arrow away.",
    tags: ["Framer Motion", "Form", "Floating Label", "Focus"],
    prompt: {
      title: "Ink Underline Contact Form",
      brief:
        "A letter-style contact form with three fields (name, email, message). Labels float on focus or when filled, and a cobalt underline draws across under the focused field.",
      details: [
        "Fields sit on 1px charcoal baselines, no boxes. Labels in small grotesk; floating state shrinks to 10px mono uppercase.",
        "Submit: charcoal pill 'Send letter' with arrow. Success replaces the form with 'Thank you — we reply within a day.' in italic serif.",
      ],
      interactions: [
        "Label: animate y (0 → -18) and scale (1 → 0.8) when focused or non-empty, spring stiffness 500 damping 35.",
        "Underline: absolutely positioned 2px cobalt line scaleX 0 → 1 origin-left on focus.",
        "Submit: on click the arrow translates x 40 and fades, then form crossfades to success state (AnimatePresence mode='wait'). Validate email with a simple regex and shake the field (x keyframes [0,-6,6,-4,4,0]) if invalid.",
      ],
    },
    previewCode: String.raw`
function Field({ id, label, value, onChange, error, multiline }) {
  const [focus, setFocus] = useState(false);
  const up = focus || value.length > 0;
  const Tag = multiline ? "textarea" : "input";
  return (
    <motion.div animate={error ? { x: [0, -6, 6, -4, 4, 0] } : {}} transition={{ duration: 0.35 }} className="relative border-b border-[#121212] pt-5">
      <motion.label htmlFor={id} animate={{ y: up ? -18 : 0, scale: up ? 0.8 : 1 }} transition={{ type: "spring", stiffness: 500, damping: 35 }} style={{ originX: 0 }} className={"pointer-events-none absolute left-0 top-5 text-sm " + (error ? "text-[#D9534F]" : "text-[#3a3a38]")}>
        {label}
      </motion.label>
      <Tag id={id} value={value} rows={multiline ? 2 : undefined} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onChange={(e) => onChange(e.target.value)} className="w-full resize-none bg-transparent pb-1.5 text-sm text-[#121212] outline-none" />
      <motion.span animate={{ scaleX: focus ? 1 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 35 }} className="absolute -bottom-px left-0 h-[2px] w-full origin-left bg-[#1D4ED8]" />
    </motion.div>
  );
}

function Demo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(0);
  const [sent, setSent] = useState(false);
  const [flying, setFlying] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setErr((n) => n + 1); return; }
    setFlying(true);
    setTimeout(() => setSent(true), 450);
  };
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#FAF9F6] p-6 text-[#121212]">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.p key="ok" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-xs text-center font-serif text-2xl italic leading-snug">Thank you — we reply within a day.</motion.p>
        ) : (
          <motion.form key="f" exit={{ opacity: 0, y: -10 }} onSubmit={submit} noValidate className="flex w-full max-w-sm flex-col gap-4">
            <Field id="n" label="Your name" value={name} onChange={setName} />
            <Field key={"e" + err} id="e" label={err ? "A real email, please" : "Email"} value={email} onChange={setEmail} error={err > 0} />
            <Field id="m" label="What are we making?" value={msg} onChange={setMsg} multiline />
            <motion.button whileTap={{ scale: 0.96 }} type="submit" className="focus-ring mt-1 flex w-fit items-center gap-2 overflow-hidden rounded-full bg-[#121212] px-5 py-2.5 text-sm font-medium text-[#FAF9F6]">
              Send letter
              <motion.span animate={flying ? { x: 40, opacity: 0 } : { x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}><Send size={14} strokeWidth={1.5} /></motion.span>
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Multi-Step Brief Form",
    category: "Interactive Forms",
    description:
      "A three-step project brief with chip selectors, a segmented budget control and a progress rail; steps slide horizontally with direction-aware springs.",
    tags: ["Framer Motion", "Multi-Step", "Lead Gen", "Form"],
    prompt: {
      title: "Multi-Step Brief Form",
      brief:
        "A lead-capture brief that asks one thing at a time: project type (chips), budget (segmented), timeline (chips). A progress rail shows 3 segments.",
      details: [
        "Step header: 'Step 2 of 3' mono + question in large grotesk.",
        "Chips: pill buttons with 1px border; selected chips fill charcoal with cream text and a check icon.",
        "Footer: Back (text) and Continue (charcoal pill, disabled until a choice).",
      ],
      interactions: [
        "Steps use AnimatePresence custom={direction}: enter from x ±60 opacity 0, exit to x ∓60, spring stiffness 320 damping 32.",
        "Progress segments fill cobalt with scaleX springs.",
        "Selected chip check icon scales in. Final step shows a summary of choices.",
      ],
    },
    previewCode: String.raw`
const STEPS = [
  { q: "What are we making?", opts: ["Website", "Brand", "Shop", "App UI"] },
  { q: "Rough budget?", opts: ["< ₪20k", "₪20–50k", "₪50k+"] },
  { q: "When do you need it?", opts: ["ASAP", "1–2 months", "Flexible"] },
];

function Demo() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [ans, setAns] = useState({});
  const go = (d) => { setDir(d); setStep((s) => s + d); };
  const done = step === STEPS.length;
  return (
    <div className="flex h-full w-full flex-col justify-between bg-[#FAF9F6] p-6 text-[#121212]">
      <div className="flex gap-1.5">
        {STEPS.map((_, i) => (
          <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-[#E8E3D8]">
            <motion.div animate={{ scaleX: i < step || done ? 1 : i === step ? 0.35 : 0 }} transition={{ type: "spring", stiffness: 200, damping: 28 }} className="h-full origin-left bg-[#1D4ED8]" />
          </div>
        ))}
      </div>
      <div className="relative flex-1 overflow-hidden py-4">
        <AnimatePresence mode="popLayout" custom={dir} initial={false}>
          <motion.div
            key={step}
            custom={dir}
            variants={{ enter: (d) => ({ x: d * 60, opacity: 0 }), center: { x: 0, opacity: 1 }, exit: (d) => ({ x: d * -60, opacity: 0 }) }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            {done ? (
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest">Brief ready</span>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight">{ans[0]}, {ans[1]}, <span className="font-serif italic font-normal">{ans[2]}</span>.</h3>
                <p className="mt-2 text-xs text-[#3a3a38]">We will send a short plan within one working day.</p>
              </div>
            ) : (
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest">Step {step + 1} of {STEPS.length}</span>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight">{STEPS[step].q}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {STEPS[step].opts.map((o) => {
                    const on = ans[step] === o;
                    return (
                      <motion.button key={o} whileTap={{ scale: 0.95 }} onClick={() => setAns({ ...ans, [step]: o })} aria-pressed={on} className={"focus-ring flex items-center gap-1.5 rounded-full border border-[#121212] px-3.5 py-1.5 text-sm " + (on ? "bg-[#121212] text-[#FAF9F6]" : "")}>
                        {on && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}><Check size={13} strokeWidth={2} /></motion.span>}
                        {o}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-between">
        <button onClick={() => (done ? (setAns({}), setDir(-1), setStep(0)) : go(-1))} disabled={step === 0} className="focus-ring text-sm underline-offset-4 hover:underline disabled:opacity-30">{done ? "Start over" : "Back"}</button>
        {!done && <button onClick={() => go(1)} disabled={!ans[step]} className="focus-ring flex items-center gap-1.5 rounded-full bg-[#121212] px-4 py-2 text-sm font-medium text-[#FAF9F6] disabled:opacity-30">Continue <ArrowRight size={14} strokeWidth={1.5} /></button>}
      </div>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Typewriter OTP Input",
    category: "Interactive Forms",
    description:
      "A six-digit verification code input where each digit drops into its slot like a typewriter key and the row stamps green-free 'Verified' in cobalt.",
    tags: ["Framer Motion", "OTP", "Auth", "Micro"],
    prompt: {
      title: "Typewriter OTP Input",
      brief:
        "A one-time-code input with six slots. Digits land with a small typewriter drop; pasting fills all slots at once; completion triggers a satisfying stamp.",
      details: [
        "Six 44x54 slots, 1.5px charcoal border, mono 1.5rem digits. Active slot shows a blinking 2px caret.",
        "Caption: 'We sent a code to dana@kiln.co' with a 'Resend' link.",
        "On the 6th digit: slots turn cobalt-bordered, a rotated 'VERIFIED' stamp appears (cobalt, 2px border, mono).",
      ],
      interactions: [
        "Use one hidden real <input inputMode='numeric' autoComplete='one-time-code' maxLength=6> for accessibility; render slots from its value.",
        "Each new digit animates from y -12 scale 1.3 to y 0 scale 1 (spring stiffness 600 damping 18).",
        "Stamp: scale 2 rotate -20 opacity 0 → scale 1 rotate -8 opacity 1 with spring stiffness 400 damping 15. Backspace clears.",
      ],
    },
    previewCode: String.raw`
function Demo() {
  const [v, setV] = useState("");
  const ref = useRef(null);
  const full = v.length === 6;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[#FAF9F6] text-[#121212]">
      <p className="text-xs text-[#3a3a38]">We sent a code to <b>dana@kiln.co</b> · <button className="underline underline-offset-2">Resend</button></p>
      <div className="relative" onClick={() => ref.current && ref.current.focus({ preventScroll: true })}>
        <input ref={ref} aria-label="Verification code" value={v} onChange={(e) => setV(e.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" maxLength={6} className="absolute inset-0 opacity-0" />
        <div className="flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => {
            const ch = v[i];
            const active = i === v.length && !full;
            return (
              <div key={i} className={"relative flex h-[54px] w-[44px] items-center justify-center rounded-lg border-[1.5px] font-mono text-2xl transition-colors " + (full ? "border-[#1D4ED8] text-[#1D4ED8]" : "border-[#121212]")}>
                {ch && <motion.span key={ch + i} initial={{ y: -12, scale: 1.3 }} animate={{ y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 600, damping: 18 }}>{ch}</motion.span>}
                {active && <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="absolute h-6 w-[2px] bg-[#121212]" />}
              </div>
            );
          })}
        </div>
        <AnimatePresence>
          {full && (
            <motion.div initial={{ scale: 2, rotate: -20, opacity: 0 }} animate={{ scale: 1, rotate: -8, opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} className="pointer-events-none absolute -right-6 -top-6 rounded-md border-2 border-[#1D4ED8] bg-[#FAF9F6] px-2 py-1 font-mono text-xs font-bold tracking-widest text-[#1D4ED8]">
              VERIFIED
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button onClick={() => setV("")} className="font-mono text-[10px] uppercase tracking-widest text-[#6f6c66] underline underline-offset-4">Clear — try pasting 123456</button>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Spring Budget Slider",
    category: "Interactive Forms",
    description:
      "A range slider with a chunky draggable thumb that squashes on grab, a tick ruler, and a price label that rolls digits as you drag.",
    tags: ["Framer Motion", "Slider", "Drag", "Pricing"],
    prompt: {
      title: "Spring Budget Slider",
      brief:
        "A budget picker for a lead form: a ruler-like track with ticks, a draggable thumb that feels squishy, and a big live value readout.",
      details: [
        "Readout: '₪ 35,000' at 3rem with tabular numerals; a sub-label that changes by range ('Landing page', 'Studio site', 'Full platform').",
        "Track: 1px charcoal line with 11 ticks (taller every 5th); filled portion cobalt 3px.",
        "Thumb: 28px circle, charcoal fill, cream inner dot.",
      ],
      interactions: [
        "Thumb drag='x' constrained to the track; map x to value 5k–100k snapped to 5k.",
        "whileDrag: scaleX 1.25 scaleY 0.85 (squash); release springs to snapped position (stiffness 500 damping 30).",
        "Keyboard: arrow keys change by 5k; role='slider' with aria-valuenow/min/max/valuetext.",
        "Sub-label crossfades when the range bucket changes.",
      ],
    },
    previewCode: String.raw`
const MIN = 5000, MAX = 100000, STEP = 5000;
const W = 280;

function Demo() {
  const [val, setVal] = useState(35000);
  const x = useMotionValue(((35000 - MIN) / (MAX - MIN)) * W);
  const fill = useTransform(x, (v) => v + "px");
  const snap = (v) => Math.round(v / STEP) * STEP;
  const toX = (v) => ((v - MIN) / (MAX - MIN)) * W;
  const setFromX = (px) => {
    const v = snap(MIN + (Math.min(Math.max(px, 0), W) / W) * (MAX - MIN));
    setVal(v);
    return v;
  };
  const label = val < 25000 ? "Landing page" : val < 60000 ? "Studio site" : "Full platform";
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-[#FAF9F6] text-[#121212]">
      <div className="text-center">
        <div className="text-5xl font-semibold tabular-nums tracking-[-0.04em]">₪ {val.toLocaleString("en-US")}</div>
        <AnimatePresence mode="wait">
          <motion.div key={label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mt-1 font-serif text-lg italic text-[#3a3a38]">{label}</motion.div>
        </AnimatePresence>
      </div>
      <div className="relative" style={{ width: W }}>
        <div className="absolute left-0 top-1/2 h-px w-full bg-[#121212]" />
        <motion.div style={{ width: fill }} className="absolute left-0 top-1/2 h-[3px] -translate-y-px bg-[#1D4ED8]" />
        <div className="relative flex h-10 items-end justify-between">
          {Array.from({ length: 11 }).map((_, i) => <span key={i} className={"w-px bg-[#121212] " + (i % 5 === 0 ? "h-3" : "h-1.5")} />)}
        </div>
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: W }}
          dragElastic={0}
          dragMomentum={false}
          style={{ x }}
          onDrag={() => setFromX(x.get())}
          onDragEnd={() => animate(x, toX(setFromX(x.get())), { type: "spring", stiffness: 500, damping: 30 })}
          whileDrag={{ scaleX: 1.25, scaleY: 0.85 }}
          role="slider"
          tabIndex={0}
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          aria-valuenow={val}
          aria-valuetext={"₪" + val}
          onKeyDown={(e) => {
            const d = e.key === "ArrowRight" ? STEP : e.key === "ArrowLeft" ? -STEP : 0;
            if (!d) return;
            const v = Math.min(MAX, Math.max(MIN, val + d));
            setVal(v);
            animate(x, toX(v), { type: "spring", stiffness: 500, damping: 30 });
          }}
          className="focus-ring absolute -left-[14px] top-1/2 -mt-[14px] flex h-7 w-7 cursor-grab items-center justify-center rounded-full bg-[#121212] active:cursor-grabbing"
        >
          <span className="h-2 w-2 rounded-full bg-[#FAF9F6]" />
        </motion.div>
      </div>
      <div className="flex justify-between font-mono text-[10px] text-[#6f6c66]" style={{ width: W }}><span>₪5k</span><span>₪100k</span></div>
    </div>
  );
}
render(<Demo />);
`,
  },
];

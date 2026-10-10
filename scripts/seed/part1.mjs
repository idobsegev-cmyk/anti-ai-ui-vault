// Seed components, part 1: heroes, bento grids, tactile buttons, kinetic type.
// previewCode runs inside react-live (noInline). Available scope: see src/lib/live-scope.js.
// Rule: no backticks or ${} inside previewCode strings.

export default [
  // ───────────────────────── EDITORIAL HERO SECTIONS ─────────────────────────
  {
    title: "Masthead Hero with Rotating Serif Word",
    category: "Editorial Hero Sections",
    description:
      "A newspaper-style masthead with an issue line, hairline rules and a headline whose final word swaps on a spring-loaded vertical slot.",
    tags: ["Framer Motion", "Editorial", "Swiss", "Kinetic Type"],
    prompt: {
      title: "Masthead Hero with Rotating Serif Word",
      brief:
        "An editorial hero that reads like the front page of a design quarterly: issue metadata, a giant grotesk headline, and one italic serif word that rotates through four alternatives.",
      details: [
        "Top strip: 'Vol. 04 — Issue 12' left, a live-looking date right, separated by a 1px charcoal rule beneath.",
        "Headline (clamp 3rem-7rem, tracking -0.04em): 'Interfaces that feel' + rotating italic serif word in cobalt.",
        "Rotating words: 'handmade', 'considered', 'alive', 'human'.",
        "Below: a two-column row with a 2-line deck paragraph on the left and a small 'Read the issue' text-link with an arrow on the right.",
      ],
      interactions: [
        "Rotate the word every 2.2s using AnimatePresence mode='popLayout'; enter from y:100% and exit to y:-100% inside an overflow-hidden mask, spring stiffness 400 damping 30.",
        "The arrow in the link nudges 4px right on hover with a spring.",
        "Headline lines reveal on mount with a 60ms stagger from y:40 opacity 0.",
      ],
    },
    previewCode: String.raw`
const words = ["handmade", "considered", "alive", "human"];

function Demo() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="flex h-full w-full flex-col justify-between bg-[#FAF9F6] p-6 text-[#121212]">
      <div className="flex items-center justify-between border-b border-[#121212] pb-2 font-mono text-[10px] uppercase tracking-widest">
        <span>Vol. 04 — Issue 12</span>
        <span>Saturday Edition</span>
      </div>
      <h1 className="text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.04em]">
        <motion.span initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 26 }} className="block">
          Interfaces that feel
        </motion.span>
        <span className="relative block h-[1.05em] overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={words[i]}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute left-0 font-serif italic font-normal text-[#1D4ED8]"
            >
              {words[i]}.
            </motion.span>
          </AnimatePresence>
        </span>
      </h1>
      <div className="flex items-end justify-between gap-6 border-t border-[#121212] pt-3">
        <p className="max-w-[16rem] text-xs leading-relaxed text-[#3a3a38]">A quarterly on interface craft, typography and the small physics that make software feel made by people.</p>
        <motion.a href="#" whileHover="hover" className="flex shrink-0 items-center gap-1 text-xs font-medium underline-offset-4 hover:underline">
          Read the issue
          <motion.span variants={{ hover: { x: 4 } }} transition={{ type: "spring", stiffness: 500, damping: 20 }}>
            <ArrowRight size={14} strokeWidth={1.5} />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Draggable Sticker Stack Hero",
    category: "Editorial Hero Sections",
    description:
      "A playful studio hero where hand-cut 'stickers' scattered over the headline can be picked up and thrown with spring inertia.",
    tags: ["Framer Motion", "Drag", "Tactile", "Playful"],
    prompt: {
      title: "Draggable Sticker Stack Hero",
      brief:
        "A studio landing hero with a bold two-line headline and four sticker-like badges that visitors can drag, throw and stack. The stickers make the page feel touched by hand.",
      details: [
        "Headline: 'We design / with our hands.' in a heavy grotesk, centered.",
        "Four stickers: a cobalt circle 'Since 2014', a terracotta rounded rectangle 'Open for Q1', a cream rectangle with charcoal border 'No templates', a small charcoal pill 'Tel Aviv / Berlin'.",
        "Each sticker has a slight initial rotation (-8° to 10°) and a hard 3px offset charcoal shadow.",
      ],
      interactions: [
        "drag with dragConstraints set to the hero container ref, dragElastic 0.2, dragTransition bounceStiffness 400 bounceDamping 18.",
        "whileDrag: scale 1.08, rotate 0, cursor grabbing; the dragged sticker comes to the top (raise zIndex on drag start).",
        "whileHover: scale 1.04 with spring.",
      ],
    },
    previewCode: String.raw`
const stickers = [
  { label: "Since 2014", cls: "rounded-full bg-[#1D4ED8] text-[#FAF9F6] h-20 w-20 text-[11px]", x: 18, y: 18, r: -8 },
  { label: "Open for Q1", cls: "rounded-xl bg-[#D9534F] text-[#FAF9F6] px-3 py-2 text-xs", x: 250, y: 40, r: 9 },
  { label: "No templates", cls: "bg-[#FAF9F6] border border-[#121212] px-3 py-2 text-xs", x: 40, y: 220, r: 6 },
  { label: "Tel Aviv / Berlin", cls: "rounded-full bg-[#121212] text-[#FAF9F6] px-3 py-1 text-[10px]", x: 240, y: 230, r: -5 },
];

function Demo() {
  const ref = useRef(null);
  const [top, setTop] = useState(0);
  return (
    <section ref={ref} className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#F2EFE8] text-[#121212]">
      <h1 className="pointer-events-none select-none text-center text-[2.4rem] font-bold leading-[0.95] tracking-[-0.04em]">
        We design<br />
        <span className="font-serif italic font-normal">with our hands.</span>
      </h1>
      {stickers.map((s, idx) => (
        <motion.button
          key={s.label}
          drag
          dragConstraints={ref}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 18 }}
          onDragStart={() => setTop(idx)}
          whileHover={{ scale: 1.04 }}
          whileDrag={{ scale: 1.08, rotate: 0 }}
          initial={{ rotate: s.r, opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 20, delay: idx * 0.08 }}
          style={{ left: s.x, top: s.y, zIndex: top === idx ? 10 : 1, boxShadow: "3px 3px 0 #121212" }}
          className={"absolute flex cursor-grab items-center justify-center font-medium active:cursor-grabbing " + s.cls}
        >
          {s.label}
        </motion.button>
      ))}
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-[#6f6c66]">drag the stickers</span>
    </section>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Ink Reveal Cursor Hero",
    category: "Editorial Hero Sections",
    description:
      "A cream hero where a solid charcoal disc follows the cursor with spring lag and inverts the headline beneath it — no glow, just ink.",
    tags: ["Framer Motion", "Cursor", "Mix Blend", "Editorial"],
    prompt: {
      title: "Ink Reveal Cursor Hero",
      brief:
        "A minimal hero whose only ornament is a solid ink circle that trails the pointer and inverts the headline it passes over, like a loupe on newsprint.",
      details: [
        "Headline 'Less noise. More hand.' set huge and left-aligned, with a small mono caption 'Move your cursor' bottom-right.",
        "A 120px charcoal circle positioned absolutely, mix-blend-mode: difference, colored #FAF9F6 so it inverts the charcoal text to cream.",
      ],
      interactions: [
        "Track pointer with useMotionValue x/y relative to the section; smooth with useSpring stiffness 250 damping 25 mass 0.6.",
        "Circle scales from 0 to 1 on pointer enter and back to 0 on leave.",
        "Hovering the headline grows the circle to 1.6 scale.",
        "On touch devices hide the circle entirely.",
      ],
    },
    previewCode: String.raw`
function Demo() {
  const ref = useRef(null);
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const x = useSpring(mx, { stiffness: 250, damping: 25, mass: 0.6 });
  const y = useSpring(my, { stiffness: 250, damping: 25, mass: 0.6 });
  const [scale, setScale] = useState(0);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left - 60);
    my.set(e.clientY - r.top - 60);
  };
  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => setScale(1)}
      onPointerLeave={() => setScale(0)}
      className="relative flex h-full w-full cursor-none flex-col justify-center overflow-hidden bg-[#FAF9F6] p-8 text-[#121212]"
    >
      <h1
        onPointerEnter={() => setScale(1.6)}
        onPointerLeave={() => setScale(1)}
        className="text-[3rem] font-semibold leading-[0.9] tracking-[-0.05em]"
      >
        Less noise.<br />More <span className="font-serif italic font-normal">hand.</span>
      </h1>
      <motion.div
        aria-hidden
        style={{ x, y, mixBlendMode: "difference" }}
        animate={{ scale }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="pointer-events-none absolute left-0 top-0 h-[120px] w-[120px] rounded-full bg-[#FAF9F6]"
      />
      <span className="absolute bottom-4 right-5 font-mono text-[10px] uppercase tracking-widest text-[#6f6c66]">Move your cursor</span>
    </section>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Index Card Studio Hero",
    category: "Editorial Hero Sections",
    description:
      "A Swiss grid hero with a numbered services index; hovering a row slides a terracotta bar in from the left and shifts the text.",
    tags: ["Framer Motion", "Swiss Grid", "Hover", "Editorial"],
    prompt: {
      title: "Index Card Studio Hero",
      brief:
        "A typographic hero built on a strict 12-column Swiss grid: studio name, a one-line manifesto, and a numbered index of four services that react to hover.",
      details: [
        "Left 5 columns: studio name 'Atelier Norm' in small caps and the manifesto 'Websites with fingerprints on them.' in a large grotesk.",
        "Right 7 columns: an index list (01 Brand Systems, 02 Editorial Sites, 03 Product UI, 04 Motion Direction) separated by 1px rules, each row with a right-aligned arrow.",
      ],
      interactions: [
        "On row hover, a terracotta background bar scales from scaleX 0 to 1 with origin-left (spring stiffness 400 damping 35), text turns cream and slides 8px right.",
        "Arrow rotates from 0 to -45deg on hover.",
        "Rows stagger in on mount 70ms apart.",
      ],
    },
    previewCode: String.raw`
const rows = ["Brand Systems", "Editorial Sites", "Product UI", "Motion Direction"];

function Row({ label, n, delay }) {
  return (
    <motion.a
      href="#"
      initial="rest"
      animate="rest"
      whileHover="hover"
      className="relative flex items-center justify-between overflow-hidden border-t border-[#121212] px-2 py-3"
      variants={{ rest: { opacity: 1 } }}
    >
      <motion.span
        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="absolute inset-0 origin-left bg-[#D9534F]"
      />
      <motion.span
        variants={{ rest: { x: 0, color: "#121212" }, hover: { x: 8, color: "#FAF9F6" } }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative flex items-baseline gap-3 text-sm font-medium"
      >
        <span className="font-mono text-[10px]">{n}</span>{label}
      </motion.span>
      <motion.span
        variants={{ rest: { rotate: 0, color: "#121212" }, hover: { rotate: -45, color: "#FAF9F6" } }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative"
      >
        <ArrowRight size={16} strokeWidth={1.5} />
      </motion.span>
    </motion.a>
  );
}

function Demo() {
  return (
    <section className="grid h-full w-full grid-cols-12 gap-4 bg-[#FAF9F6] p-6 text-[#121212]">
      <div className="col-span-5 flex flex-col justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Atelier Norm</span>
        <h1 className="text-2xl font-semibold leading-[1] tracking-[-0.03em]">Websites with <span className="font-serif italic font-normal">fingerprints</span> on them.</h1>
      </div>
      <div className="col-span-7 flex flex-col justify-end border-b border-[#121212]">
        {rows.map((r, i) => (
          <motion.div key={r} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, type: "spring", stiffness: 300, damping: 26 }}>
            <Row label={r} n={"0" + (i + 1)} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
render(<Demo />);
`,
  },

  // ───────────────────────── BENTO FEATURE GRIDS ─────────────────────────
  {
    title: "Expanding Bento Grid",
    category: "Bento Feature Grids",
    description:
      "A four-tile bento where clicking any tile expands it to dominate the grid using shared layout animation; the others reflow with springs.",
    tags: ["Framer Motion", "Layout Animation", "Bento", "Swiss"],
    prompt: {
      title: "Expanding Bento Grid",
      brief:
        "A feature bento grid where one tile is always 'open'. Clicking another tile makes it the open one; every tile animates to its new size and position with layout springs.",
      details: [
        "Four features: 'Spring physics', 'Swiss type', 'Hairline grid', 'Human accents'. Each tile shows a mono index, a title, and (only when open) a one-sentence description.",
        "Open tile spans 2 columns and 2 rows; others are 1x1 on a 3x2 grid. Cream tiles with 1px charcoal borders; the open tile fills cobalt with cream text.",
      ],
      interactions: [
        "Use the layout prop on each tile with transition { type: 'spring', stiffness: 350, damping: 32 }.",
        "Description fades in with AnimatePresence after a 120ms delay; inner text uses layout='position' to avoid stretching.",
        "Tiles are <button> elements with aria-expanded.",
      ],
    },
    previewCode: String.raw`
const items = [
  { t: "Spring physics", d: "Every movement settles like a real object, never on a linear clock." },
  { t: "Swiss type", d: "Tight grotesk, strict baselines and one italic word for voice." },
  { t: "Hairline grid", d: "1px charcoal rules carry structure instead of shadows." },
  { t: "Human accents", d: "One cobalt or terracotta per screen. That is the whole palette." },
];

function Demo() {
  const [open, setOpen] = useState(0);
  return (
    <div className="grid h-full w-full grid-cols-3 grid-rows-2 gap-2 bg-[#FAF9F6] p-4">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <motion.button
            layout
            key={it.t}
            onClick={() => setOpen(i)}
            aria-expanded={isOpen}
            transition={{ type: "spring", stiffness: 350, damping: 32 }}
            className={
              "flex flex-col justify-between rounded-lg border border-[#121212] p-3 text-left " +
              (isOpen ? "col-span-2 row-span-2 bg-[#1D4ED8] text-[#FAF9F6]" : "bg-[#FAF9F6] text-[#121212]")
            }
          >
            <motion.span layout="position" className="font-mono text-[10px]">{"0" + (i + 1)}</motion.span>
            <div>
              <motion.h3 layout="position" className={isOpen ? "text-2xl font-semibold tracking-tight" : "text-sm font-semibold"}>{it.t}</motion.h3>
              <AnimatePresence>
                {isOpen && (
                  <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.12 } }} exit={{ opacity: 0 }} className="mt-2 max-w-[18rem] text-xs leading-relaxed">
                    {it.d}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Count-Up Stats Bento",
    category: "Bento Feature Grids",
    description:
      "An editorial results bento whose numbers count up with spring easing the moment they scroll into view, with a hand-drawn underline.",
    tags: ["Framer Motion", "useInView", "Data", "Editorial"],
    prompt: {
      title: "Count-Up Stats Bento",
      brief:
        "A case-study results section laid out as a bento: one big headline metric and three supporting stats. Numbers animate from zero with a spring when visible.",
      details: [
        "Large tile: '+212%' organic signups with a small caption and an SVG hand-drawn terracotta underline.",
        "Three small tiles: '4.8s → 0.9s' load time, '38' pages shipped, '1' person on the client side.",
        "Tile borders 1px charcoal, generous padding, mono captions.",
      ],
      interactions: [
        "Use useInView(ref, { once: true }) and animate(motionValue, target, { type: 'spring', stiffness: 60, damping: 20 }) rendering rounded values.",
        "Underline path draws with pathLength 0 → 1 after the number finishes (delay 0.4s).",
        "Tiles fade-up with stagger 80ms.",
      ],
    },
    previewCode: String.raw`
function Count({ to, suffix, prefix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { type: "spring", stiffness: 60, damping: 20, onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{prefix}{v}{suffix}</span>;
}

function Demo() {
  return (
    <div className="grid h-full w-full grid-cols-3 grid-rows-2 gap-2 bg-[#FAF9F6] p-4 text-[#121212]">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="col-span-2 row-span-2 flex flex-col justify-between rounded-lg border border-[#121212] p-4">
        <span className="font-mono text-[10px] uppercase tracking-widest">Organic signups</span>
        <div>
          <div className="relative inline-block text-6xl font-semibold tracking-[-0.05em]">
            <Count to={212} prefix="+" suffix="%" />
            <svg viewBox="0 0 200 20" className="absolute -bottom-3 left-0 w-full" fill="none">
              <motion.path d="M3 14 C 50 4, 120 4, 197 12" stroke="#D9534F" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }} />
            </svg>
          </div>
          <p className="mt-5 text-xs text-[#3a3a38]">Six months after relaunch, measured against the old template site.</p>
        </div>
      </motion.div>
      {[
        { k: "Pages shipped", el: <Count to={38} /> },
        { k: "Client-side team", el: <Count to={1} suffix=" person" /> },
      ].map((s, i) => (
        <motion.div key={s.k} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * (i + 1) }} className="flex flex-col justify-between rounded-lg border border-[#121212] p-3">
          <span className="font-mono text-[10px] uppercase tracking-widest">{s.k}</span>
          <span className="text-2xl font-semibold tracking-tight">{s.el}</span>
        </motion.div>
      ))}
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Spring Tilt Bento Tiles",
    category: "Bento Feature Grids",
    description:
      "A bento grid where each tile leans toward the pointer on a gentle 3D spring and lifts on a hard offset shadow — tactile, not glossy.",
    tags: ["Framer Motion", "3D", "Tilt", "Tactile"],
    prompt: {
      title: "Spring Tilt Bento Tiles",
      brief:
        "A five-tile feature bento in which every tile tilts slightly toward the cursor (max 8°) and lifts off the page on a hard charcoal shadow, like a card on a desk.",
      details: [
        "Mixed spans: one 2x2 hero tile with a lucide icon and title, four 1x1 tiles with icon + label.",
        "Tile colors: cream with charcoal border; one tile in terracotta; one in cobalt.",
      ],
      interactions: [
        "Per tile: useMotionValue for pointer x/y normalized -0.5..0.5, mapped via useTransform to rotateX/rotateY ±8deg, smoothed with useSpring stiffness 300 damping 20.",
        "Parent has perspective 800px; tiles use transformStyle preserve-3d.",
        "On hover the box-shadow goes from 0 0 0 to 6px 6px 0 #121212 and the tile translates -3px,-3px.",
        "Reset to flat on pointer leave.",
      ],
    },
    previewCode: String.raw`
function Tile({ className, children }) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 20 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 20 });
  return (
    <motion.div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => { px.set(0); py.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      whileHover={{ x: -3, y: -3, boxShadow: "6px 6px 0 #121212" }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={"flex flex-col justify-between rounded-lg border border-[#121212] p-3 " + className}
    >
      {children}
    </motion.div>
  );
}

function Demo() {
  return (
    <div className="grid h-full w-full grid-cols-3 grid-rows-2 gap-3 bg-[#FAF9F6] p-5 text-[#121212]" style={{ perspective: 800 }}>
      <Tile className="col-span-2 row-span-1 bg-[#FAF9F6]">
        <Layers size={20} strokeWidth={1.5} />
        <div><h3 className="text-xl font-semibold tracking-tight">Composable sections</h3><p className="text-xs text-[#3a3a38]">Mix and stack without breaking rhythm.</p></div>
      </Tile>
      <Tile className="bg-[#D9534F] text-[#FAF9F6]"><Feather size={18} strokeWidth={1.5} /><span className="text-sm font-medium">Lightweight</span></Tile>
      <Tile className="bg-[#FAF9F6]"><Type size={18} strokeWidth={1.5} /><span className="text-sm font-medium">Type first</span></Tile>
      <Tile className="bg-[#1D4ED8] text-[#FAF9F6]"><MousePointer2 size={18} strokeWidth={1.5} /><span className="text-sm font-medium">Reacts to you</span></Tile>
      <Tile className="bg-[#F2EFE8]"><Compass size={18} strokeWidth={1.5} /><span className="text-sm font-medium">Navigable</span></Tile>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Tabbed Showcase Bento",
    category: "Bento Feature Grids",
    description:
      "A bento with a segmented control on top; switching tabs morphs the grid's tile arrangement and swaps content with crossfades.",
    tags: ["Framer Motion", "Tabs", "layoutId", "Bento"],
    prompt: {
      title: "Tabbed Showcase Bento",
      brief:
        "A product capability section with three tabs (Design, Build, Launch). Each tab rearranges a 4-tile bento into a different composition and changes copy.",
      details: [
        "Segmented control: pill container with 1px charcoal border; active pill is a charcoal fill that slides between tabs via layoutId.",
        "Below, four tiles whose grid spans differ per tab (e.g. Design: 2x2 + three 1x1; Build: three-wide banner + 1x1 stack; Launch: two tall columns).",
      ],
      interactions: [
        "Active indicator uses layoutId='tab-pill' with spring stiffness 500 damping 35.",
        "Tiles use layout so they glide into the new arrangement; text crossfades via AnimatePresence mode='wait'.",
        "Arrow keys move between tabs (role='tablist').",
      ],
    },
    previewCode: String.raw`
const tabs = {
  Design: { spans: ["col-span-2 row-span-2", "", "", ""], words: ["Moodboards", "Type", "Grid", "Palette"] },
  Build: { spans: ["col-span-3", "", "", ""], words: ["Components", "Motion", "CMS", "QA"] },
  Launch: { spans: ["row-span-2", "row-span-2", "", ""], words: ["SEO", "Analytics", "Domains", "Care"] },
};
const names = Object.keys(tabs);

function Demo() {
  const [tab, setTab] = useState("Design");
  const cfg = tabs[tab];
  return (
    <div className="flex h-full w-full flex-col gap-3 bg-[#FAF9F6] p-4 text-[#121212]">
      <div role="tablist" className="flex w-fit gap-1 rounded-full border border-[#121212] p-1">
        {names.map((n) => (
          <button key={n} role="tab" aria-selected={tab === n} onClick={() => setTab(n)} className="relative rounded-full px-3 py-1 text-xs font-medium">
            {tab === n && <motion.span layoutId="tab-pill" transition={{ type: "spring", stiffness: 500, damping: 35 }} className="absolute inset-0 rounded-full bg-[#121212]" />}
            <span className={"relative " + (tab === n ? "text-[#FAF9F6]" : "")}>{n}</span>
          </button>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-3 grid-rows-3 gap-2">
        {cfg.words.map((w, i) => (
          <motion.div
            layout
            key={i}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className={"flex items-end rounded-lg border border-[#121212] p-2 " + (i === 0 ? "bg-[#1D4ED8] text-[#FAF9F6] " : "bg-[#F2EFE8] ") + cfg.spans[i]}
          >
            <AnimatePresence mode="wait">
              <motion.span key={w} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="text-sm font-semibold">{w}</motion.span>
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
render(<Demo />);
`,
  },

  // ───────────────────────── TACTILE BUTTONS ─────────────────────────
  {
    title: "Magnetic Pull Button",
    category: "Tactile Micro-Interaction Buttons",
    description:
      "A charcoal pill that gets pulled toward the cursor within a 90px field, its label lagging a bit further behind for a layered parallax.",
    tags: ["Framer Motion", "Magnetic", "Cursor", "Tactile"],
    prompt: {
      title: "Magnetic Pull Button",
      brief:
        "A primary call-to-action that behaves like it is magnetized: as the pointer approaches, the button drifts toward it, and the label drifts even more, creating depth.",
      details: [
        "Charcoal pill (#121212) with cream label 'Start a project' and an arrow icon; 1px charcoal outline ring offset by 6px that stays fixed.",
        "Wrap in a larger invisible hit area (padding 40px) to detect proximity.",
      ],
      interactions: [
        "Compute pointer offset from button center; button translates 35% of offset, label translates 55%; both springs stiffness 220 damping 15 mass 0.4.",
        "Release back to 0,0 on leave with the same spring (it should overshoot slightly).",
        "whileTap scale 0.95.",
      ],
    },
    previewCode: String.raw`
function Demo() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.4 });
  const lx = useTransform(sx, (v) => v * 0.6);
  const ly = useTransform(sy, (v) => v * 0.6);
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#FAF9F6]">
      <div onPointerMove={move} onPointerLeave={reset} className="p-12">
        <div className="relative rounded-full border border-[#121212] p-1.5">
          <motion.button ref={ref} style={{ x: sx, y: sy }} whileTap={{ scale: 0.95 }} className="focus-ring rounded-full bg-[#121212] px-7 py-4 text-sm font-medium text-[#FAF9F6]">
            <motion.span style={{ x: lx, y: ly }} className="flex items-center gap-2">
              Start a project <ArrowUpRight size={16} strokeWidth={1.5} />
            </motion.span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Squish Press Button",
    category: "Tactile Micro-Interaction Buttons",
    description:
      "A neo-print button with a hard offset shadow that physically presses down into the page on tap, then springs back.",
    tags: ["Framer Motion", "Tactile", "Neo-Print", "Press"],
    prompt: {
      title: "Squish Press Button",
      brief:
        "Three buttons (primary terracotta, secondary cream, tertiary cobalt) that feel like physical keys: a hard 4px charcoal offset shadow that collapses as the key is pressed.",
      details: [
        "Each button: 1.5px charcoal border, rounded-xl, bold label, shadow '4px 4px 0 #121212'.",
        "Labels: 'Add to cart', 'Save draft', 'Share'.",
      ],
      interactions: [
        "whileHover: translate -1px,-1px and shadow grows to 5px 5px.",
        "whileTap: translate 4px,4px, shadow 0 0 0, scaleY 0.97 scaleX 1.02 (a squish).",
        "Spring stiffness 600 damping 20 so release has a tiny bounce.",
      ],
    },
    previewCode: String.raw`
function Key({ children, cls }) {
  return (
    <motion.button
      initial={{ boxShadow: "4px 4px 0 #121212" }}
      whileHover={{ x: -1, y: -1, boxShadow: "5px 5px 0 #121212" }}
      whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0 #121212", scaleY: 0.97, scaleX: 1.02 }}
      transition={{ type: "spring", stiffness: 600, damping: 20 }}
      className={"focus-ring rounded-xl border-[1.5px] border-[#121212] px-5 py-3 text-sm font-bold " + cls}
    >
      {children}
    </motion.button>
  );
}

function Demo() {
  return (
    <div className="flex h-full w-full flex-wrap items-center justify-center gap-5 bg-[#F2EFE8]">
      <Key cls="bg-[#D9534F] text-[#FAF9F6]">Add to cart</Key>
      <Key cls="bg-[#FAF9F6] text-[#121212]">Save draft</Key>
      <Key cls="bg-[#1D4ED8] text-[#FAF9F6]">Share</Key>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Hold-to-Confirm Button",
    category: "Tactile Micro-Interaction Buttons",
    description:
      "A destructive-action button that must be held for 1.2 seconds; a terracotta fill sweeps across, and releasing early rewinds it on a spring.",
    tags: ["Framer Motion", "useAnimate", "Safety", "Tactile"],
    prompt: {
      title: "Hold-to-Confirm Button",
      brief:
        "A 'Delete project' button that replaces a confirmation modal: the user holds it, a fill grows across it, and only a full hold completes the action.",
      details: [
        "Cream button, 1px charcoal border, label 'Hold to delete' with a trash-like icon; a terracotta fill layer behind the label, scaleX 0 initially.",
        "After completion the label changes to 'Deleted' with a check and the button locks for 2s, then resets.",
      ],
      interactions: [
        "On pointerdown animate fill scaleX to 1 over 1.2s linear; on pointerup/leave before completion animate back to 0 with spring stiffness 300 damping 30.",
        "During the hold, the button shakes subtly (x ±1px) in the final 300ms.",
        "Keyboard: holding Space or Enter behaves the same; aria-live announces completion.",
      ],
    },
    previewCode: String.raw`
function Demo() {
  const fill = useMotionValue(0);
  const [done, setDone] = useState(false);
  const ctl = useRef(null);
  const start = () => {
    if (done) return;
    ctl.current = animate(fill, 1, { duration: 1.2, ease: "linear", onComplete: () => {
      setDone(true);
      setTimeout(() => { setDone(false); animate(fill, 0, { type: "spring", stiffness: 300, damping: 30 }); }, 2000);
    } });
  };
  const stop = () => {
    if (done) return;
    if (ctl.current) ctl.current.stop();
    animate(fill, 0, { type: "spring", stiffness: 300, damping: 30 });
  };
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#FAF9F6]">
      <button
        onPointerDown={start}
        onPointerUp={stop}
        onPointerLeave={stop}
        onKeyDown={(e) => { if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); start(); } }}
        onKeyUp={(e) => { if (e.key === " " || e.key === "Enter") stop(); }}
        className="focus-ring relative select-none overflow-hidden rounded-full border border-[#121212] bg-[#FAF9F6] px-6 py-3 text-sm font-medium text-[#121212]"
      >
        <motion.span style={{ scaleX: fill }} className="absolute inset-0 origin-left bg-[#D9534F]" />
        <span className="relative flex items-center gap-2" aria-live="polite">
          {done ? <><Check size={16} strokeWidth={1.75} /> Deleted</> : <><X size={16} strokeWidth={1.5} /> Hold to delete</>}
        </span>
      </button>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Copy Button Morph",
    category: "Tactile Micro-Interaction Buttons",
    description:
      "A compact copy button whose icon morphs into a drawn checkmark while the pill widens to reveal 'Copied' — layout-animated, no layout jump.",
    tags: ["Framer Motion", "Layout", "Clipboard", "Micro"],
    prompt: {
      title: "Copy Button Morph",
      brief:
        "A copy-to-clipboard button for code snippets that grows from an icon-only square into a labeled pill on success, then shrinks back.",
      details: [
        "Next to a short monospaced snippet 'npm i framer-motion' in a cream box with a charcoal border.",
        "Button: 36px square, charcoal border, copy icon. Success state: cobalt fill, cream check that draws in (pathLength), label 'Copied'.",
      ],
      interactions: [
        "Use layout on the button so width changes animate with spring stiffness 500 damping 32.",
        "Icon swap with AnimatePresence mode='popLayout' (scale 0.5 → 1, rotate -30 → 0).",
        "Return to idle after 1.6s. Call navigator.clipboard.writeText in a try/catch.",
      ],
    },
    previewCode: String.raw`
function Demo() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText("npm i framer-motion"); } catch (e) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#FAF9F6]">
      <div className="flex items-center gap-2 rounded-lg border border-[#121212] bg-[#F2EFE8] py-1.5 pl-4 pr-1.5 font-mono text-sm text-[#121212]">
        <span><span className="text-[#6f6c66]">$</span> npm i framer-motion</span>
        <motion.button
          layout
          onClick={copy}
          aria-label="Copy command"
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className={"focus-ring flex h-9 items-center justify-center gap-1.5 overflow-hidden rounded-md border border-[#121212] px-2.5 font-sans text-xs font-medium " + (copied ? "bg-[#1D4ED8] text-[#FAF9F6]" : "bg-[#FAF9F6]")}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {copied ? (
              <motion.svg key="c" width="16" height="16" viewBox="0 0 24 24" fill="none" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                <motion.path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
              </motion.svg>
            ) : (
              <motion.span key="i" initial={{ scale: 0.5, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0.5, opacity: 0 }}>
                <Copy size={15} strokeWidth={1.5} />
              </motion.span>
            )}
          </AnimatePresence>
          {copied && <motion.span layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Copied</motion.span>}
        </motion.button>
      </div>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Paper Confetti Like Button",
    category: "Tactile Micro-Interaction Buttons",
    description:
      "A heart button that pops with an overshoot and scatters small paper-cut squares and circles in terracotta, cobalt and charcoal.",
    tags: ["Framer Motion", "Particles", "Delight", "Tactile"],
    prompt: {
      title: "Paper Confetti Like Button",
      brief:
        "A like button whose reward feels like cut paper, not sparkles: on like, the heart pops and 10 small flat shapes burst outward and fall with gravity.",
      details: [
        "Round 56px cream button with a charcoal border; outlined heart icon idle, filled terracotta heart when liked; a counter beside it.",
        "Particles: 10 elements (squares 6px and circles 6px) in #D9534F, #1D4ED8, #121212.",
      ],
      interactions: [
        "On like: heart scale keyframes [1, 0.7, 1.25, 1] with spring; counter rolls up with a y slide.",
        "Each particle animates from center to a random angle at 40–70px radius, then y += 20 (gravity), rotate random ±180, opacity → 0 over 0.7s.",
        "Unlike: no particles, heart shrinks back to outline. aria-pressed reflects state.",
      ],
    },
    previewCode: String.raw`
const colors = ["#D9534F", "#1D4ED8", "#121212"];

function Demo() {
  const [liked, setLiked] = useState(false);
  const [burst, setBurst] = useState(0);
  const [count, setCount] = useState(128);
  const parts = useMemo(() => Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2 + Math.random() * 0.4;
    const d = 40 + Math.random() * 30;
    return { x: Math.cos(a) * d, y: Math.sin(a) * d, r: (Math.random() - 0.5) * 360, c: colors[i % 3], round: i % 2 === 0 };
  }), [burst]);
  const toggle = () => {
    setLiked((v) => !v);
    setCount((c) => (liked ? c - 1 : c + 1));
    if (!liked) setBurst((b) => b + 1);
  };
  return (
    <div className="flex h-full w-full items-center justify-center gap-3 bg-[#FAF9F6]">
      <div className="relative">
        {liked && parts.map((p, i) => (
          <motion.span
            key={burst + "-" + i}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ x: p.x, y: [0, p.y, p.y + 20], opacity: [1, 1, 0], rotate: p.r }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ background: p.c }}
            className={"pointer-events-none absolute left-1/2 top-1/2 -ml-[3px] -mt-[3px] h-[6px] w-[6px] " + (p.round ? "rounded-full" : "")}
          />
        ))}
        <motion.button
          aria-pressed={liked}
          aria-label="Like"
          onClick={toggle}
          whileTap={{ scale: 0.85 }}
          className="focus-ring relative flex h-14 w-14 items-center justify-center rounded-full border border-[#121212] bg-[#FAF9F6]"
        >
          <motion.span key={liked ? "on" : "off"} initial={{ scale: liked ? 0.7 : 1 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 12 }}>
            <Heart size={22} strokeWidth={1.5} fill={liked ? "#D9534F" : "none"} color={liked ? "#D9534F" : "#121212"} />
          </motion.span>
        </motion.button>
      </div>
      <div className="h-5 overflow-hidden font-mono text-sm text-[#121212]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={count} className="block" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}>{count}</motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Elastic Toggle Switch",
    category: "Tactile Micro-Interaction Buttons",
    description:
      "A settings toggle whose knob stretches like taffy while traveling and settles with a bounce; the track ink-fills to cobalt.",
    tags: ["Framer Motion", "Toggle", "Spring", "Settings"],
    prompt: {
      title: "Elastic Toggle Switch",
      brief:
        "A row of three settings toggles where the knob elongates in the direction of travel and snaps into place, making a binary choice feel physical.",
      details: [
        "Rows: 'Reduce motion', 'Weekly digest', 'Public profile', each with a label, a small mono helper line and a switch on the right; rows separated by 1px rules.",
        "Switch: 52x30 track with 1.5px charcoal border; knob 22px charcoal circle; on state track fills cobalt and knob turns cream.",
      ],
      interactions: [
        "Knob x is a useSpring (stiffness 700, damping 30); derive scaleX from useVelocity(x) via useTransform([-900,0,900] → [1.45,1,1.45]) so it stretches only while moving, with transform-origin on the trailing side.",
        "Track color transition 200ms.",
        "role='switch' with aria-checked; Space toggles.",
      ],
    },
    previewCode: String.raw`
function Switch({ label, hint, initial }) {
  const [on, setOn] = useState(initial);
  const x = useSpring(initial ? 22 : 0, { stiffness: 700, damping: 30 });
  const v = useVelocity(x);
  const scaleX = useTransform(v, [-900, 0, 900], [1.45, 1, 1.45]);
  useEffect(() => { x.set(on ? 22 : 0); }, [on, x]);
  return (
    <div className="flex items-center justify-between border-b border-[#121212] py-3">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="font-mono text-[10px] text-[#6f6c66]">{hint}</div>
      </div>
      <button
        role="switch"
        aria-checked={on}
        onClick={() => setOn(!on)}
        className={"focus-ring flex h-[30px] w-[52px] items-center rounded-full border-[1.5px] border-[#121212] p-[2px] transition-colors duration-200 " + (on ? "bg-[#1D4ED8]" : "bg-[#FAF9F6]")}
      >
        <motion.span
          style={{ x, scaleX, originX: on ? 1 : 0 }}
          className={"block h-[22px] w-[22px] rounded-full transition-colors duration-200 " + (on ? "bg-[#FAF9F6]" : "bg-[#121212]")}
        />
      </button>
    </div>
  );
}

function Demo() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#FAF9F6] p-6 text-[#121212]">
      <div className="w-full max-w-xs border-t border-[#121212]">
        <Switch label="Reduce motion" hint="Respect system setting" initial={false} />
        <Switch label="Weekly digest" hint="Sundays, 9:00" initial={true} />
        <Switch label="Public profile" hint="Visible to everyone" initial={false} />
      </div>
    </div>
  );
}
render(<Demo />);
`,
  },

  // ───────────────────────── KINETIC TYPOGRAPHY ─────────────────────────
  {
    title: "Wave Letter Hover Banner",
    category: "Kinetic Typography Banners",
    description:
      "A giant word split into letters; hovering sends a sine wave through them with per-letter spring delays, like a finger brushing piano keys.",
    tags: ["Framer Motion", "Kinetic Type", "Stagger", "Hover"],
    prompt: {
      title: "Wave Letter Hover Banner",
      brief:
        "A typographic banner where the word 'TACTILE' is split into individual letters that ripple upward in a wave when hovered, and each letter also reacts on its own when touched.",
      details: [
        "Letters in a heavy grotesk at ~8rem, charcoal on paper; one letter (the 'C') in italic serif terracotta for voice.",
        "Small mono caption above: 'hover the word'.",
      ],
      interactions: [
        "On container hover, each letter animates y: [0, -18, 0] with delay index*0.04 and spring stiffness 400 damping 12.",
        "Individual letter hover: scaleY 1.15, origin bottom.",
        "Split text into spans with aria-hidden and keep an sr-only full word for screen readers.",
      ],
    },
    previewCode: String.raw`
const word = "TACTILE".split("");

function Demo() {
  const [wave, setWave] = useState(0);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#FAF9F6] text-[#121212]">
      <span className="font-mono text-[10px] uppercase tracking-widest text-[#6f6c66]">hover the word</span>
      <h2 onPointerEnter={() => setWave((w) => w + 1)} className="flex text-[4.5rem] font-black leading-none tracking-[-0.04em]">
        <span className="sr-only">Tactile</span>
        {word.map((l, i) => (
          <motion.span
            aria-hidden
            key={i + "-" + wave}
            initial={{ y: 0 }}
            animate={wave ? { y: [0, -18, 0] } : {}}
            transition={{ delay: i * 0.04, duration: 0.5, ease: "easeInOut" }}
            whileHover={{ scaleY: 1.15 }}
            style={{ originY: 1 }}
            className={"inline-block " + (l === "C" ? "font-serif italic font-normal text-[#D9534F]" : "")}
          >
            {l}
          </motion.span>
        ))}
      </h2>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Draggable Speed Marquee",
    category: "Kinetic Typography Banners",
    description:
      "An infinite editorial marquee that slows to a crawl when hovered and can be flicked faster or reversed by dragging.",
    tags: ["Framer Motion", "Marquee", "useAnimationFrame", "Drag"],
    prompt: {
      title: "Draggable Speed Marquee",
      brief:
        "A full-width ticker of studio values separated by small asterisks. It runs forever, eases down when hovered, and responds to horizontal drags by adding velocity.",
      details: [
        "Two stacked rows moving in opposite directions: row 1 charcoal on paper, row 2 cream on terracotta.",
        "Items: 'Hand-set type', 'Real springs', 'No stock gradients', 'Made in small batches'.",
      ],
      interactions: [
        "Drive x with a motion value updated every frame (requestAnimationFrame) by baseSpeed * direction; wrap at -50% for seamless looping (duplicate content).",
        "On hover, lerp speed toward 0.15x; on leave back to 1x.",
        "Pointer drag adds the drag delta to x and temporarily sets direction from drag velocity.",
      ],
    },
    previewCode: String.raw`
const items = ["Hand-set type", "Real springs", "No stock gradients", "Made in small batches"];

function Row({ dir, cls }) {
  const x = useMotionValue(0);
  const speed = useRef(1);
  const target = useRef(1);
  const trackRef = useRef(null);
  const drag = useRef(null);
  useEffect(() => {
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 16.67;
      last = now;
      speed.current += (target.current - speed.current) * 0.08;
      const w = trackRef.current ? trackRef.current.scrollWidth / 2 : 1000;
      let next = x.get() - 1.2 * dir * speed.current * dt;
      if (next <= -w) next += w;
      if (next > 0) next -= w;
      if (!drag.current) x.set(next);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [dir, x]);
  const all = items.concat(items).concat(items).concat(items);
  return (
    <div
      onPointerEnter={() => (target.current = 0.15)}
      onPointerLeave={() => { target.current = 1; drag.current = null; }}
      onPointerDown={(e) => (drag.current = e.clientX)}
      onPointerUp={() => (drag.current = null)}
      onPointerMove={(e) => { if (drag.current !== null) { x.set(x.get() + (e.clientX - drag.current)); drag.current = e.clientX; } }}
      className={"cursor-grab overflow-hidden border-y border-[#121212] py-3 active:cursor-grabbing " + cls}
    >
      <motion.div ref={trackRef} style={{ x }} className="flex w-max select-none gap-6 whitespace-nowrap text-2xl font-semibold tracking-tight">
        {all.map((t, i) => (
          <span key={i} className="flex items-center gap-6">{t}<span className="font-serif text-xl">✳</span></span>
        ))}
      </motion.div>
    </div>
  );
}

function Demo() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-0 bg-[#FAF9F6] text-[#121212]">
      <Row dir={1} cls="bg-[#FAF9F6]" />
      <Row dir={-1} cls="bg-[#D9534F] text-[#FAF9F6]" />
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Split-Flap Headline",
    category: "Kinetic Typography Banners",
    description:
      "An airport split-flap board that shuffles random letters before landing on each word of a rotating headline.",
    tags: ["Kinetic Type", "Split Flap", "Retro", "Editorial"],
    prompt: {
      title: "Split-Flap Headline",
      brief:
        "A banner styled as a mechanical departures board. Each character cell scrambles through random glyphs, settling left-to-right on the next destination word.",
      details: [
        "Row label 'Now boarding' in mono, then 10 character cells: charcoal tiles with cream mono uppercase letters and a 1px horizontal split line through the middle.",
        "Words cycle: 'HUMAN', 'EDITORIAL', 'TACTILE', 'CRAFTED'. Pad with blanks to 10 cells.",
      ],
      interactions: [
        "Every 2.8s start a scramble; each cell flips through 6–10 random letters at 45ms intervals, with later cells finishing later (cell index * 2 extra flips).",
        "Each glyph change animates rotateX from -90 to 0 (perspective 400px) on the top half for a flap feel.",
        "Expose an aria-live region with the current word.",
      ],
    },
    previewCode: String.raw`
const WORDS = ["HUMAN", "EDITORIAL", "TACTILE", "CRAFTED"];
const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const N = 9;

function Cell({ ch }) {
  return (
    <div className="relative flex h-11 w-8 items-center justify-center overflow-hidden rounded-[4px] bg-[#121212] font-mono text-xl font-bold text-[#FAF9F6]" style={{ perspective: 400 }}>
      <motion.span key={ch} initial={{ rotateX: -90, opacity: 0.4 }} animate={{ rotateX: 0, opacity: 1 }} transition={{ duration: 0.09 }}>{ch === " " ? " " : ch}</motion.span>
      <span className="absolute inset-x-0 top-1/2 h-px bg-[#FAF9F6]/25" />
    </div>
  );
}

function Demo() {
  const [w, setW] = useState(0);
  const [cells, setCells] = useState(WORDS[0].padEnd(N, " ").split(""));
  useEffect(() => {
    const t = setInterval(() => setW((v) => (v + 1) % WORDS.length), 2800);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const target = WORDS[w].padEnd(N, " ").split("");
    const flips = target.map((_, i) => 6 + i * 2);
    const id = setInterval(() => {
      let busy = false;
      setCells((prev) => prev.map((c, i) => {
        if (flips[i] > 0) { flips[i]--; busy = true; return ABC[Math.floor(Math.random() * 26)]; }
        return target[i];
      }));
      if (!busy) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, [w]);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#F2EFE8] text-[#121212]">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Now boarding — Gate 04</span>
      <div className="flex gap-1">{cells.map((c, i) => <Cell key={i} ch={c} />)}</div>
      <span className="sr-only" aria-live="polite">{WORDS[w]}</span>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Masked Word Swap Banner",
    category: "Kinetic Typography Banners",
    description:
      "A statement banner where key words slide up through clip masks one by one, and the accent word gets a hand-drawn terracotta circle.",
    tags: ["Framer Motion", "Mask Reveal", "SVG Draw", "Editorial"],
    prompt: {
      title: "Masked Word Swap Banner",
      brief:
        "A manifesto banner that reveals line by line through overflow masks; the word 'people' is circled by an SVG stroke that draws itself like a pen mark.",
      details: [
        "Three lines: 'Made by' / 'people, for' / 'people.' at 4–6rem, left-aligned, charcoal on paper.",
        "Second 'people' wrapped in an absolutely positioned SVG ellipse stroked #D9534F at 3px, slightly rotated -4°.",
        "A 'Replay' text button bottom-right.",
      ],
      interactions: [
        "Each line is a mask (overflow-hidden) containing a span that animates y from 110% to 0 with spring stiffness 200 damping 26, 120ms stagger.",
        "After the lines land, the ellipse path animates pathLength 0 → 1 over 0.7s easeInOut.",
        "Replay remounts the sequence via a key.",
      ],
    },
    previewCode: String.raw`
function Line({ children, i }) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span className="block" initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ type: "spring", stiffness: 200, damping: 26, delay: i * 0.12 }}>
        {children}
      </motion.span>
    </span>
  );
}

function Demo() {
  const [k, setK] = useState(0);
  return (
    <div className="relative flex h-full w-full items-center bg-[#FAF9F6] px-8 text-[#121212]">
      <h2 key={k} className="text-[3.2rem] font-semibold leading-[0.95] tracking-[-0.045em]">
        <Line i={0}>Made by</Line>
        <Line i={1}>people, for</Line>
        <Line i={2}>
          <span className="relative inline-block">
            people.
            <svg viewBox="0 0 220 90" className="pointer-events-none absolute -left-[8%] -top-[18%] h-[136%] w-[116%] -rotate-[4deg]" fill="none">
              <motion.ellipse cx="110" cy="45" rx="104" ry="38" stroke="#D9534F" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.7, ease: "easeInOut" }} />
            </svg>
          </span>
        </Line>
      </h2>
      <button onClick={() => setK(k + 1)} className="focus-ring absolute bottom-4 right-5 font-mono text-[10px] uppercase tracking-widest underline underline-offset-4">Replay</button>
    </div>
  );
}
render(<Demo />);
`,
  },
];

// Seed components, part 3: a range of distinct design languages, so the vault is not one look.
// Rule: no backticks or ${} inside previewCode strings.
// Fonts used here are loaded by the site (see PREVIEW_FONTS in src/lib/preview-fonts.js).

const D = {
  brutal: { name: "Neo-Brutalist", rules: ["Acid yellow #FFE600 and white surfaces, pure black #000 text, 3px black borders everywhere.", "Hard 6px 6px 0 #000 shadows, zero blur, zero gradients, square corners.", "Type: Archivo Black for display, Space Mono for labels and prices."] },
  bauhaus: { name: "Bauhaus", rules: ["Primary red #E63322, blue #1F4E9E, yellow #F6C21B on off-white #F3EEE3, black #111 type.", "Pure geometric shapes only: circles, squares, quarter-circles, half-discs.", "Type: Syne (800) set tight and uppercase; strict grid alignment."] },
  memphis: { name: "Memphis 90s", rules: ["Hot pink #FF5FA2, teal #1CC6B6, sunflower #FFD23F, violet #7B5CFF on white, black outlines.", "Squiggles, dots and zig-zags as decoration; playful tilted shapes.", "Type: Fredoka (600–700) rounded and friendly."] },
  seventies: { name: "Retro 70s", rules: ["Burnt orange #E2711D, mustard #F2B134, chocolate #4A2C1D, cream #F6E7CB.", "Rounded stripes and sunset arcs; soft, warm, groovy.", "Type: Shrikhand for display, DM Sans for small copy."] },
  noir: { name: "Luxury Noir", rules: ["Near-black #0E0D0B background, champagne #CBB68B accent, ivory #EFE9DD text. No glow, no gradients.", "Hairline 1px champagne rules, very generous spacing, slow and confident motion.", "Type: Bodoni Moda (italic for accents) with tiny uppercase tracked labels."] },
  japanese: { name: "Japanese Minimal", rules: ["Washi off-white #F4F0E6, sumi ink #1B1B1B, one vermilion #C8372D seal.", "Asymmetry, generous negative space, vertical writing where it helps.", "Type: Noto Serif JP for Japanese, Shippori-like serif feel for Latin."] },
  y2k: { name: "Y2K Chrome", rules: ["Silver chrome gradients #E8ECF2→#9AA4B2, baby blue #A9D6FF, bubblegum #FFB7E1; dark outline #1C2230.", "Glossy pill shapes, starbursts, holographic foil sheen that moves with the pointer (no glow).", "Type: Syne 800 or a bubbly display face, all lowercase."] },
  retroos: { name: "Retro OS", rules: ["Classic desktop: teal desktop #008080, window grey #C0C0C0, navy title bar #000080.", "Beveled 2px borders (white top-left, dark bottom-right) on every control.", "Type: pixel-ish sans (Pixelify Sans) or MS Sans Serif stand-in."] },
  clay: { name: "Claymorphism", rules: ["Pastel lilac #CDB8FF, peach #FFC9A9, mint #B8F0D8 on #F3EEFF.", "Inflated rounded shapes: big radius, outer soft shadow plus inner highlight and inner shade (inset shadows).", "Type: Fredoka 600; everything feels squishy."] },
  riso: { name: "Risograph Zine", rules: ["Fluorescent pink #FF48B0 and riso blue #0078BF overprinting on newsprint #F2EFE4.", "mix-blend-mode: multiply for overlaps, deliberate 2–4px misregistration, halftone dots.", "Type: Archivo Black condensed feel, rough and loud."] },
  organic: { name: "Organic Earth", rules: ["Sage #A3B18A, moss #3A5A40, clay #DDA15E, bone #F7F3EA.", "Soft blob shapes that morph slowly; rounded, calm, breathing motion.", "Type: DM Serif Display for headlines, DM Sans for body."] },
  deco: { name: "Art Deco", rules: ["Deep emerald #0F3B33 and antique gold #C9A15B with ivory #F3EBD8.", "Symmetry, fan and sunburst motifs, thin double rules, stepped corners.", "Type: Poiret One for display, tracked uppercase labels."] },
  pixel: { name: "8-bit Arcade", rules: ["Arcade black #111 screen, pixel palette: red #FF004D, yellow #FFEC27, green #00E436, blue #29ADFF, white.", "Square pixels only: no radius, stepped (steps()) easing allowed for blinks.", "Type: Press Start 2P."] },
  datadense: { name: "Mono Data", rules: ["Slate #0F172A panel, #1E293B cards, #E2E8F0 text, single signal color lime #A3E635 for live values (flat, no glow).", "Dense grid, tabular numbers, sparklines, tiny uppercase labels.", "Type: IBM Plex Mono throughout."] },
  swiss: { name: "Swiss International", rules: ["Pure white, black, and signal red #E30613 only.", "Strict modular grid, flush-left ragged-right, huge numerals, no ornament.", "Type: Inter Tight / Helvetica-like grotesk, bold weights."] },
};

export default [
  {
    title: "Brutalist Pricing Toggle",
    category: "Bento Feature Grids",
    style: "Neo-Brutalist",
    description: "Loud pricing cards with 3px borders and hard shadows; a chunky monthly/yearly switch slams the prices to new values.",
    tags: ["Framer Motion", "Brutalist", "Pricing", "Toggle"],
    prompt: { title: "Brutalist Pricing Toggle", design: D.brutal, brief: "A pricing section that feels printed with a rubber stamp: two plans, a giant billing switch, prices that drop into place.", details: ["Header 'PRICING THAT DOESN'T HIDE' in Archivo Black.", "Switch: two segments MONTHLY / YEARLY (-20%), the active one filled black.", "Two cards: Starter $19 / $15 and Studio $49 / $39, feature list with ✕/✓ in Space Mono, black CTA bars."], interactions: ["Price change: old number drops out y +100%, new one slams in from y -100% with spring stiffness 700 damping 20.", "Cards: whileHover translate -4,-4 and shadow grows to 10px 10px 0 #000; whileTap flatten to 0 shadow."] },
    previewCode: String.raw`
const PLANS = [{ n: "Starter", m: 19, y: 15, f: ["1 site", "Basic support"] }, { n: "Studio", m: 49, y: 39, f: ["10 sites", "Priority support"] }];
function Demo() {
  const [yearly, setYearly] = useState(false);
  return (
    <div className="flex h-full w-full flex-col gap-3 bg-[#FFE600] p-4 text-black" style={{ fontFamily: "'Space Mono', monospace" }}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl leading-none" style={{ fontFamily: "'Archivo Black', sans-serif" }}>PRICING THAT<br />DOESN'T HIDE</h3>
        <div className="flex border-[3px] border-black bg-white text-[10px] font-bold">
          {["MONTHLY", "YEARLY -20%"].map((l, i) => (
            <button key={l} onClick={() => setYearly(i === 1)} className={"px-2 py-1.5 " + ((i === 1) === yearly ? "bg-black text-[#FFE600]" : "")}>{l}</button>
          ))}
        </div>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-4">
        {PLANS.map((p, i) => (
          <motion.div key={p.n} initial={{ boxShadow: "6px 6px 0 #000" }} whileHover={{ x: -4, y: -4, boxShadow: "10px 10px 0 #000" }} whileTap={{ x: 6, y: 6, boxShadow: "0px 0px 0 #000" }} transition={{ type: "spring", stiffness: 600, damping: 22 }}
            className={"flex flex-col justify-between border-[3px] border-black p-3 " + (i ? "bg-black text-[#FFE600]" : "bg-white")}>
            <div className="text-xs font-bold uppercase">{p.n}</div>
            <div className="flex h-12 items-end overflow-hidden" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              <span className="text-2xl">$</span>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span key={String(yearly)} initial={{ y: "-100%" }} animate={{ y: "0%" }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 700, damping: 20 }} className="text-5xl leading-none">{yearly ? p.y : p.m}</motion.span>
              </AnimatePresence>
              <span className="mb-1 text-[10px]">/MO</span>
            </div>
            <ul className="text-[10px] leading-relaxed">{p.f.map((f) => <li key={f}>✓ {f}</li>)}</ul>
            <div className={"mt-2 py-1.5 text-center text-[11px] font-bold " + (i ? "bg-[#FFE600] text-black" : "bg-black text-white")}>GET {p.n.toUpperCase()} →</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Bauhaus Geometry Hero",
    category: "Editorial Hero Sections",
    style: "Bauhaus",
    description: "A poster-like hero built from primary-colored circles, squares and half-discs that rotate into a new composition on every click.",
    tags: ["Framer Motion", "Bauhaus", "Geometric", "Poster"],
    prompt: { title: "Bauhaus Geometry Hero", design: D.bauhaus, brief: "A hero that is a Bauhaus poster: a 3x3 grid of primary geometric tiles beside a stacked uppercase headline. Clicking reshuffles the composition.", details: ["Left: 'FORM / FOLLOWS / FUN' in Syne 800, one word per line, the middle word in red.", "Right: 3x3 grid of tiles; each tile is a square with a circle, quarter-circle or half-disc in red, blue, yellow or black.", "Bottom: tiny label 'Est. 1919 — Weimar' and a round 'Shuffle' button."], interactions: ["Shuffle rotates each tile's inner shape by a random multiple of 90° and swaps colors, staggered 40ms, spring stiffness 260 damping 16.", "Hovering a tile scales its shape to 1.12."] },
    previewCode: String.raw`
const COLS = ["#E63322", "#1F4E9E", "#F6C21B", "#111111"];
const SHAPES = ["circle", "quarter", "half", "square"];
function Shape({ kind, color }) {
  if (kind === "circle") return <div className="h-full w-full rounded-full" style={{ background: color }} />;
  if (kind === "quarter") return <div className="h-full w-full rounded-tl-full" style={{ background: color }} />;
  if (kind === "half") return <div className="h-1/2 w-full self-end rounded-t-full" style={{ background: color }} />;
  return <div className="m-[18%] h-[64%] w-[64%]" style={{ background: color }} />;
}
function seed(n) { return Array.from({ length: 9 }, (_, i) => ({ k: SHAPES[(i * 7 + n * 3) % 4], c: COLS[(i * 5 + n) % 4], r: ((i + n) % 4) * 90 })); }
function Demo() {
  const [n, setN] = useState(0);
  const tiles = useMemo(() => seed(n), [n]);
  return (
    <div className="grid h-full w-full grid-cols-2 gap-4 bg-[#F3EEE3] p-5 text-[#111]" style={{ fontFamily: "'Syne', sans-serif" }}>
      <div className="flex flex-col justify-between">
        <h1 className="text-[2.15rem] font-extrabold uppercase leading-[0.85] tracking-tight">Form<br /><span className="text-[#E63322]">Follows</span><br />Fun</h1>
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest">
          <span>Est. 1919 — Weimar</span>
          <motion.button whileTap={{ rotate: 180 }} onClick={() => setN(n + 1)} className="flex h-12 w-12 items-center justify-center rounded-full bg-[#111] text-[10px] font-bold text-[#F3EEE3]">Shuffle</motion.button>
        </div>
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-1.5">
        {tiles.map((t, i) => (
          <div key={i} className="flex overflow-hidden bg-[#F3EEE3] outline outline-1 outline-[#111]/15">
            <motion.div className="flex h-full w-full" animate={{ rotate: t.r }} whileHover={{ scale: 1.12 }} transition={{ type: "spring", stiffness: 260, damping: 16, delay: i * 0.04 }}>
              <Shape kind={t.k} color={t.c} />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Memphis Squiggle Buttons",
    category: "Tactile Micro-Interaction Buttons",
    style: "Memphis 90s",
    description: "Rounded 90s buttons with black outlines; hovering wiggles the squiggle decoration and pressing pops dots out of the button.",
    tags: ["Framer Motion", "Memphis", "Playful", "Buttons"],
    prompt: { title: "Memphis Squiggle Buttons", design: D.memphis, brief: "Three playful call-to-action buttons on a dotted background, each with its own Memphis decoration that reacts to the pointer.", details: ["Buttons: 'Let's play' (pink), 'Join the club' (teal), 'Surprise me' (yellow), all with 3px black outline and 4px black offset shadow, Fredoka 700.", "Background: white with a scattered dot pattern and a violet zig-zag in a corner."], interactions: ["Hover: the attached squiggle SVG rotates ±12° on a looping spring wiggle.", "Tap: button squashes (scaleY 0.85, scaleX 1.08) and 6 dots fly out radially then fade.", "Squiggle paths draw in on mount with pathLength."] },
    previewCode: String.raw`
const BTNS = [["Let's play", "#FF5FA2"], ["Join the club", "#1CC6B6"], ["Surprise me", "#FFD23F"]];
function Btn({ label, color, i }) {
  const [pops, setPops] = useState(0);
  return (
    <div className="relative">
      <motion.svg width="46" height="22" viewBox="0 0 46 22" className="absolute -right-5 -top-4" whileHover={{ rotate: [0, 12, -12, 0] }} transition={{ duration: 0.6 }}>
        <motion.path d="M2 12 Q 8 2, 14 12 T 26 12 T 38 12 T 46 12" fill="none" stroke="#7B5CFF" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }} />
      </motion.svg>
      {Array.from({ length: 6 }).map((_, d) => (
        <motion.span key={pops + "-" + d} initial={{ x: 0, y: 0, opacity: pops ? 1 : 0 }} animate={pops ? { x: Math.cos(d) * 50, y: Math.sin(d) * 34, opacity: 0 } : {}} transition={{ duration: 0.6 }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full border-2 border-black" style={{ background: BTNS[(d + i) % 3][1] }} />
      ))}
      <motion.button onClick={() => setPops(pops + 1)} whileHover={{ rotate: i % 2 ? 2 : -2, y: -2 }} whileTap={{ scaleY: 0.85, scaleX: 1.08 }} transition={{ type: "spring", stiffness: 500, damping: 12 }}
        className="relative rounded-full border-[3px] border-black px-5 py-2.5 text-base font-bold text-black" style={{ background: color, boxShadow: "4px 4px 0 #000", fontFamily: "'Fredoka', sans-serif" }}>{label}</motion.button>
    </div>
  );
}
function Demo() {
  return (
    <div className="relative flex h-full w-full flex-wrap items-center justify-center gap-7 overflow-hidden bg-white p-6" style={{ backgroundImage: "radial-gradient(#111 1.2px, transparent 1.3px)", backgroundSize: "22px 22px" }}>
      <svg className="absolute bottom-3 left-3" width="90" height="24" viewBox="0 0 90 24"><path d="M0 20 L10 4 L20 20 L30 4 L40 20 L50 4 L60 20 L70 4 L80 20 L90 4" fill="none" stroke="#7B5CFF" strokeWidth="4" /></svg>
      <div className="absolute right-6 top-5 h-10 w-10 rounded-full border-[3px] border-black bg-[#FFD23F]" />
      {BTNS.map(([l, c], i) => <Btn key={l} label={l} color={c} i={i} />)}
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Groovy Sunset Banner",
    category: "Kinetic Typography Banners",
    style: "Retro 70s",
    description: "A 70s banner with stacked sunset stripes that roll in like a record label while a fat Shrikhand word bobs to a groove.",
    tags: ["Framer Motion", "Retro", "70s", "Kinetic Type"],
    prompt: { title: "Groovy Sunset Banner", design: D.seventies, brief: "A promo banner straight off a 1974 album sleeve: rounded sunset stripes rise behind the word 'Groovy' which sways on a loop.", details: ["Five concentric half-arc stripes (orange, mustard, chocolate, cream...) anchored to the bottom center.", "Word 'Groovy' in Shrikhand at ~5rem, chocolate with a cream 4px outline offset shadow; tagline 'Weekend sale — 70% far out'."], interactions: ["Stripes scale from 0 to 1 from the bottom with 90ms stagger, spring stiffness 120 damping 14.", "Letters sway: rotate [-6, 6] and y [0, -8] looping with per-letter delay for a wave.", "Hover the word: whole word scales 1.06 with a squash."] },
    previewCode: String.raw`
const STRIPES = ["#4A2C1D", "#E2711D", "#F2B134", "#E2711D", "#4A2C1D"];
function Demo() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start overflow-hidden bg-[#F6E7CB] pt-8 text-[#4A2C1D]">
      {STRIPES.map((c, i) => (
        <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 120, damping: 14, delay: i * 0.09 }}
          className="absolute bottom-0 left-1/2 rounded-t-full" style={{ width: 520 - i * 88, height: 260 - i * 44, marginLeft: -(520 - i * 88) / 2, background: c, originY: 1 }} />
      ))}
      <motion.h2 whileHover={{ scale: 1.06, scaleY: 0.94 }} className="relative z-10 flex text-[4.6rem] leading-none" style={{ fontFamily: "'Shrikhand', cursive", textShadow: "4px 4px 0 #F6E7CB" }}>
        {"Groovy".split("").map((l, i) => (
          <motion.span key={i} className="inline-block" animate={{ rotate: [-6, 6, -6], y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.12, ease: "easeInOut" }}>{l}</motion.span>
        ))}
      </motion.h2>
      <p className="relative z-10 mt-1 text-sm font-bold uppercase tracking-[0.2em]">Weekend sale — 70% far out</p>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Noir Atelier Menu",
    category: "Animated Navigation Bars",
    style: "Luxury Noir",
    description: "A luxury full-screen menu in black and champagne: Bodoni links rise slowly through masks and a hairline follows the hovered item.",
    tags: ["Framer Motion", "Luxury", "Menu", "Serif"],
    prompt: { title: "Noir Atelier Menu", design: D.noir, brief: "The navigation of a couture house. A minimal top bar opens into a full-screen index of collections in large Bodoni italics.", details: ["Top bar: wordmark 'MAISON NOIR' tracked, a 'Menu' text button.", "Overlay: four links (Collections, Atelier, Journal, Appointments) with roman numerals I–IV, and a footer line 'Paris · Milano · Tel Aviv'."], interactions: ["Overlay fades in over 0.5s; links rise from y 100% inside masks, 120ms stagger, ease [0.22, 1, 0.36, 1] over 0.9s (deliberately slow).", "A 1px champagne line slides under the hovered link via layoutId.", "Non-hovered links dim to 35% opacity."] },
    previewCode: String.raw`
const LINKS = ["Collections", "Atelier", "Journal", "Appointments"];
const ROMAN = ["I", "II", "III", "IV"];
function Demo() {
  const [open, setOpen] = useState(true);
  const [h, setH] = useState(null);
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0E0D0B] text-[#EFE9DD]" style={{ fontFamily: "'Bodoni Moda', serif" }}>
      <header className="relative z-20 flex items-center justify-between border-b border-[#CBB68B]/30 px-6 py-4 text-[10px] uppercase tracking-[0.4em]">
        <span>Maison Noir</span>
        <button onClick={() => setOpen(!open)} className="text-[#CBB68B]">{open ? "Close" : "Menu"}</button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 z-10 flex flex-col justify-center px-8 pt-10" onPointerLeave={() => setH(null)}>
            {LINKS.map((l, i) => (
              <div key={l} className="overflow-hidden py-0.5">
                <motion.a href="#" onPointerEnter={() => setH(i)} initial={{ y: "100%" }} animate={{ y: "0%", opacity: h === null || h === i ? 1 : 0.35 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.12 }}
                  className="relative flex w-fit items-baseline gap-4 text-[2.5rem] italic leading-tight">
                  <span className="w-8 text-[10px] not-italic tracking-[0.3em] text-[#CBB68B]">{ROMAN[i]}</span>{l}
                  {h === i && <motion.span layoutId="noir-line" className="absolute -bottom-0.5 left-12 right-0 h-px bg-[#CBB68B]" transition={{ type: "spring", stiffness: 300, damping: 34 }} />}
                </motion.a>
              </div>
            ))}
            <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-[#CBB68B]">Paris · Milano · Tel Aviv</p>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Washi Vertical Tabs",
    category: "Dynamic Accordions",
    style: "Japanese Minimal",
    description: "A Japanese-minimal accordion of tall vertical-text columns; opening one unrolls it like a scroll and stamps a vermilion seal.",
    tags: ["Framer Motion", "Japanese", "Vertical Text", "Accordion"],
    prompt: { title: "Washi Vertical Tabs", design: D.japanese, brief: "A tea house menu as an accordion of vertical columns written top-to-bottom. The open column widens to show the description.", details: ["Four columns: 煎茶 Sencha, 抹茶 Matcha, 焙じ茶 Hojicha, 玄米茶 Genmaicha; collapsed shows only the vertical kanji.", "Open column: kanji, romaji name, one-line description, price ¥680-style, and a small vermilion square seal."], interactions: ["Width animates via flexGrow 1 → 4 with spring stiffness 180 damping 26 (calm).", "Seal stamps in: scale 1.6 → 1, rotate -12 → -4, opacity 0 → 1.", "Text fades in 150ms after the column opens."] },
    previewCode: String.raw`
const TEAS = [["煎茶", "Sencha", "Grassy, bright, everyday.", 680], ["抹茶", "Matcha", "Stone-ground, whisked to foam.", 950], ["焙じ茶", "Hojicha", "Roasted, nutty, low caffeine.", 720], ["玄米茶", "Genmaicha", "With toasted rice. Warm and round.", 700]];
function Demo() {
  const [o, setO] = useState(1);
  return (
    <div className="flex h-full w-full gap-2 bg-[#F4F0E6] p-5 text-[#1B1B1B]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
      {TEAS.map(([k, n, d, p], i) => {
        const on = o === i;
        return (
          <motion.button key={n} onClick={() => setO(i)} aria-expanded={on} animate={{ flexGrow: on ? 4 : 1 }} transition={{ type: "spring", stiffness: 180, damping: 26 }}
            className="relative flex basis-0 overflow-hidden border-l border-[#1B1B1B]/20 px-3 py-4 text-left">
            <span className="text-2xl tracking-[0.3em]" style={{ writingMode: "vertical-rl" }}>{k}</span>
            <AnimatePresence>
              {on && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.15 } }} exit={{ opacity: 0 }} className="ml-4 flex min-w-[9rem] flex-col justify-between">
                  <div><div className="text-[10px] uppercase tracking-[0.3em] text-[#1B1B1B]/60">{n}</div><p className="mt-2 text-sm leading-relaxed">{d}</p></div>
                  <div className="flex items-end justify-between"><span className="text-lg">¥{p}</span>
                    <motion.span initial={{ scale: 1.6, rotate: -12, opacity: 0 }} animate={{ scale: 1, rotate: -4, opacity: 1 }} transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.25 }} className="flex h-9 w-9 items-center justify-center bg-[#C8372D] text-xs text-[#F4F0E6]">茶</motion.span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
    title: "Holo Chrome Card",
    category: "Parallax/3D Interactive Cards",
    style: "Y2K Chrome",
    description: "A Y2K membership card in brushed chrome; tilting it slides a holographic foil band across the surface and a starburst spins.",
    tags: ["Framer Motion", "Y2K", "3D Tilt", "Holographic"],
    prompt: { title: "Holo Chrome Card", design: D.y2k, brief: "A collectible-feeling membership card from 2001: chrome body, bubbly lowercase type, a starburst sticker, and a foil sheen that follows the tilt.", details: ["Card 300x190, radius 24, chrome gradient fill, 2px dark outline.", "Text: 'club cyber·cute' wordmark, member name 'dana l.', number '0042', 'expires never'.", "Starburst badge 'VIP' in bubblegum pink top-right."], interactions: ["Pointer tilt ±14° rotateX/rotateY with springs (stiffness 200 damping 18).", "Foil band (pastel rainbow linear-gradient at 60% opacity, mix-blend-mode overlay) translates with the tilt from -60% to 60%.", "Starburst rotates continuously and speeds up on hover."] },
    previewCode: String.raw`
function Demo() {
  const px = useSpring(0, { stiffness: 200, damping: 18 });
  const py = useSpring(0, { stiffness: 200, damping: 18 });
  const rx = useTransform(py, [-1, 1], [14, -14]);
  const ry = useTransform(px, [-1, 1], [-14, 14]);
  const foil = useTransform(px, [-1, 1], ["-60%", "60%"]);
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#DCE7F5]" style={{ perspective: 900 }}
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); px.set(((e.clientX - r.left) / r.width) * 2 - 1); py.set(((e.clientY - r.top) / r.height) * 2 - 1); }}
      onPointerLeave={() => { px.set(0); py.set(0); }}>
      <motion.div style={{ rotateX: rx, rotateY: ry, background: "linear-gradient(135deg, #F4F7FB 0%, #B9C2CF 35%, #EEF2F7 55%, #9AA4B2 100%)" }}
        className="relative h-[190px] w-[300px] overflow-hidden rounded-[24px] border-2 border-[#1C2230] p-5 text-[#1C2230]">
        <motion.div style={{ x: foil, background: "linear-gradient(100deg, transparent 20%, #FFB7E1 38%, #A9D6FF 50%, #C9FFE5 62%, transparent 80%)" }} className="pointer-events-none absolute inset-y-0 -left-1/2 w-[200%] opacity-60 mix-blend-overlay" />
        <div className="relative text-2xl font-extrabold lowercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>club cyber·cute</div>
        <motion.div animate={{ rotate: 360 }} whileHover={{ scale: 1.15 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }} className="absolute right-4 top-4 flex h-14 w-14 items-center justify-center bg-[#FFB7E1] text-[11px] font-extrabold" style={{ clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)" }}>VIP</motion.div>
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between font-mono text-xs lowercase">
          <div><div className="text-[9px] opacity-60">member</div>dana l.</div>
          <div className="text-right"><div className="text-[9px] opacity-60">no. 0042</div>expires never</div>
        </div>
      </motion.div>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Retro OS Signup Dialog",
    category: "Interactive Forms",
    style: "Retro OS",
    description: "A beveled 1995-desktop dialog box: the progress bar fills in chunky blocks and the window can be dragged around the teal desktop.",
    tags: ["Framer Motion", "Retro", "Windows 95", "Form", "Drag"],
    prompt: { title: "Retro OS Signup Dialog", design: D.retroos, brief: "A newsletter signup presented as an old-school desktop dialog window that you can drag. Submitting shows a blocky progress bar and a 'Setup complete' message.", details: ["Navy title bar 'Subscribe.exe' with _ □ ✕ buttons; grey body; label + sunken text field for email; checkbox 'Send me the weekly digest'.", "Buttons 'OK' and 'Cancel' with classic 2px bevels; a floppy-disk style icon."], interactions: ["Window drag via drag with dragConstraints to the desktop, dragMomentum false.", "OK: progress bar fills with 12 discrete blocks (one every 120ms), then the dialog content swaps to 'Setup complete. Welcome aboard.'", "Buttons invert their bevel when pressed (inset look)."] },
    previewCode: String.raw`
const bevel = { boxShadow: "inset -2px -2px 0 #404040, inset 2px 2px 0 #FFFFFF, inset -3px -3px 0 #808080" };
const sunken = { boxShadow: "inset 2px 2px 0 #808080, inset -2px -2px 0 #FFFFFF, inset 3px 3px 0 #404040" };
function Demo() {
  const desk = useRef(null);
  const [email, setEmail] = useState("dana@kiln.co");
  const [blocks, setBlocks] = useState(-1);
  useEffect(() => {
    if (blocks < 0 || blocks >= 12) return;
    const t = setTimeout(() => setBlocks(blocks + 1), 120);
    return () => clearTimeout(t);
  }, [blocks]);
  const done = blocks >= 12;
  return (
    <div ref={desk} className="relative flex h-full w-full items-center justify-center bg-[#008080] text-black" style={{ fontFamily: "'Pixelify Sans', 'Tahoma', sans-serif" }}>
      <motion.div drag dragConstraints={desk} dragMomentum={false} className="w-[300px] cursor-move bg-[#C0C0C0] p-[3px]" style={bevel}>
        <div className="flex items-center justify-between bg-[#000080] px-1.5 py-1 text-xs font-bold text-white">
          <span>Subscribe.exe</span>
          <div className="flex gap-0.5">{["_", "□", "✕"].map((c) => <span key={c} className="flex h-4 w-4 items-center justify-center bg-[#C0C0C0] text-[10px] text-black" style={bevel}>{c}</span>)}</div>
        </div>
        <div className="space-y-3 p-3 text-xs">
          {done ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 text-center text-sm">Setup complete.<br />Welcome aboard.</motion.p>
          ) : (
            <>
              <label className="block">E-mail address:
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full bg-white px-1.5 py-1 outline-none" style={sunken} />
              </label>
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Send me the weekly digest</label>
              <div className="flex h-5 gap-[2px] bg-white p-[2px]" style={sunken}>
                {Array.from({ length: 12 }).map((_, i) => <span key={i} className={"h-full flex-1 " + (i < blocks ? "bg-[#000080]" : "")} />)}
              </div>
            </>
          )}
          <div className="flex justify-end gap-2">
            {["OK", "Cancel"].map((b) => (
              <motion.button key={b} onPointerDown={(e) => e.stopPropagation()} onClick={() => b === "OK" ? setBlocks(0) : setBlocks(-1)} whileTap={sunken} className="w-16 bg-[#C0C0C0] py-1" style={bevel}>{b}</motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Clay Inflate Buttons",
    category: "Tactile Micro-Interaction Buttons",
    style: "Claymorphism",
    description: "Puffy pastel clay buttons with inner highlights that deflate when pressed and re-inflate with a wobble.",
    tags: ["Framer Motion", "Claymorphism", "Soft UI", "Buttons"],
    prompt: { title: "Clay Inflate Buttons", design: D.clay, brief: "A set of chunky clay-like buttons and an icon toggle that look inflated, deflate on press and wobble back.", details: ["Three buttons: lilac 'Get started', peach 'Learn more', mint icon-only heart toggle.", "Each: radius 999, outer soft drop shadow, inset white highlight top-left, inset darker shade bottom-right."], interactions: ["whileTap: scale 0.92 and shadows shrink (deflate).", "On release spring back with low damping (stiffness 400, damping 9) for a wobble.", "Heart toggle: icon scales 0 → 1.3 → 1 when turning on."] },
    previewCode: String.raw`
function clay(c) { return { background: c, boxShadow: "12px 14px 28px rgba(80,60,140,0.25), inset -6px -8px 14px rgba(0,0,0,0.10), inset 8px 8px 14px rgba(255,255,255,0.75)" }; }
const pressed = { scale: 0.92, boxShadow: "4px 5px 10px rgba(80,60,140,0.2), inset -3px -4px 8px rgba(0,0,0,0.12), inset 4px 4px 8px rgba(255,255,255,0.6)" };
function Demo() {
  const [liked, setLiked] = useState(false);
  return (
    <div className="flex h-full w-full flex-wrap items-center justify-center gap-6 bg-[#F3EEFF] text-[#3B2B63]" style={{ fontFamily: "'Fredoka', sans-serif" }}>
      <motion.button whileTap={pressed} whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400, damping: 9 }} className="rounded-full px-7 py-4 text-lg font-semibold" style={clay("#CDB8FF")}>Get started</motion.button>
      <motion.button whileTap={pressed} whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400, damping: 9 }} className="rounded-full px-7 py-4 text-lg font-semibold" style={clay("#FFC9A9")}>Learn more</motion.button>
      <motion.button aria-pressed={liked} aria-label="Like" onClick={() => setLiked(!liked)} whileTap={pressed} transition={{ type: "spring", stiffness: 400, damping: 9 }} className="flex h-16 w-16 items-center justify-center rounded-full" style={clay("#B8F0D8")}>
        <motion.span key={String(liked)} initial={{ scale: liked ? 0 : 1 }} animate={{ scale: liked ? [0, 1.3, 1] : 1 }}>
          <Heart size={26} strokeWidth={2.2} fill={liked ? "#FF7AA8" : "none"} color={liked ? "#FF7AA8" : "#3B2B63"} />
        </motion.span>
      </motion.button>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Riso Overprint Headline",
    category: "Kinetic Typography Banners",
    style: "Risograph Zine",
    description: "A zine headline printed in two riso inks; the pink and blue layers drift out of registration following the cursor, overlapping in multiply.",
    tags: ["Framer Motion", "Risograph", "Zine", "Mix Blend"],
    prompt: { title: "Riso Overprint Headline", design: D.riso, brief: "A headline that looks run through a Risograph: the same word printed twice in pink and blue, multiplied together, with misregistration that follows the cursor.", details: ["Headline 'ZINE FEST' stacked on two lines, Archivo Black ~5rem.", "Halftone dot circle in blue behind; tag line 'Issue 7 · Print is not dead'.", "Newsprint background with a faint noise texture."], interactions: ["Pink layer offset = pointer * 8px, blue layer = pointer * -6px, both via springs (stiffness 150 damping 15).", "mix-blend-mode multiply on both layers so the overlap turns deep purple.", "Click re-randomizes the halftone dot size."] },
    previewCode: String.raw`
function Demo() {
  const mx = useSpring(0, { stiffness: 150, damping: 15 });
  const my = useSpring(0, { stiffness: 150, damping: 15 });
  const pX = useTransform(mx, (v) => v * 8), pY = useTransform(my, (v) => v * 8);
  const bX = useTransform(mx, (v) => v * -6), bY = useTransform(my, (v) => v * -6);
  const [dot, setDot] = useState(9);
  const word = <>ZINE<br />FEST</>;
  return (
    <div onClick={() => setDot(6 + Math.round(Math.random() * 8))} onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set(((e.clientX - r.left) / r.width) * 2 - 1); my.set(((e.clientY - r.top) / r.height) * 2 - 1); }} onPointerLeave={() => { mx.set(0); my.set(0); }}
      className="relative flex h-full w-full cursor-crosshair flex-col justify-center overflow-hidden bg-[#F2EFE4] px-10" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
      <motion.div animate={{ backgroundSize: dot + "px " + dot + "px" }} className="absolute right-6 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full mix-blend-multiply" style={{ backgroundImage: "radial-gradient(#0078BF 40%, transparent 42%)", backgroundSize: dot + "px " + dot + "px" }} />
      <div className="relative text-[5rem] leading-[0.88]">
        <motion.div style={{ x: pX, y: pY }} className="text-[#FF48B0] mix-blend-multiply">{word}</motion.div>
        <motion.div style={{ x: bX, y: bY }} className="absolute inset-0 text-[#0078BF] mix-blend-multiply">{word}</motion.div>
      </div>
      <p className="relative mt-4 font-mono text-xs uppercase tracking-widest text-[#0078BF]">Issue 7 · Print is not dead · click to reprint</p>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Organic Blob Hero",
    category: "Editorial Hero Sections",
    style: "Organic Earth",
    description: "A calm wellness hero where sage and clay blobs morph slowly behind a DM Serif headline, breathing in and out.",
    tags: ["Framer Motion", "Organic", "SVG Morph", "Wellness"],
    prompt: { title: "Organic Blob Hero", design: D.organic, brief: "A slow, breathing hero for a botanical skincare brand. Soft SVG blobs morph between shapes and the CTA pulses like a heartbeat at rest.", details: ["Headline 'Rooted in / slow rituals.' in DM Serif Display, moss color.", "Two blobs (sage and clay) behind the right half, one leaf outline icon.", "CTA 'Shop the ritual' moss pill, small text 'Plant-based · Refillable'."], interactions: ["Blob paths morph between 3 shapes on an 8s ease-in-out loop (animate the d attribute).", "Blobs also rotate slowly (40s per turn) in opposite directions.", "CTA scale [1, 1.03, 1] every 4s; hover lifts it."] },
    previewCode: String.raw`
const A = ["M60,-60C78,-40,92,-20,90,-2C88,17,70,34,52,50C34,66,17,80,-3,83C-23,86,-46,77,-62,61C-78,45,-87,22,-86,0C-84,-21,-72,-42,-56,-62C-40,-82,-20,-100,0,-100C20,-100,41,-80,60,-60Z", "M55,-52C70,-38,80,-19,82,1C84,22,77,44,61,58C44,72,22,78,-1,79C-23,80,-46,76,-63,62C-80,48,-90,24,-88,2C-86,-20,-71,-41,-54,-55C-37,-69,-18,-77,1,-78C20,-79,40,-66,55,-52Z", "M64,-66C80,-48,88,-24,86,-2C84,20,72,40,56,55C40,70,20,80,-2,82C-24,84,-48,78,-64,63C-80,48,-88,24,-86,2C-84,-20,-72,-40,-56,-58C-40,-76,-20,-92,2,-94C24,-96,48,-84,64,-66Z"];
function Demo() {
  return (
    <div className="relative grid h-full w-full grid-cols-2 overflow-hidden bg-[#F7F3EA] p-7 text-[#3A5A40]">
      <div className="relative z-10 flex flex-col justify-center gap-4">
        <h1 className="text-[2.7rem] leading-[1] text-[#3A5A40]" style={{ fontFamily: "'DM Serif Display', serif" }}>Rooted in<br /><span className="italic">slow rituals.</span></h1>
        <div className="flex items-center gap-3">
          <motion.button animate={{ scale: [1, 1.03, 1] }} whileHover={{ y: -2 }} transition={{ repeat: Infinity, duration: 4 }} className="rounded-full bg-[#3A5A40] px-5 py-2.5 text-sm text-[#F7F3EA]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Shop the ritual</motion.button>
          <span className="text-[11px] uppercase tracking-wider opacity-70">Plant-based · Refillable</span>
        </div>
      </div>
      <div className="relative">
        <motion.svg viewBox="-100 -100 200 200" className="absolute -right-10 top-0 h-[115%] w-[115%]" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }}>
          <motion.path fill="#A3B18A" animate={{ d: [A[0], A[1], A[2], A[0]] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} />
        </motion.svg>
        <motion.svg viewBox="-100 -100 200 200" className="absolute bottom-0 left-4 h-1/2 w-1/2" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }}>
          <motion.path fill="#DDA15E" animate={{ d: [A[2], A[0], A[1], A[2]] }} transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }} />
        </motion.svg>
        <Leaf className="absolute right-12 top-1/2 text-[#F7F3EA]" size={48} strokeWidth={1.2} />
      </div>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Art Deco FAQ",
    category: "Dynamic Accordions",
    style: "Art Deco",
    description: "An emerald-and-gold accordion with stepped corners and a sunburst that fans open behind each answer.",
    tags: ["Framer Motion", "Art Deco", "Accordion", "Luxury"],
    prompt: { title: "Art Deco FAQ", design: D.deco, brief: "A hotel's FAQ in the style of a 1925 lobby: symmetric gold frame, Poiret One type, and a sunburst fan that opens with each answer.", details: ["Title 'Guest Enquiries' centered between two thin double rules.", "Three questions: check-in time, the rooftop bar dress code, airport transfers — with short real answers.", "Each row ends with a gold diamond that rotates into a cross when open."], interactions: ["Answer panel height auto spring (stiffness 220 damping 28).", "A sunburst (8 thin gold wedges) behind the answer scales from 0 to 1 from the top center, rotate -20 → 0.", "Diamond rotates 45° and turns solid gold when open."] },
    previewCode: String.raw`
const QA = [["What time is check-in?", "From 3 pm. Early arrival lounge opens at noon."], ["Is there a dress code on the roof?", "Smart casual after 7 pm. Jackets optional, smiles required."], ["Do you arrange airport transfers?", "Yes, by vintage car. Book 24 hours ahead at the desk."]];
function Demo() {
  const [o, setO] = useState(0);
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#0F3B33] p-5 text-[#F3EBD8]">
      <div className="w-full max-w-md border border-[#C9A15B] p-1"><div className="border border-[#C9A15B]/60 px-5 py-4">
        <h3 className="mb-3 text-center text-2xl tracking-[0.25em] text-[#C9A15B]" style={{ fontFamily: "'Poiret One', cursive" }}>Guest Enquiries</h3>
        {QA.map(([q, a], i) => (
          <div key={q} className="border-t border-[#C9A15B]/40">
            <button aria-expanded={o === i} onClick={() => setO(o === i ? -1 : i)} className="flex w-full items-center justify-between py-2.5 text-left text-sm tracking-wide" style={{ fontFamily: "'Poiret One', cursive" }}>
              {q}
              <motion.span animate={{ rotate: o === i ? 45 : 0, backgroundColor: o === i ? "#C9A15B" : "rgba(0,0,0,0)" }} className="h-3 w-3 rotate-45 border border-[#C9A15B]" />
            </button>
            <AnimatePresence initial={false}>
              {o === i && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ type: "spring", stiffness: 220, damping: 28 }} className="relative overflow-hidden">
                  <motion.svg viewBox="-50 0 100 50" className="absolute left-1/2 top-0 h-16 w-32 -translate-x-1/2" initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} style={{ originY: 0 }}>
                    {Array.from({ length: 8 }).map((_, k) => <path key={k} d="M0 0 L-3 50 L3 50 Z" fill="#C9A15B" opacity="0.18" transform={"rotate(" + (-70 + k * 20) + ")"} />)}
                  </motion.svg>
                  <p className="relative pb-3 text-center text-xs leading-relaxed text-[#F3EBD8]/85">{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div></div>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Pixel Arcade Start Button",
    category: "Tactile Micro-Interaction Buttons",
    style: "8-bit Arcade",
    description: "An 8-bit 'PRESS START' screen: a blinking pixel prompt, a chunky stepped button that drops a pixel and a coin counter that ticks up.",
    tags: ["Framer Motion", "Pixel Art", "Arcade", "Retro"],
    prompt: { title: "Pixel Arcade Start Button", design: D.pixel, brief: "A game-start screen where the primary button behaves like an arcade cabinet button: hard pixel shadow, a one-step press, and a coin counter.", details: ["Title 'VAULT QUEST' in two pixel colors with a stepped drop shadow.", "Blinking 'PRESS START' text; button 'INSERT COIN' red with 4px pixel shadow; 'CREDITS 00' counter top-right."], interactions: ["Blink with steps: opacity [1,1,0,0] repeat at 1s, ease 'linear' discrete.", "Button press moves exactly 4px down-right and removes the shadow (no squish — pixels don't squish).", "Each press increments credits with a quick y bounce on the number."] },
    previewCode: String.raw`
function Demo() {
  const [credits, setCredits] = useState(0);
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 bg-[#111] text-white" style={{ fontFamily: "'Press Start 2P', monospace", imageRendering: "pixelated" }}>
      <div className="absolute right-4 top-4 flex gap-2 text-[10px] text-[#FFEC27]">CREDITS
        <motion.span key={credits} initial={{ y: -6 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 900, damping: 15 }}>{String(credits).padStart(2, "0")}</motion.span>
      </div>
      <h2 className="text-center text-2xl leading-relaxed" style={{ textShadow: "4px 4px 0 #29ADFF" }}><span className="text-[#FF004D]">VAULT</span><br /><span className="text-[#00E436]">QUEST</span></h2>
      <motion.p animate={{ opacity: [1, 1, 0, 0] }} transition={{ repeat: Infinity, duration: 1, ease: "linear", times: [0, 0.5, 0.5, 1] }} className="text-[10px]">PRESS START</motion.p>
      <motion.button onClick={() => setCredits((c) => Math.min(99, c + 1))} initial={{ boxShadow: "4px 4px 0 #FFFFFF" }} whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0 #FFFFFF" }} transition={{ duration: 0 }} className="bg-[#FF004D] px-5 py-3 text-xs">INSERT COIN</motion.button>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Mono Data Bento",
    category: "Bento Feature Grids",
    style: "Mono Data",
    description: "A dense dashboard bento in slate and IBM Plex Mono: live-ticking metrics, a drawing sparkline and a status grid that flickers like a server rack.",
    tags: ["Framer Motion", "Dashboard", "Data", "Monospace"],
    prompt: { title: "Mono Data Bento", design: D.datadense, brief: "An ops-dashboard bento for a developer tool: requests per second ticking live, a latency sparkline, and an uptime grid of 48 tiny cells.", details: ["Tile 1 (wide): 'REQ/S' big tabular number ticking every 700ms with a delta badge.", "Tile 2: 'P95 LATENCY 182ms' with an SVG sparkline.", "Tile 3: 'UPTIME 99.98%' and a 12x4 grid of cells (one amber incident cell).", "Tile 4: region list fra1 / iad1 / sin1 with status dots."], interactions: ["Numbers animate to new values with a spring on a motion value, rendered rounded.", "Sparkline path draws in with pathLength and shifts left by one point each tick.", "Uptime cells fade in with a random stagger on mount."] },
    previewCode: String.raw`
function Demo() {
  const [rps, setRps] = useState(1284);
  const [pts, setPts] = useState([30, 34, 28, 40, 36, 44, 38, 50, 42, 46, 40, 48]);
  useEffect(() => {
    const t = setInterval(() => { setRps((v) => Math.max(900, Math.round(v + (Math.random() - 0.45) * 120))); setPts((p) => p.slice(1).concat(30 + Math.round(Math.random() * 24))); }, 700);
    return () => clearInterval(t);
  }, []);
  const d = pts.map((y, i) => (i ? "L" : "M") + i * 14 + " " + (60 - y)).join(" ");
  const cell = "rounded-[3px] bg-[#1E293B] p-3";
  return (
    <div className="grid h-full w-full grid-cols-3 grid-rows-2 gap-2 bg-[#0F172A] p-3 text-[#E2E8F0]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <div className={cell + " col-span-2 flex flex-col justify-between"}>
        <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#94A3B8]"><span>req/s · global</span><span className="text-[#A3E635]">● live</span></div>
        <div className="flex items-end gap-3"><span className="text-5xl tabular-nums">{rps.toLocaleString("en-US")}</span><span className="mb-2 rounded bg-[#A3E635]/15 px-1.5 text-[10px] text-[#A3E635]">+4.2%</span></div>
      </div>
      <div className={cell + " flex flex-col justify-between"}>
        <span className="text-[10px] uppercase tracking-widest text-[#94A3B8]">uptime 30d</span>
        <span className="text-xl tabular-nums">99.98%</span>
        <div className="grid grid-cols-12 gap-[2px]">{Array.from({ length: 48 }).map((_, i) => <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: (i * 37 % 48) / 60 }} className={"h-2 rounded-[1px] " + (i === 31 ? "bg-[#F59E0B]" : "bg-[#A3E635]/70")} />)}</div>
      </div>
      <div className={cell + " col-span-2 flex flex-col justify-between"}>
        <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#94A3B8]"><span>p95 latency</span><span className="text-[#E2E8F0]">182ms</span></div>
        <svg viewBox="0 0 154 60" className="h-16 w-full" preserveAspectRatio="none"><motion.path d={d} fill="none" stroke="#A3E635" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} /></svg>
      </div>
      <div className={cell + " flex flex-col justify-center gap-1.5 text-xs"}>
        {[["fra1", "#A3E635"], ["iad1", "#A3E635"], ["sin1", "#F59E0B"]].map(([r, c]) => <div key={r} className="flex items-center justify-between"><span>{r}</span><span className="h-2 w-2 rounded-full" style={{ background: c }} /></div>)}
      </div>
    </div>
  );
}
render(<Demo />);
`,
  },
  {
    title: "Swiss Grid Index Nav",
    category: "Animated Navigation Bars",
    style: "Swiss International",
    description: "A strict red-black-white Swiss navigation: giant numerals on a modular grid, a red bar that snaps between columns.",
    tags: ["Framer Motion", "Swiss", "Grid", "Navigation"],
    prompt: { title: "Swiss Grid Index Nav", design: D.swiss, brief: "A museum website navigation in the International Typographic Style: four columns, each with a huge numeral and a section name; a red bar marks the current one.", details: ["Columns: 1 Exhibitions, 2 Collection, 3 Visit, 4 Shop. Numerals ~6rem bold black; labels 13px.", "Top-left wordmark 'Kunsthalle' with 'Zürich' below; top-right 'DE / EN'."], interactions: ["A 6px red bar at the top of the active column moves via layoutId (stiffness 600 damping 40, snappy).", "Hover a column: numeral turns red; the others stay black.", "Arrow keys move between columns."] },
    previewCode: String.raw`
const COLS = ["Exhibitions", "Collection", "Visit", "Shop"];
function Demo() {
  const [a, setA] = useState(0);
  const [h, setH] = useState(null);
  return (
    <div className="flex h-full w-full flex-col bg-white text-black" style={{ fontFamily: "'Inter Tight', 'Helvetica Neue', Arial, sans-serif" }}>
      <div className="flex items-start justify-between p-4 text-xs font-bold leading-tight"><span>Kunsthalle<br /><span className="font-normal">Zürich</span></span><span>DE / <span className="text-[#E30613]">EN</span></span></div>
      <nav className="grid flex-1 grid-cols-4 border-t-2 border-black" onKeyDown={(e) => { if (e.key === "ArrowRight") setA((a + 1) % 4); if (e.key === "ArrowLeft") setA((a + 3) % 4); }}>
        {COLS.map((c, i) => (
          <button key={c} onClick={() => setA(i)} onPointerEnter={() => setH(i)} onPointerLeave={() => setH(null)} className="relative flex flex-col justify-between border-r border-black/15 p-3 text-left last:border-r-0">
            {a === i && <motion.span layoutId="swiss-bar" transition={{ type: "spring", stiffness: 600, damping: 40 }} className="absolute inset-x-0 top-0 h-1.5 bg-[#E30613]" />}
            <span className={"text-[5.5rem] font-bold leading-none tracking-tighter transition-colors " + (h === i || a === i ? "text-[#E30613]" : "")}>{i + 1}</span>
            <span className="text-[13px] font-semibold">{c}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
render(<Demo />);
`,
  },
];

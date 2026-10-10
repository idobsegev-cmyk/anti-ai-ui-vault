// Full website designs: complete multi-section pages, each in its own design language.
// Rendered at 1280px wide. Rule: no backticks or ${} inside previewCode. Root element is "w-full" with natural height.

const WEBSITE = "Full Website Designs";

export default [
  // ───────────────────────── 1. LUXURY NOIR HOTEL ─────────────────────────
  {
    title: "Nocturne Hotel Website",
    category: WEBSITE,
    style: "Luxury Noir",
    description: "A complete boutique-hotel site in black and champagne: slow-reveal Bodoni hero, suite cards, a dining split, guest quotes and a reservation band.",
    tags: ["Full Site", "Hospitality", "Luxury", "Serif"],
    prompt: {
      title: "Nocturne Hotel Website",
      design: { name: "Luxury Noir", rules: ["Near-black #0E0D0B, champagne #CBB68B, ivory #EFE9DD. No gradients except soft vignettes on image placeholders, no glow.", "Bodoni Moda for display (italic for accents), tiny uppercase labels tracked 0.35em.", "Huge margins, 1px champagne hairlines, nothing crowded."] },
      brief: "A one-page website for a 24-room boutique hotel in an old printing house. It should feel like an evening: quiet, dark, expensive, unhurried.",
      details: [
        "Nav: wordmark 'NOCTURNE' centered; links Rooms, Dining, Spa, Journal left and right; a 'Reserve' outline button.",
        "Hero: full-width dark 'photo' block (layered gradients standing in for a lobby image), headline 'Stay up / late.' in Bodoni italic 9rem, subline and two CTAs.",
        "Intro strip: three stats (24 rooms · 1 rooftop · open since 1931) on hairlines.",
        "Suites: three tall cards (Atelier, Press Room, Rooftop Loft) with a placeholder image, size in m², price per night, 'View suite'.",
        "Dining: split section, left text about the bar 'The Composing Room', right a tall image block with a vertical caption.",
        "Quote: one large italic guest quote with the guest's city.",
        "Reservation band: check-in / check-out / guests fields inline and 'Check availability' button.",
        "Footer: address, phone, newsletter line, small links.",
      ],
      interactions: [
        "Hero headline lines rise from y 100% inside masks, 0.12s stagger, 1.1s ease [0.22,1,0.36,1].",
        "Suite cards lift 8px on hover and their image block slowly zooms (scale 1.06 over 1.2s).",
        "Nav links get a champagne hairline that grows from the center on hover.",
        "Sections fade up as they enter the viewport (whileInView, once).",
      ],
    },
    previewCode: String.raw`
const C = { bg: "#0E0D0B", gold: "#CBB68B", ivory: "#EFE9DD" };
const serif = { fontFamily: "'Bodoni Moda', serif" };
function Img({ className, tone }) {
  return <div className={className} style={{ background: "radial-gradient(120% 90% at 30% 20%, " + (tone || "#3a3026") + " 0%, #17140f 55%, #0b0a08 100%)" }} />;
}
function NavLink({ children }) {
  return (
    <motion.a href="#" initial="rest" whileHover="hover" className="relative py-1">
      {children}
      <motion.span variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} className="absolute inset-x-0 -bottom-0.5 h-px" style={{ background: C.gold }} />
    </motion.a>
  );
}
const SUITES = [["Atelier", "32 m²", "€420"], ["Press Room", "45 m²", "€560"], ["Rooftop Loft", "70 m²", "€890"]];
function Demo() {
  return (
    <div className="w-full" style={{ background: C.bg, color: C.ivory }}>
      <nav className="grid grid-cols-3 items-center px-16 py-7 text-[11px] uppercase tracking-[0.35em]">
        <div className="flex gap-10"><NavLink>Rooms</NavLink><NavLink>Dining</NavLink></div>
        <div className="text-center text-xl tracking-[0.5em]" style={serif}>NOCTURNE</div>
        <div className="flex items-center justify-end gap-10"><NavLink>Spa</NavLink><NavLink>Journal</NavLink><span className="border px-5 py-2.5" style={{ borderColor: C.gold, color: C.gold }}>Reserve</span></div>
      </nav>
      <section className="relative mx-16 h-[620px] overflow-hidden">
        <Img className="absolute inset-0" tone="#4a3b2b" />
        <div className="absolute inset-0 flex flex-col justify-end p-16">
          <h1 className="text-[9rem] italic leading-[0.85]" style={serif}>
            {["Stay up", "late."].map((l, i) => (
              <span key={l} className="block overflow-hidden"><motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.12 }}>{l}</motion.span></span>
            ))}
          </h1>
          <div className="mt-8 flex items-end justify-between">
            <p className="max-w-sm text-sm leading-relaxed opacity-80">Twenty-four rooms in a 1931 printing house. A bar that closes when the last guest says so.</p>
            <div className="flex gap-4 text-[11px] uppercase tracking-[0.3em]"><span className="px-7 py-4 text-black" style={{ background: C.gold }}>Book a room</span><span className="border px-7 py-4" style={{ borderColor: C.ivory }}>Explore</span></div>
          </div>
        </div>
      </section>
      <section className="mx-16 grid grid-cols-3 border-b py-10 text-center" style={{ borderColor: C.gold + "55" }}>
        {[["24", "rooms & suites"], ["1", "rooftop with a view of the old port"], ["1931", "the year the presses started"]].map(([n, l]) => (
          <div key={n}><div className="text-5xl" style={{ ...serif, color: C.gold }}>{n}</div><div className="mt-2 text-[11px] uppercase tracking-[0.3em] opacity-70">{l}</div></div>
        ))}
      </section>
      <section className="px-16 py-24">
        <div className="mb-12 flex items-end justify-between"><h2 className="text-6xl italic" style={serif}>The suites</h2><span className="text-[11px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>All rooms →</span></div>
        <div className="grid grid-cols-3 gap-8">
          {SUITES.map(([n, m, p], i) => (
            <motion.article key={n} initial="rest" whileHover="hover" variants={{ rest: { y: 0 }, hover: { y: -8 } }} className="cursor-pointer">
              <div className="h-[420px] overflow-hidden"><motion.div variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }} transition={{ duration: 1.2 }} className="h-full w-full"><Img className="h-full w-full" tone={["#5a4632", "#3b3a35", "#4b3a2c"][i]} /></motion.div></div>
              <div className="mt-5 flex items-baseline justify-between border-t pt-4" style={{ borderColor: C.gold + "55" }}><h3 className="text-3xl" style={serif}>{n}</h3><span className="text-sm opacity-70">{m}</span></div>
              <div className="mt-2 flex justify-between text-[11px] uppercase tracking-[0.3em]"><span style={{ color: C.gold }}>from {p} / night</span><span>View suite</span></div>
            </motion.article>
          ))}
        </div>
      </section>
      <section className="grid grid-cols-2 gap-16 px-16 py-20">
        <div className="flex flex-col justify-center">
          <span className="text-[11px] uppercase tracking-[0.35em]" style={{ color: C.gold }}>Dining</span>
          <h2 className="mt-4 text-6xl leading-tight" style={serif}>The Composing<br /><span className="italic">Room</span></h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed opacity-80">Set in the old typesetting hall. Twelve seats at the bar, a short menu written every afternoon, and a cocktail list printed on the original press.</p>
          <span className="mt-8 w-fit border-b pb-1 text-[11px] uppercase tracking-[0.3em]" style={{ borderColor: C.gold }}>See the menu</span>
        </div>
        <div className="relative"><Img className="h-[520px] w-full" tone="#3f2f22" /><span className="absolute -right-6 top-8 text-[10px] uppercase tracking-[0.4em] opacity-60" style={{ writingMode: "vertical-rl" }}>Open nightly from 19:00</span></div>
      </section>
      <section className="px-40 py-24 text-center">
        <p className="text-5xl italic leading-tight" style={serif}>“We meant to stay one night. We stayed four, and never once saw the lights go on before noon.”</p>
        <p className="mt-6 text-[11px] uppercase tracking-[0.35em]" style={{ color: C.gold }}>Léa M. — Lyon</p>
      </section>
      <section className="mx-16 grid grid-cols-4 items-end gap-6 border-y py-10" style={{ borderColor: C.gold + "55" }}>
        {[["Check-in", "Fri, 14 Nov"], ["Check-out", "Sun, 16 Nov"], ["Guests", "2 adults"]].map(([l, v]) => (
          <label key={l} className="block text-[10px] uppercase tracking-[0.3em] opacity-70">{l}<div className="mt-2 border-b pb-2 text-lg normal-case tracking-normal opacity-100" style={{ ...serif, borderColor: C.ivory + "55" }}>{v}</div></label>
        ))}
        <motion.button whileHover={{ backgroundColor: C.ivory }} className="py-4 text-[11px] uppercase tracking-[0.3em] text-black" style={{ background: C.gold }}>Check availability</motion.button>
      </section>
      <footer className="grid grid-cols-3 px-16 py-14 text-xs opacity-70">
        <div style={serif} className="text-lg opacity-100">NOCTURNE</div>
        <div>12 Rue des Imprimeurs<br />Marseille · +33 4 91 00 00 00</div>
        <div className="text-right">Newsletter · Instagram · Careers</div>
      </footer>
    </div>
  );
}
render(<Demo />);
`,
  },

  // ───────────────────────── 2. NEO-BRUTALIST AGENCY ─────────────────────────
  {
    title: "Loudmouth Agency Website",
    category: WEBSITE,
    style: "Neo-Brutalist",
    description: "A full creative-agency site that shouts: acid-yellow blocks, black 3px borders, a ticker, case-study tiles that jump on hover and a giant 'Say hi' footer.",
    tags: ["Full Site", "Agency", "Brutalist", "Portfolio"],
    prompt: {
      title: "Loudmouth Agency Website",
      design: { name: "Neo-Brutalist", rules: ["Acid yellow #FFE600, white, black #000; one hot accent #FF3EA5 used twice at most.", "3px black borders, hard 8px 8px 0 #000 shadows, square corners, visible grid lines.", "Archivo Black for display, Space Mono for everything else."] },
      brief: "A portfolio site for a small, loud branding agency. It should feel like a printed protest poster that also works as a website.",
      details: [
        "Top ticker strip: 'NOW BOOKING Q1 ✺ 9 PEOPLE ✺ ZERO TEMPLATES ✺' scrolling.",
        "Nav: logo 'LOUDMOUTH®' in a black box, links WORK / ABOUT / SHOP / CONTACT, a pink 'START A PROJECT' sticker button.",
        "Hero: headline 'WE MAKE BRANDS THAT TALK BACK.' at 8rem across the width, with a rotating starburst sticker '100% HUMAN'.",
        "Services: 4 bordered columns (Naming, Identity, Web, Campaigns) each with a number and short line.",
        "Work: 2x2 grid of case-study tiles in different flat colors with client name, year, discipline tags.",
        "Clients: logo-like wordmarks row on white with black dividers.",
        "Footer: huge 'SAY HI →' link, email, address, socials.",
      ],
      interactions: [
        "Ticker runs infinitely; hover pauses it.",
        "Case tiles: whileHover translate -6,-6 and shadow grows; whileTap flattens.",
        "Starburst sticker rotates continuously; headline words drop in with springy rotation on load.",
      ],
    },
    previewCode: String.raw`
const mono = { fontFamily: "'Space Mono', monospace" };
const black = { fontFamily: "'Archivo Black', sans-serif" };
const WORK = [["Kiln & Co.", "2026", "#FF3EA5", "Identity · Web"], ["Third Round", "2025", "#00C2FF", "Naming · Campaign"], ["Fieldnote", "2025", "#FFFFFF", "Web · Shop"], ["Hill 412", "2024", "#00E08A", "Identity · Packaging"]];
function Demo() {
  return (
    <div className="w-full bg-[#FFE600] text-black" style={mono}>
      <div className="overflow-hidden border-b-[3px] border-black bg-black py-2 text-sm text-[#FFE600]">
        <motion.div className="flex w-max gap-10 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }}>
          {Array.from({ length: 8 }).map((_, i) => <span key={i}>NOW BOOKING Q1 ✺ 9 PEOPLE ✺ ZERO TEMPLATES ✺</span>)}
        </motion.div>
      </div>
      <nav className="flex items-center justify-between border-b-[3px] border-black px-10 py-5">
        <span className="bg-black px-3 py-2 text-xl text-[#FFE600]" style={black}>LOUDMOUTH®</span>
        <div className="flex gap-10 text-sm font-bold">{["WORK", "ABOUT", "SHOP", "CONTACT"].map((l) => <a key={l} href="#" className="hover:underline">{l}</a>)}</div>
        <span className="rotate-[-3deg] border-[3px] border-black bg-[#FF3EA5] px-4 py-2 text-sm font-bold" style={{ boxShadow: "4px 4px 0 #000" }}>START A PROJECT</span>
      </nav>
      <section className="relative border-b-[3px] border-black px-10 py-20">
        <h1 className="text-[8.2rem] leading-[0.86]" style={black}>
          {"WE MAKE BRANDS THAT TALK BACK.".split(" ").map((w, i) => (
            <motion.span key={i} className="mr-6 inline-block" initial={{ y: -80, rotate: -10, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 400, damping: 14, delay: i * 0.07 }}>{w}</motion.span>
          ))}
        </h1>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} className="absolute right-16 top-14 flex h-40 w-40 items-center justify-center bg-[#FF3EA5] text-center text-lg leading-tight" style={{ ...black, clipPath: "polygon(50% 0%,61% 18%,82% 9%,80% 31%,100% 38%,86% 55%,98% 75%,76% 76%,70% 98%,50% 85%,30% 98%,24% 76%,2% 75%,14% 55%,0% 38%,20% 31%,18% 9%,39% 18%)" }}>100%<br />HUMAN</motion.div>
        <p className="mt-10 max-w-xl text-base">Nine people in a converted garage. We name things, draw things, build websites and occasionally start arguments in boardrooms.</p>
      </section>
      <section className="grid grid-cols-4 border-b-[3px] border-black bg-white">
        {[["01", "Naming", "Words people repeat at dinner."], ["02", "Identity", "Logos with a pulse."], ["03", "Web", "Sites that load before you blink."], ["04", "Campaigns", "Posters people steal."]].map(([n, t, d], i) => (
          <div key={n} className={"p-8 " + (i < 3 ? "border-r-[3px] border-black" : "")}><div className="text-sm">{n}</div><h3 className="mt-6 text-3xl" style={black}>{t}</h3><p className="mt-3 text-sm">{d}</p></div>
        ))}
      </section>
      <section className="px-10 py-16">
        <h2 className="mb-10 text-6xl" style={black}>SELECTED WORK</h2>
        <div className="grid grid-cols-2 gap-8">
          {WORK.map(([n, y, c, tag]) => (
            <motion.div key={n} initial={{ boxShadow: "8px 8px 0 #000" }} whileHover={{ x: -6, y: -6, boxShadow: "14px 14px 0 #000" }} whileTap={{ x: 8, y: 8, boxShadow: "0px 0px 0 #000" }} transition={{ type: "spring", stiffness: 500, damping: 22 }}
              className="flex h-80 cursor-pointer flex-col justify-between border-[3px] border-black p-6" style={{ background: c }}>
              <div className="flex justify-between text-sm font-bold"><span>{tag}</span><span>{y}</span></div>
              <h3 className="text-6xl" style={black}>{n}</h3>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="grid grid-cols-5 border-y-[3px] border-black bg-white text-center text-2xl" style={black}>
        {["KILN", "FIELDNOTE", "SALT", "HADDAD", "MARGINS"].map((c, i) => <div key={c} className={"py-8 " + (i < 4 ? "border-r-[3px] border-black" : "")}>{c}</div>)}
      </section>
      <footer className="px-10 py-16">
        <motion.a href="#" whileHover={{ x: 20 }} className="block text-[10rem] leading-none" style={black}>SAY HI →</motion.a>
        <div className="mt-10 flex justify-between border-t-[3px] border-black pt-6 text-sm font-bold"><span>HELLO@LOUDMOUTH.STUDIO</span><span>GARAGE 4, FLORENTIN, TEL AVIV</span><span>IG · BE · LI</span></div>
      </footer>
    </div>
  );
}
render(<Demo />);
`,
  },

  // ───────────────────────── 3. JAPANESE MINIMAL ARCHITECTS ─────────────────────────
  {
    title: "Kanso Architects Website",
    category: WEBSITE,
    style: "Japanese Minimal",
    description: "A serene architecture-studio site: asymmetric grid, vertical Japanese captions, project plates that slide aside to reveal details, and a vermilion seal.",
    tags: ["Full Site", "Architecture", "Minimal", "Portfolio"],
    prompt: {
      title: "Kanso Architects Website",
      design: { name: "Japanese Minimal", rules: ["Washi #F4F0E6, sumi ink #1B1B1B, stone #A8A39A, one vermilion #C8372D seal per screen.", "Asymmetric layout, wide empty fields, thin 1px rules, vertical text for captions.", "Noto Serif JP for Japanese, a light serif for Latin headings, small sans for metadata."] },
      brief: "The website of a four-person architecture practice in Kyoto that builds tea houses and small homes. Silence is the main material.",
      details: [
        "Nav: 'KANSO 簡素' left, links Works / Practice / Writing / Contact right, all small.",
        "Hero: one large stone-colored image plate on the right two-thirds; on the left a short line 'Less, built carefully.' and a vertical Japanese caption 少なく、丁寧に。",
        "Philosophy: three principles in a row with kanji (間 Ma, 簡 Kan, 素 So) and two-line explanations.",
        "Works: a list of 4 projects as horizontal plates (name, place, year, m²); the image plate slides to reveal a short description.",
        "Process: a horizontal timeline of 5 steps with small numerals.",
        "Contact: address in Kyoto, email, and the vermilion seal stamp.",
      ],
      interactions: [
        "Everything moves slowly: springs with low stiffness (120) and high damping (26).",
        "Project rows: on hover the image plate translates 40% right revealing text underneath.",
        "Seal stamps in with scale 1.4 → 1 when the contact section enters view.",
      ],
    },
    previewCode: String.raw`
const jp = { fontFamily: "'Noto Serif JP', serif" };
const WORKS = [["Tea House at Ohara", "Kyoto", "2025", "38 m²", "#b9b2a6"], ["House for Two Potters", "Shiga", "2024", "92 m²", "#a39c8f"], ["Riverside Reading Room", "Kameoka", "2023", "60 m²", "#c4bdb1"], ["Small Shrine Repair", "Nara", "2022", "14 m²", "#9b9488"]];
function Row({ w }) {
  return (
    <motion.div initial="rest" whileHover="hover" className="relative grid h-36 grid-cols-12 items-center overflow-hidden border-t border-[#1B1B1B]/20">
      <div className="col-span-5 text-2xl" style={jp}>{w[0]}</div>
      <div className="col-span-2 text-xs text-[#1B1B1B]/60">{w[1]}</div>
      <div className="col-span-1 text-xs text-[#1B1B1B]/60">{w[2]}</div>
      <div className="relative col-span-4 h-28 overflow-hidden">
        <p className="absolute inset-0 flex items-center pl-4 text-xs leading-relaxed text-[#1B1B1B]/70">{w[3]} · cedar, plaster, washi screens. Built with two carpenters over one winter.</p>
        <motion.div variants={{ rest: { x: 0 }, hover: { x: "62%" } }} transition={{ type: "spring", stiffness: 120, damping: 26 }} className="absolute inset-0" style={{ background: "linear-gradient(160deg, " + w[4] + ", #8d877c)" }} />
      </div>
    </motion.div>
  );
}
function Demo() {
  return (
    <div className="w-full bg-[#F4F0E6] text-[#1B1B1B]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
      <nav className="flex items-center justify-between px-16 py-8 text-xs tracking-[0.2em]">
        <span>KANSO <span style={jp}>簡素</span></span>
        <div className="flex gap-12">{["Works", "Practice", "Writing", "Contact"].map((l) => <a key={l} href="#">{l}</a>)}</div>
      </nav>
      <section className="grid h-[640px] grid-cols-12 gap-8 px-16 pb-16">
        <div className="col-span-4 flex flex-col justify-between py-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }} className="text-6xl font-light leading-tight" style={jp}>Less,<br />built<br />carefully.</motion.h1>
          <span className="text-2xl tracking-[0.4em]" style={{ ...jp, writingMode: "vertical-rl" }}>少なく、丁寧に。</span>
        </div>
        <motion.div initial={{ clipPath: "inset(0 0 0 100%)" }} animate={{ clipPath: "inset(0 0 0 0%)" }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }} className="col-span-8" style={{ background: "linear-gradient(170deg, #c9c2b6 0%, #a8a39a 60%, #8d877c 100%)" }}>
          <div className="flex h-full items-end justify-end p-6 text-[10px] tracking-[0.3em] text-[#F4F0E6]">TEA HOUSE AT OHARA · 2025</div>
        </motion.div>
      </section>
      <section className="grid grid-cols-3 gap-16 border-t border-[#1B1B1B]/20 px-16 py-20">
        {[["間", "Ma", "The pause between things. We design the space you walk through, not only the rooms."], ["簡", "Kan", "Simplicity that took a long time. Fewer materials, joined well."], ["素", "So", "Honest surfaces. Wood stays wood. Plaster shows the hand."]].map(([k, n, d]) => (
          <div key={n}><div className="text-6xl" style={jp}>{k}</div><div className="mt-4 text-xs tracking-[0.3em]">{n.toUpperCase()}</div><p className="mt-3 text-sm leading-relaxed text-[#1B1B1B]/70">{d}</p></div>
        ))}
      </section>
      <section className="px-16 py-16">
        <div className="mb-8 flex justify-between text-xs tracking-[0.3em]"><span>SELECTED WORKS</span><span className="text-[#1B1B1B]/50">2022 — 2025</span></div>
        {WORKS.map((w) => <Row key={w[0]} w={w} />)}
      </section>
      <section className="px-16 py-20">
        <div className="mb-10 text-xs tracking-[0.3em]">HOW WE WORK</div>
        <div className="relative grid grid-cols-5 gap-6">
          <div className="absolute left-0 right-0 top-3 h-px bg-[#1B1B1B]/20" />
          {["Walk the site", "Draw by hand", "Model in paper", "Build with craftsmen", "Return after a year"].map((s, i) => (
            <div key={s} className="relative pt-10"><span className="absolute left-0 top-0 h-6 w-6 rounded-full border border-[#1B1B1B] bg-[#F4F0E6] text-center text-[10px] leading-6">{i + 1}</span><p className="text-sm">{s}</p></div>
          ))}
        </div>
      </section>
      <section className="grid grid-cols-12 border-t border-[#1B1B1B]/20 px-16 py-20">
        <div className="col-span-8">
          <h2 className="text-5xl font-light" style={jp}>Write to us.</h2>
          <p className="mt-6 text-sm leading-relaxed text-[#1B1B1B]/70">Kanso Architects · 3-12 Shimogamo, Sakyo-ku, Kyoto<br />studio@kanso.jp</p>
        </div>
        <div className="col-span-4 flex items-end justify-end">
          <motion.div initial={{ scale: 1.4, rotate: -12, opacity: 0 }} whileInView={{ scale: 1, rotate: -4, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 15 }} className="flex h-24 w-24 items-center justify-center bg-[#C8372D] text-3xl text-[#F4F0E6]" style={jp}>簡素</motion.div>
        </div>
      </section>
    </div>
  );
}
render(<Demo />);
`,
  },

  // ───────────────────────── 4. ORGANIC SKINCARE SHOP ─────────────────────────
  {
    title: "Bloom & Root Skincare Shop",
    category: WEBSITE,
    style: "Organic Earth",
    description: "A complete botanical e-commerce homepage: morphing blob hero, product cards with add-to-bag springs, an ingredients story, reviews and a refill subscription band.",
    tags: ["Full Site", "E-commerce", "Wellness", "Organic"],
    prompt: {
      title: "Bloom & Root Skincare Shop",
      design: { name: "Organic Earth", rules: ["Bone #F7F3EA, sage #A3B18A, moss #3A5A40, clay #DDA15E, blush #EFC7B3.", "Soft morphing blobs, rounded pills, generous radius, calm breathing motion.", "DM Serif Display headings (italic accents), DM Sans body."] },
      brief: "The homepage of a small-batch botanical skincare brand that sells refillable bottles. Calm, warm, tactile; it should make you want to touch the products.",
      details: [
        "Announcement bar: 'Free refills shipping over $40'.",
        "Nav: logo 'bloom & root' lowercase, links Shop / Rituals / Refill / Journal, bag icon with count.",
        "Hero: headline 'Rooted in slow rituals.' with morphing sage and clay blobs and a product bottle drawn in CSS.",
        "Bestsellers: 4 product cards (Oat Milk Cleanser, Rose Hip Oil, Clay Mask, Night Balm) with price, size and an 'Add' button.",
        "Ingredients story: split section with a big rounded image blob and three ingredients with origins.",
        "Reviews: three review cards with stars and first names.",
        "Refill band: moss background, 'Refill, don't rebuy. Save 20%.' with a pill CTA.",
        "Footer: newsletter, links, B-Corp-like badge circle.",
      ],
      interactions: [
        "Blobs morph between three SVG paths on 8–10s loops and rotate slowly.",
        "Add to bag: button morphs to a check and the bag count bounces (spring stiffness 500 damping 12).",
        "Product cards tilt slightly toward the pointer (±4°).",
      ],
    },
    previewCode: String.raw`
const serif = { fontFamily: "'DM Serif Display', serif" };
const P = ["M60,-60C78,-40,92,-20,90,-2C88,17,70,34,52,50C34,66,17,80,-3,83C-23,86,-46,77,-62,61C-78,45,-87,22,-86,0C-84,-21,-72,-42,-56,-62C-40,-82,-20,-100,0,-100C20,-100,41,-80,60,-60Z", "M55,-52C70,-38,80,-19,82,1C84,22,77,44,61,58C44,72,22,78,-1,79C-23,80,-46,76,-63,62C-80,48,-90,24,-88,2C-86,-20,-71,-41,-54,-55C-37,-69,-18,-77,1,-78C20,-79,40,-66,55,-52Z", "M64,-66C80,-48,88,-24,86,-2C84,20,72,40,56,55C40,70,20,80,-2,82C-24,84,-48,78,-64,63C-80,48,-88,24,-86,2C-84,-20,-72,-40,-56,-58C-40,-76,-20,-92,2,-94C24,-96,48,-84,64,-66Z"];
const PRODUCTS = [["Oat Milk Cleanser", "$24", "150 ml", "#EFC7B3"], ["Rose Hip Oil", "$38", "30 ml", "#DDA15E"], ["Green Clay Mask", "$29", "80 g", "#A3B18A"], ["Night Balm", "$34", "50 ml", "#C9B8A0"]];
function Bottle({ color, h }) {
  return <div className="mx-auto flex flex-col items-center"><div className="h-4 w-6 rounded-t bg-[#3A5A40]" /><div className="rounded-[28px] border-2 border-[#3A5A40]/30" style={{ width: h * 0.55, height: h, background: color }} /></div>;
}
function Card({ p, onAdd }) {
  const [done, setDone] = useState(false);
  return (
    <motion.div whileHover={{ rotate: -1.5, y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="rounded-[28px] bg-white p-5">
      <div className="flex h-56 items-end justify-center rounded-[22px] bg-[#F7F3EA] pb-6"><Bottle color={p[3]} h={130} /></div>
      <div className="mt-4 flex items-start justify-between"><div><h3 className="text-xl" style={serif}>{p[0]}</h3><p className="text-xs text-[#3A5A40]/60">{p[2]}</p></div><span className="font-semibold">{p[1]}</span></div>
      <motion.button layout onClick={() => { if (!done) { setDone(true); onAdd(); setTimeout(() => setDone(false), 1500); } }} className="mt-4 w-full rounded-full py-2.5 text-sm font-semibold" animate={{ backgroundColor: done ? "#A3B18A" : "#3A5A40" }} style={{ color: "#F7F3EA" }}>{done ? "✓ Added" : "Add to bag"}</motion.button>
    </motion.div>
  );
}
function Demo() {
  const [bag, setBag] = useState(2);
  return (
    <div className="w-full bg-[#F7F3EA] text-[#3A5A40]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="bg-[#3A5A40] py-2 text-center text-xs text-[#F7F3EA]">Free refills shipping over $40</div>
      <nav className="flex items-center justify-between px-14 py-6">
        <span className="text-2xl lowercase" style={serif}>bloom & root</span>
        <div className="flex gap-10 text-sm">{["Shop", "Rituals", "Refill", "Journal"].map((l) => <a key={l} href="#">{l}</a>)}</div>
        <div className="relative flex items-center gap-2 text-sm"><ShoppingBag size={20} strokeWidth={1.5} /><motion.span key={bag} initial={{ scale: 1.6 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 12 }} className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DDA15E] text-[10px] text-white">{bag}</motion.span></div>
      </nav>
      <section className="relative grid h-[600px] grid-cols-2 overflow-hidden px-14">
        <div className="relative z-10 flex flex-col justify-center gap-6">
          <span className="text-xs uppercase tracking-[0.3em]">Plant-based · Refillable · Small batch</span>
          <h1 className="text-[5.6rem] leading-[0.95]" style={serif}>Rooted in<br /><span className="italic">slow rituals.</span></h1>
          <p className="max-w-md text-lg text-[#3A5A40]/75">Skincare made in small batches from oats, rose hips and green clay, in bottles you refill for life.</p>
          <div className="flex gap-3"><span className="rounded-full bg-[#3A5A40] px-7 py-4 text-sm text-[#F7F3EA]">Shop bestsellers</span><span className="rounded-full border border-[#3A5A40] px-7 py-4 text-sm">Find your ritual</span></div>
        </div>
        <div className="relative">
          <motion.svg viewBox="-100 -100 200 200" className="absolute -right-24 -top-10 h-[680px] w-[680px]" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 50, ease: "linear" }}><motion.path fill="#A3B18A" animate={{ d: [P[0], P[1], P[2], P[0]] }} transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }} /></motion.svg>
          <motion.svg viewBox="-100 -100 200 200" className="absolute bottom-10 left-6 h-64 w-64" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 36, ease: "linear" }}><motion.path fill="#DDA15E" animate={{ d: [P[2], P[0], P[1], P[2]] }} transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }} /></motion.svg>
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"><Bottle color="#EFC7B3" h={240} /></motion.div>
        </div>
      </section>
      <section className="px-14 py-20">
        <div className="mb-10 flex items-end justify-between"><h2 className="text-5xl" style={serif}>Bestsellers</h2><a href="#" className="text-sm underline">Shop all 18 products</a></div>
        <div className="grid grid-cols-4 gap-6">{PRODUCTS.map((p) => <Card key={p[0]} p={p} onAdd={() => setBag((b) => b + 1)} />)}</div>
      </section>
      <section className="grid grid-cols-2 items-center gap-16 px-14 py-16">
        <div className="h-[460px] rounded-[48%_52%_44%_56%/55%_45%_55%_45%]" style={{ background: "linear-gradient(160deg, #A3B18A, #3A5A40)" }} />
        <div>
          <span className="text-xs uppercase tracking-[0.3em]">What goes in</span>
          <h2 className="mt-3 text-5xl leading-tight" style={serif}>Three ingredients<br /><span className="italic">we can name the farm of.</span></h2>
          {[["Oats", "Organic farm in Galilee"], ["Rose hips", "Wild-harvested, Chilean Andes"], ["Green clay", "Quarry in southern France"]].map(([n, o]) => (
            <div key={n} className="mt-6 flex items-center justify-between border-b border-[#3A5A40]/20 pb-4"><span className="text-2xl" style={serif}>{n}</span><span className="text-sm text-[#3A5A40]/70">{o}</span></div>
          ))}
        </div>
      </section>
      <section className="grid grid-cols-3 gap-6 px-14 py-16">
        {[["My skin stopped arguing with me after two weeks.", "Maya"], ["The refill pouch is genius. Same bottle for a year now.", "Ruth"], ["Rose hip oil smells like an actual garden.", "Tom"]].map(([q, n]) => (
          <div key={n} className="rounded-[28px] bg-white p-7"><div className="text-[#DDA15E]">★★★★★</div><p className="mt-3 text-xl leading-snug" style={serif}>“{q}”</p><p className="mt-4 text-sm text-[#3A5A40]/60">— {n}, verified buyer</p></div>
        ))}
      </section>
      <section className="mx-14 my-10 flex items-center justify-between rounded-[40px] bg-[#3A5A40] px-14 py-14 text-[#F7F3EA]">
        <h2 className="text-5xl" style={serif}>Refill, don't rebuy. <span className="italic text-[#DDA15E]">Save 20%.</span></h2>
        <motion.span animate={{ scale: [1, 1.04, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="rounded-full bg-[#F7F3EA] px-8 py-4 text-sm font-semibold text-[#3A5A40]">Start a refill plan</motion.span>
      </section>
      <footer className="grid grid-cols-4 gap-8 px-14 py-14 text-sm">
        <div><div className="text-2xl lowercase" style={serif}>bloom & root</div><p className="mt-2 text-[#3A5A40]/60">Made by hand in Jaffa.</p></div>
        <div>Shop<br />Rituals<br />Refill</div><div>Journal<br />Stockists<br />Contact</div>
        <div className="flex justify-end"><div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#3A5A40] text-center text-[10px] font-semibold uppercase">Plastic<br />negative</div></div>
      </footer>
    </div>
  );
}
render(<Demo />);
`,
  },

  // ───────────────────────── 5. SAAS FINTECH (SWISS + DATA) ─────────────────────────
  {
    title: "Ledgerly SaaS Landing Page",
    category: WEBSITE,
    style: "Swiss International",
    description: "A complete B2B SaaS landing page with a live product dashboard in the hero, logo strip, feature grid, pricing with a billing toggle, FAQ and CTA.",
    tags: ["Full Site", "SaaS", "Fintech", "Landing Page"],
    prompt: {
      title: "Ledgerly SaaS Landing Page",
      design: { name: "Swiss International (product edition)", rules: ["White #FFFFFF, ink #0B0B0C, grey #6B6B70, hairline #E6E6E8, one signal red #E30613 for emphasis and the primary button.", "Strict 12-column grid, bold grotesk (Inter Tight 700/800) with tight tracking, numbers as graphics.", "Product UI shown as real-looking cards with tabular numbers (IBM Plex Mono for figures)."] },
      brief: "A landing page for a bookkeeping SaaS for freelancers and small studios. It must show the actual product in the first screen and convert to a free trial.",
      details: [
        "Nav: logo 'Ledgerly', links Product / Pricing / Customers / Docs, 'Sign in' text and red 'Start free' button.",
        "Hero: headline 'Books that close themselves.' left; right a product card showing this month's income, expenses, a bar chart and 3 recent transactions that animate in.",
        "Logo strip: 'Trusted by 4,200 studios' with 6 wordmarks.",
        "Features: 3x2 grid with big red numerals 01–06 and short copy (bank sync, invoices, VAT, receipts, reports, accountant access).",
        "Pricing: Monthly/Yearly toggle, three plans (Solo $12, Studio $29, Agency $79) with the middle one highlighted.",
        "FAQ: four questions in an accordion.",
        "CTA: full-width black band 'Close this month in 10 minutes.' and the trial button; footer with columns.",
      ],
      interactions: [
        "Hero bars grow from 0 with 60ms stagger; transactions slide in from the right one by one.",
        "Income figure counts up with a spring.",
        "Pricing numbers flip vertically when the billing period changes; FAQ height animates.",
      ],
    },
    previewCode: String.raw`
const ui = { fontFamily: "'Inter Tight', 'Helvetica Neue', Arial, sans-serif" };
const fig = { fontFamily: "'IBM Plex Mono', monospace" };
const BARS = [42, 58, 51, 70, 64, 82, 76, 91, 68, 88, 95, 80];
const TX = [["Invoice #1043 · Kiln & Co.", "+$3,200"], ["Adobe Creative Cloud", "−$59"], ["Invoice #1044 · Fieldnote", "+$1,850"]];
const PLANS = [["Solo", 12, 10, ["1 user", "Bank sync", "Invoices"]], ["Studio", 29, 24, ["5 users", "VAT & reports", "Receipts AI"]], ["Agency", 79, 66, ["Unlimited users", "Accountant access", "Priority support"]]];
function Count({ to }) {
  const [v, setV] = useState(0);
  useEffect(() => { const c = animate(0, to, { type: "spring", stiffness: 40, damping: 18, onUpdate: (n) => setV(Math.round(n)) }); return () => c.stop(); }, [to]);
  return <>{v.toLocaleString("en-US")}</>;
}
function Faq() {
  const [o, setO] = useState(0);
  const Q = [["Can my accountant log in?", "Yes. Invite them for free on every plan; they get read-only or full access."], ["Which banks do you support?", "Over 2,000 banks in Europe, the UK, the US and Israel."], ["Is there a free trial?", "30 days, no card required. Your data stays if you upgrade."], ["Can I export everything?", "CSV, PDF and a direct export to the major accounting suites."]];
  return Q.map(([q, a], i) => (
    <div key={q} className="border-b border-[#E6E6E8]">
      <button onClick={() => setO(o === i ? -1 : i)} className="flex w-full justify-between py-5 text-left text-lg font-semibold">{q}<span className="text-[#E30613]">{o === i ? "−" : "+"}</span></button>
      <AnimatePresence initial={false}>{o === i && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-5 text-[#6B6B70]">{a}</motion.p>}</AnimatePresence>
    </div>
  ));
}
function Demo() {
  const [yearly, setYearly] = useState(true);
  return (
    <div className="w-full bg-white text-[#0B0B0C]" style={ui}>
      <nav className="flex items-center justify-between border-b border-[#E6E6E8] px-14 py-5">
        <span className="text-xl font-extrabold tracking-tight">Ledgerly<span className="text-[#E30613]">.</span></span>
        <div className="flex gap-9 text-sm font-medium">{["Product", "Pricing", "Customers", "Docs"].map((l) => <a key={l} href="#">{l}</a>)}</div>
        <div className="flex items-center gap-5 text-sm font-semibold"><span>Sign in</span><span className="bg-[#E30613] px-5 py-2.5 text-white">Start free</span></div>
      </nav>
      <section className="grid grid-cols-12 gap-10 px-14 py-20">
        <div className="col-span-6 flex flex-col justify-center">
          <span className="text-sm font-semibold text-[#E30613]">Bookkeeping for freelancers & studios</span>
          <h1 className="mt-4 text-[5.4rem] font-extrabold leading-[0.92] tracking-[-0.04em]">Books that close themselves.</h1>
          <p className="mt-6 max-w-lg text-lg text-[#6B6B70]">Ledgerly syncs your bank, matches receipts and drafts your VAT return. You approve; it files.</p>
          <div className="mt-8 flex gap-3"><span className="bg-[#E30613] px-7 py-4 font-semibold text-white">Start 30-day trial</span><span className="border border-[#0B0B0C] px-7 py-4 font-semibold">Watch 2-min demo</span></div>
        </div>
        <div className="col-span-6 border border-[#E6E6E8] p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-[#6B6B70]"><span>October 2026</span><span>Studio Salt</span></div>
          <div className="mt-4 grid grid-cols-2 gap-6">
            <div><div className="text-xs text-[#6B6B70]">Income</div><div className="text-4xl font-semibold" style={fig}>$<Count to={18450} /></div></div>
            <div><div className="text-xs text-[#6B6B70]">Expenses</div><div className="text-4xl font-semibold" style={fig}>$4,120</div></div>
          </div>
          <div className="mt-6 flex h-40 items-end gap-2">{BARS.map((h, i) => <motion.div key={i} initial={{ height: 0 }} animate={{ height: h + "%" }} transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.3 + i * 0.06 }} className={"flex-1 " + (i === 10 ? "bg-[#E30613]" : "bg-[#0B0B0C]")} />)}</div>
          <div className="mt-6 space-y-2">{TX.map(([n, v], i) => (
            <motion.div key={n} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1 + i * 0.25, type: "spring", stiffness: 200, damping: 22 }} className="flex justify-between border-t border-[#E6E6E8] pt-2 text-sm"><span>{n}</span><span style={fig} className={v.startsWith("+") ? "text-[#0B0B0C]" : "text-[#E30613]"}>{v}</span></motion.div>
          ))}</div>
        </div>
      </section>
      <section className="border-y border-[#E6E6E8] px-14 py-10">
        <p className="text-center text-sm font-semibold text-[#6B6B70]">Trusted by 4,200 studios and freelancers</p>
        <div className="mt-6 grid grid-cols-6 text-center text-2xl font-extrabold tracking-tight text-[#0B0B0C]/40">{["KILN", "Fieldnote", "SALT", "Haddad", "Margins", "Hill412"].map((l) => <span key={l}>{l}</span>)}</div>
      </section>
      <section className="grid grid-cols-3 gap-x-10 gap-y-14 px-14 py-24">
        {[["Bank sync", "Transactions land every morning, already categorised."], ["Invoices", "Branded invoices with payment links and reminders."], ["VAT, done", "Your quarterly return is drafted before you remember it."], ["Receipt capture", "Forward an email or snap a photo. Matched automatically."], ["Live reports", "Profit, runway and tax set-aside on one screen."], ["Accountant access", "Invite them free. No more spreadsheet ping-pong."]].map(([t, d], i) => (
          <div key={t}><div className="text-6xl font-extrabold text-[#E30613]">{"0" + (i + 1)}</div><h3 className="mt-3 text-2xl font-bold">{t}</h3><p className="mt-2 text-[#6B6B70]">{d}</p></div>
        ))}
      </section>
      <section className="bg-[#F6F6F7] px-14 py-24">
        <div className="flex items-end justify-between"><h2 className="text-6xl font-extrabold tracking-tight">Pricing</h2>
          <div className="flex border border-[#0B0B0C] text-sm font-semibold">{["Monthly", "Yearly −17%"].map((l, i) => <button key={l} onClick={() => setYearly(i === 1)} className={"px-5 py-2.5 " + ((i === 1) === yearly ? "bg-[#0B0B0C] text-white" : "")}>{l}</button>)}</div>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-6">{PLANS.map(([n, m, y, f], i) => (
          <div key={n} className={"p-8 " + (i === 1 ? "bg-[#0B0B0C] text-white" : "border border-[#0B0B0C] bg-white")}>
            <div className="flex justify-between font-semibold"><span>{n}</span>{i === 1 && <span className="text-[#E30613]">Most popular</span>}</div>
            <div className="mt-6 flex h-16 items-end overflow-hidden text-6xl font-extrabold"><span>$</span><AnimatePresence mode="popLayout" initial={false}><motion.span key={String(yearly)} initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 400, damping: 28 }}>{yearly ? y : m}</motion.span></AnimatePresence><span className="mb-2 text-base font-medium opacity-60">/mo</span></div>
            <ul className="mt-6 space-y-2 text-sm">{f.map((x) => <li key={x}>— {x}</li>)}</ul>
            <div className={"mt-8 py-3 text-center font-semibold " + (i === 1 ? "bg-[#E30613]" : "bg-[#0B0B0C] text-white")}>Start free</div>
          </div>
        ))}</div>
      </section>
      <section className="grid grid-cols-12 px-14 py-24"><h2 className="col-span-4 text-5xl font-extrabold tracking-tight">Questions</h2><div className="col-span-8"><Faq /></div></section>
      <section className="flex items-center justify-between bg-[#0B0B0C] px-14 py-20 text-white"><h2 className="text-6xl font-extrabold tracking-tight">Close this month<br />in 10 minutes.</h2><span className="bg-[#E30613] px-8 py-5 text-lg font-semibold">Start free trial</span></section>
      <footer className="grid grid-cols-5 gap-6 px-14 py-14 text-sm text-[#6B6B70]"><span className="font-extrabold text-[#0B0B0C]">Ledgerly.</span>{["Product", "Company", "Resources", "Legal"].map((c) => <div key={c}><div className="font-semibold text-[#0B0B0C]">{c}</div><div className="mt-2 space-y-1"><div>Overview</div><div>Changelog</div><div>Status</div></div></div>)}</footer>
    </div>
  );
}
render(<Demo />);
`,
  },

  // ───────────────────────── 6. RETRO 70s MUSIC FESTIVAL ─────────────────────────
  {
    title: "Sunwave Festival Website",
    category: WEBSITE,
    style: "Retro 70s",
    description: "A groovy music-festival site: sunset-stripe hero, wavy lineup poster, day-by-day schedule tabs, ticket tiers and a camping map block.",
    tags: ["Full Site", "Events", "Music", "Retro"],
    prompt: {
      title: "Sunwave Festival Website",
      design: { name: "Retro 70s", rules: ["Cream #F6E7CB, burnt orange #E2711D, mustard #F2B134, chocolate #4A2C1D, teal #2A7F7A.", "Rounded sunset stripes, wavy dividers, pill shapes; warm and loose.", "Shrikhand for display, DM Sans bold for UI."] },
      brief: "The website of a three-day desert music festival with a 1970s soul. It sells tickets and shows the lineup like a vintage poster.",
      details: [
        "Nav: logo 'Sunwave' in Shrikhand, links Lineup / Schedule / Tickets / Camping, a 'Get tickets' pill.",
        "Hero: concentric sunset arcs rising behind 'Sunwave '26', dates 'Aug 14–16 · Mitzpe Ramon Desert'.",
        "Lineup poster: headliners big, then smaller rows, in alternating colors, centered like a poster.",
        "Schedule: tabs Fri / Sat / Sun switching a list of set times on three stages.",
        "Tickets: three tiers (Day pass, Weekend, Weekend + Camping) with prices and sold-out state on the first.",
        "Camping: a stylized map block made of shapes with labels (Stage, Camp, Pool, Food).",
        "Footer: wavy top edge, socials, newsletter.",
      ],
      interactions: [
        "Sunset arcs scale up from the bottom with springy stagger on load; the logo letters sway gently.",
        "Schedule tab change crossfades the list with a slide.",
        "Ticket cards bob on hover; the sold-out card has a rotated 'SOLD OUT' stamp.",
      ],
    },
    previewCode: String.raw`
const disp = { fontFamily: "'Shrikhand', cursive" };
const ARCS = ["#4A2C1D", "#E2711D", "#F2B134", "#2A7F7A", "#E2711D"];
const SCHED = { Fri: [["18:00", "Desert Stage", "Mira & The Dunes"], ["20:30", "Sun Stage", "Golden Hour Club"], ["23:00", "Desert Stage", "Orange Grove"]], Sat: [["17:00", "Oasis", "Teal Velvet"], ["21:00", "Sun Stage", "The Slow Burners"], ["00:30", "Desert Stage", "Midnight Mirage"]], Sun: [["16:00", "Oasis", "Sunday Soul Choir"], ["19:00", "Sun Stage", "Mustard Seeds"], ["22:00", "Desert Stage", "Farewell Fire"]] };
function Wave({ color, flip }) {
  return <svg viewBox="0 0 1280 40" className="block w-full" style={{ transform: flip ? "scaleY(-1)" : "none" }} preserveAspectRatio="none" height="40"><path d="M0 20 Q 80 0 160 20 T 320 20 T 480 20 T 640 20 T 800 20 T 960 20 T 1120 20 T 1280 20 V 40 H 0 Z" fill={color} /></svg>;
}
function Demo() {
  const [day, setDay] = useState("Sat");
  return (
    <div className="w-full bg-[#F6E7CB] text-[#4A2C1D]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <nav className="flex items-center justify-between px-14 py-6"><span className="text-3xl" style={disp}>Sunwave</span><div className="flex gap-10 font-bold">{["Lineup", "Schedule", "Tickets", "Camping"].map((l) => <a key={l} href="#">{l}</a>)}</div><span className="rounded-full bg-[#E2711D] px-6 py-3 font-bold text-[#F6E7CB]">Get tickets</span></nav>
      <section className="relative flex h-[620px] flex-col items-center overflow-hidden pt-16">
        {ARCS.map((c, i) => <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 90, damping: 13, delay: i * 0.1 }} className="absolute bottom-0 left-1/2 rounded-t-full" style={{ width: 1180 - i * 200, height: 560 - i * 100, marginLeft: -(1180 - i * 200) / 2, background: c, originY: 1 }} />)}
        <h1 className="relative z-10 flex text-[9rem] leading-none" style={{ ...disp, textShadow: "6px 6px 0 #F6E7CB" }}>{"Sunwave".split("").map((l, i) => <motion.span key={i} className="inline-block" animate={{ rotate: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 2.4, delay: i * 0.12 }}>{l}</motion.span>)}</h1>
        <p className="relative z-10 mt-2 rounded-full bg-[#F6E7CB] px-6 py-2 text-lg font-bold">Aug 14–16 · Mitzpe Ramon Desert · '26</p>
      </section>
      <Wave color="#4A2C1D" />
      <section className="bg-[#4A2C1D] px-14 py-20 text-center text-[#F6E7CB]">
        <div className="text-sm font-bold uppercase tracking-[0.4em] text-[#F2B134]">The lineup</div>
        <div className="mt-6 text-7xl leading-tight" style={disp}><span className="text-[#F2B134]">Golden Hour Club</span> · The Slow Burners</div>
        <div className="mt-4 text-4xl" style={disp}>Midnight Mirage · <span className="text-[#E2711D]">Teal Velvet</span> · Orange Grove</div>
        <div className="mt-6 text-xl font-bold opacity-80">Mira & The Dunes · Mustard Seeds · Sunday Soul Choir · Farewell Fire · +24 more</div>
      </section>
      <Wave color="#4A2C1D" flip />
      <section className="px-14 py-20">
        <div className="flex items-end justify-between"><h2 className="text-6xl" style={disp}>Schedule</h2>
          <div className="flex gap-2">{Object.keys(SCHED).map((d) => <button key={d} onClick={() => setDay(d)} className={"rounded-full px-6 py-2.5 font-bold " + (day === d ? "bg-[#E2711D] text-[#F6E7CB]" : "border-2 border-[#4A2C1D]")}>{d}</button>)}</div>
        </div>
        <AnimatePresence mode="wait"><motion.div key={day} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} className="mt-10">
          {SCHED[day].map(([t, s, a]) => <div key={a} className="grid grid-cols-12 items-center border-b-2 border-[#4A2C1D]/20 py-5 text-xl"><span className="col-span-2 font-bold">{t}</span><span className="col-span-3 font-bold text-[#2A7F7A]">{s}</span><span className="col-span-7 text-3xl" style={disp}>{a}</span></div>)}
        </motion.div></AnimatePresence>
      </section>
      <section className="grid grid-cols-3 gap-8 px-14 py-16">
        {[["Day pass", "₪290", true, "#F2B134"], ["Weekend", "₪690", false, "#E2711D"], ["Weekend + Camping", "₪890", false, "#2A7F7A"]].map(([n, p, sold, c]) => (
          <motion.div key={n} whileHover={{ y: [0, -10, -6] }} className="relative rounded-[36px] p-8 text-[#F6E7CB]" style={{ background: c }}>
            <div className="text-3xl" style={disp}>{n}</div><div className="mt-8 text-6xl font-bold">{p}</div><div className="mt-8 rounded-full bg-[#F6E7CB] py-3 text-center font-bold text-[#4A2C1D]">{sold ? "Join waitlist" : "Buy now"}</div>
            {sold && <span className="absolute right-6 top-6 rotate-12 rounded-lg border-4 border-[#4A2C1D] px-3 py-1 text-lg font-bold text-[#4A2C1D]">SOLD OUT</span>}
          </motion.div>
        ))}
      </section>
      <section className="grid grid-cols-2 items-center gap-12 px-14 py-16">
        <div><h2 className="text-6xl" style={disp}>Camp under<br />the stars</h2><p className="mt-4 max-w-md text-lg">Shaded tents, a spring-fed pool and coffee from 6 am. The crater does the rest.</p></div>
        <div className="relative h-80 rounded-[36px] bg-[#F2B134]">
          {[["Sun Stage", "left-8 top-8", "#E2711D"], ["Camp", "right-10 top-16", "#2A7F7A"], ["Pool", "left-24 bottom-10", "#2A7F7A"], ["Food", "right-24 bottom-8", "#4A2C1D"]].map(([n, pos, c]) => <span key={n} className={"absolute rounded-full px-5 py-3 font-bold text-[#F6E7CB] " + pos} style={{ background: c }}>{n}</span>)}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 320"><path d="M90 60 C 250 120, 300 200, 160 270 M 160 270 C 300 260, 420 280, 470 270 M 470 70 C 430 160, 470 220, 470 270" stroke="#4A2C1D" strokeWidth="3" strokeDasharray="8 8" fill="none" /></svg>
        </div>
      </section>
      <Wave color="#E2711D" />
      <footer className="flex justify-between bg-[#E2711D] px-14 py-12 font-bold text-[#F6E7CB]"><span className="text-4xl" style={disp}>Sunwave</span><span>hello@sunwave.fest · Instagram · Spotify playlist</span></footer>
    </div>
  );
}
render(<Demo />);
`,
  },

  // ───────────────────────── 7. 8-BIT GAME STUDIO ─────────────────────────
  {
    title: "Pixel Pals Game Studio Site",
    category: WEBSITE,
    style: "8-bit Arcade",
    description: "An indie game studio site rendered like a cartridge menu: pixel starfield hero, games as cartridges, a team roster of pixel avatars and a high-score style newsletter.",
    tags: ["Full Site", "Games", "Pixel Art", "Studio"],
    prompt: {
      title: "Pixel Pals Game Studio Site",
      design: { name: "8-bit Arcade", rules: ["Black #111 screen, PICO-8-like palette: red #FF004D, orange #FFA300, yellow #FFEC27, green #00E436, blue #29ADFF, lavender #83769C, white.", "Square pixels only, no radius, hard 4px shadows, stepped/blinking animation.", "Press Start 2P for headings and UI, a plain mono for long copy."] },
      brief: "The website of a three-person indie studio that makes cozy pixel-art games. It should feel like booting up a console.",
      details: [
        "Top bar: 'PIXEL PALS' logo, menu GAMES / TEAM / PRESS / SHOP, '1UP' coin counter.",
        "Hero: starfield background, big title 'WE MAKE TINY WORLDS.', blinking 'PRESS START', pixel character made of squares bouncing.",
        "Games: three cartridge-shaped cards (Moss Knight, Tide Pool Tycoon, Lantern Post) with platform tags and a 'PLAY DEMO' button.",
        "Team: three pixel avatars built from grids, name and role, health-bar style skill meters.",
        "Newsletter: styled as a HIGH SCORES table with an 'ENTER YOUR EMAIL' input.",
        "Footer: '© 2026 PIXEL PALS · CONTINUE? 9' countdown.",
      ],
      interactions: [
        "Stars twinkle with stepped opacity; the character bounces with steps easing.",
        "Cartridge cards pop up 8px on hover with no easing (instant, like sprites).",
        "Buttons press exactly 4px down-right and lose their shadow.",
      ],
    },
    previewCode: String.raw`
const px = { fontFamily: "'Press Start 2P', monospace" };
const STARS = Array.from({ length: 60 }, (_, i) => ({ x: (i * 97) % 1280, y: (i * 53) % 600, d: (i % 5) * 0.3 }));
const HERO = ["....rr....", "...rrrr...", "..rwkwkr..", "..rrrrrr..", "...rrrr...", "..bb..bb..", ".bb....bb."];
const COLORS = { r: "#FF004D", w: "#FFFFFF", k: "#111111", b: "#29ADFF" };
function Sprite({ map, size }) {
  return <div className="grid" style={{ gridTemplateColumns: "repeat(" + map[0].length + ", " + size + "px)" }}>{map.join("").split("").map((c, i) => <span key={i} style={{ width: size, height: size, background: COLORS[c] || "transparent" }} />)}</div>;
}
const GAMES = [["MOSS KNIGHT", "SWITCH · PC", "#00E436"], ["TIDE POOL TYCOON", "PC · MAC", "#29ADFF"], ["LANTERN POST", "COMING 2027", "#FFA300"]];
function Btn({ children, c }) {
  return <motion.button initial={{ boxShadow: "4px 4px 0 #FFF" }} whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0 #FFF" }} transition={{ duration: 0 }} className="px-5 py-3 text-[11px] text-[#111]" style={{ background: c, ...px }}>{children}</motion.button>;
}
function Demo() {
  return (
    <div className="w-full bg-[#111] text-white" style={{ fontFamily: "'Space Mono', monospace", imageRendering: "pixelated" }}>
      <nav className="flex items-center justify-between border-b-4 border-[#83769C] px-12 py-6 text-xs" style={px}>
        <span className="text-[#FFEC27]">PIXEL PALS</span>
        <div className="flex gap-10">{["GAMES", "TEAM", "PRESS", "SHOP"].map((l) => <a key={l} href="#" className="hover:text-[#FF004D]">{l}</a>)}</div>
        <span className="text-[#00E436]">1UP 03</span>
      </nav>
      <section className="relative h-[600px] overflow-hidden">
        {STARS.map((s, i) => <motion.span key={i} className="absolute h-1 w-1 bg-white" style={{ left: s.x, top: s.y }} animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.6, delay: s.d, ease: "linear", times: [0, 0.5, 1] }} />)}
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-10">
          <motion.div animate={{ y: [0, -24, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear", times: [0, 0.5, 1] }}><Sprite map={HERO} size={10} /></motion.div>
          <h1 className="text-center text-5xl leading-[1.5]" style={{ ...px, textShadow: "6px 6px 0 #FF004D" }}>WE MAKE<br />TINY WORLDS.</h1>
          <motion.p animate={{ opacity: [1, 1, 0, 0] }} transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 0.5, 1] }} className="text-sm text-[#FFEC27]" style={px}>PRESS START</motion.p>
        </div>
      </section>
      <section className="px-12 py-20">
        <h2 className="mb-12 text-2xl text-[#29ADFF]" style={px}>GAMES</h2>
        <div className="grid grid-cols-3 gap-10">{GAMES.map(([n, p, c]) => (
          <motion.div key={n} whileHover={{ y: -8 }} transition={{ duration: 0 }} className="border-4 border-white bg-[#1d1d1d] p-4">
            <div className="mx-auto mb-4 h-3 w-1/2 bg-white" />
            <div className="flex h-52 items-center justify-center" style={{ background: c }}><span className="text-center text-sm leading-relaxed text-[#111]" style={px}>{n}</span></div>
            <div className="mt-4 flex items-center justify-between"><span className="text-[10px] text-[#83769C]" style={px}>{p}</span><Btn c="#FFEC27">PLAY DEMO</Btn></div>
          </motion.div>
        ))}</div>
      </section>
      <section className="px-12 py-16">
        <h2 className="mb-12 text-2xl text-[#00E436]" style={px}>THE PARTY</h2>
        <div className="grid grid-cols-3 gap-10">{[["NOA", "ART", "#FF004D", 90], ["IDO", "CODE", "#29ADFF", 75], ["LIA", "MUSIC", "#FFA300", 85]].map(([n, r, c, hp]) => (
          <div key={n} className="flex items-center gap-6 border-4 border-[#83769C] p-5">
            <Sprite map={["..cccc..", ".cwkkwc.", ".cccccc.", "..cccc..", ".c....c."].map((row) => row.replace(/c/g, "r"))} size={9} />
            <div className="flex-1 text-[11px]" style={px}><div>{n}</div><div className="mt-2 text-[#83769C]">{r}</div><div className="mt-3 h-3 w-full border-2 border-white"><motion.div initial={{ width: 0 }} whileInView={{ width: hp + "%" }} transition={{ duration: 0.6, ease: "linear" }} className="h-full" style={{ background: c }} /></div></div>
          </div>
        ))}</div>
      </section>
      <section className="mx-12 my-12 border-4 border-[#FFEC27] p-10">
        <h2 className="text-center text-2xl text-[#FFEC27]" style={px}>HIGH SCORES</h2>
        <div className="mx-auto mt-8 max-w-xl space-y-3 text-sm" style={px}>{[["1ST", "MOSS", "99,999"], ["2ND", "TIDE", "84,210"], ["3RD", "YOU?", "------"]].map(([a, b, c]) => <div key={a} className="flex justify-between"><span>{a}</span><span className="text-[#29ADFF]">{b}</span><span>{c}</span></div>)}</div>
        <div className="mx-auto mt-10 flex max-w-xl gap-4"><input defaultValue="ENTER YOUR EMAIL" className="flex-1 border-4 border-white bg-[#111] px-4 py-3 text-[11px] outline-none" style={px} /><Btn c="#00E436">JOIN</Btn></div>
      </section>
      <footer className="flex justify-between border-t-4 border-[#83769C] px-12 py-8 text-[10px] text-[#83769C]" style={px}><span>© 2026 PIXEL PALS</span><span className="text-[#FF004D]">CONTINUE? 9</span></footer>
    </div>
  );
}
render(<Demo />);
`,
  },

  // ───────────────────────── 8. BAUHAUS CAFÉ ─────────────────────────
  {
    title: "Café Bauhaus Website",
    category: WEBSITE,
    style: "Bauhaus",
    description: "A coffee-shop site built like a Bauhaus poster: geometric hero composition, a menu grid of primary-colored tiles, opening hours as a bar chart and a location block.",
    tags: ["Full Site", "Restaurant", "Bauhaus", "Geometric"],
    prompt: {
      title: "Café Bauhaus Website",
      design: { name: "Bauhaus", rules: ["Off-white #F3EEE3, black #111, red #E63322, blue #1F4E9E, yellow #F6C21B.", "Only circles, squares, half- and quarter-circles; strict grid; bold diagonals allowed once.", "Syne 800 uppercase for display, Inter Tight for body."] },
      brief: "The website of a neighbourhood café and roastery in a 1930s white-city building. It should read like a Bauhaus exhibition poster that sells coffee.",
      details: [
        "Nav: circle logo + 'CAFÉ BAUHAUS', links Menu / Beans / Visit, red 'Order ahead' square button.",
        "Hero: left headline 'FORM / FOLLOWS / COFFEE' stacked; right a 3x3 geometric composition (a cup made of a half-disc and a circle among other shapes).",
        "Menu: 6 tiles in a grid (Espresso, Flat white, Cortado, Filter, Cardamom bun, Shakshuka toast) each with a shape icon, price and short note.",
        "Hours: each weekday as a horizontal bar in the grid with times.",
        "Beans: three bags as tall rectangles in primary colors with origin and tasting notes.",
        "Visit: address in Tel Aviv's White City, a geometric map made of squares, and a 'Get directions' link; footer.",
      ],
      interactions: [
        "Hero shapes rotate in 90° steps when clicked (spring stiffness 260 damping 16).",
        "Menu tiles: the shape inside spins 180° on hover.",
        "Hour bars grow from 0 to their width when the section enters view.",
      ],
    },
    previewCode: String.raw`
const syne = { fontFamily: "'Syne', sans-serif" };
const R = "#E63322", B = "#1F4E9E", Y = "#F6C21B", K = "#111111";
function Shape({ k, c }) {
  if (k === 0) return <div className="h-full w-full rounded-full" style={{ background: c }} />;
  if (k === 1) return <div className="h-full w-full rounded-tl-full" style={{ background: c }} />;
  if (k === 2) return <div className="mt-auto h-1/2 w-full rounded-t-full" style={{ background: c }} />;
  return <div className="m-auto h-2/3 w-2/3" style={{ background: c }} />;
}
const MENU = [["Espresso", "₪11", "Double, always.", 0, R], ["Flat white", "₪16", "Whole or oat.", 2, B], ["Cortado", "₪14", "Half and half.", 1, Y], ["Filter", "₪15", "Today: Ethiopia Guji.", 3, K], ["Cardamom bun", "₪14", "Baked at 6 am.", 0, Y], ["Shakshuka toast", "₪42", "Until noon.", 2, R]];
const HOURS = [["MON–THU", 7, 19], ["FRI", 7, 15], ["SAT", 9, 17], ["SUN", 7, 19]];
function Demo() {
  const [turn, setTurn] = useState(0);
  const comp = [[0, R], [3, K], [1, Y], [2, B], [0, Y], [3, R], [1, B], [3, Y], [2, K]];
  return (
    <div className="w-full bg-[#F3EEE3] text-[#111]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
      <nav className="flex items-center justify-between border-b-4 border-[#111] px-14 py-6">
        <span className="flex items-center gap-3 text-xl font-extrabold" style={syne}><span className="h-8 w-8 rounded-full bg-[#E63322]" />CAFÉ BAUHAUS</span>
        <div className="flex gap-10 font-bold uppercase" style={syne}>{["Menu", "Beans", "Visit"].map((l) => <a key={l} href="#">{l}</a>)}</div>
        <span className="bg-[#E63322] px-5 py-3 font-bold uppercase text-[#F3EEE3]" style={syne}>Order ahead</span>
      </nav>
      <section className="grid h-[620px] grid-cols-2 gap-12 px-14 py-12">
        <div className="flex flex-col justify-between">
          <h1 className="text-[5.6rem] font-extrabold uppercase leading-[0.88]" style={syne}>Form<br /><span className="text-[#E63322]">Follows</span><br />Coffee</h1>
          <p className="max-w-md text-lg">Specialty coffee and simple food on the ground floor of a 1934 White City building. Roasted downstairs, every Tuesday.</p>
        </div>
        <button onClick={() => setTurn(turn + 1)} className="grid grid-cols-3 grid-rows-3 gap-2" aria-label="Rotate the composition">
          {comp.map(([k, c], i) => (
            <div key={i} className="flex overflow-hidden bg-[#F3EEE3] outline outline-2 outline-[#111]/10"><motion.div className="flex h-full w-full" animate={{ rotate: ((i * 3 + turn) % 4) * 90 }} transition={{ type: "spring", stiffness: 260, damping: 16, delay: i * 0.04 }}><Shape k={k} c={c} /></motion.div></div>
          ))}
        </button>
      </section>
      <section className="border-y-4 border-[#111] px-14 py-20">
        <h2 className="mb-12 text-6xl font-extrabold uppercase" style={syne}>Menu</h2>
        <div className="grid grid-cols-2 gap-0 border-l-4 border-t-4 border-[#111]">{MENU.map(([n, p, d, k, c]) => (
          <motion.div key={n} initial="rest" whileHover="hover" className="flex items-center gap-6 border-b-4 border-r-4 border-[#111] p-8">
            <motion.div variants={{ rest: { rotate: 0 }, hover: { rotate: 180 } }} transition={{ type: "spring", stiffness: 200, damping: 14 }} className="flex h-20 w-20 shrink-0"><Shape k={k} c={c} /></motion.div>
            <div className="flex-1"><div className="flex justify-between text-2xl font-extrabold uppercase" style={syne}><span>{n}</span><span>{p}</span></div><p className="mt-1 text-sm">{d}</p></div>
          </motion.div>
        ))}</div>
      </section>
      <section className="grid grid-cols-2 gap-16 px-14 py-20">
        <div>
          <h2 className="mb-10 text-5xl font-extrabold uppercase" style={syne}>Hours</h2>
          {HOURS.map(([d, a, b], i) => (
            <div key={d} className="mb-5 grid grid-cols-6 items-center gap-4"><span className="font-bold" style={syne}>{d}</span>
              <div className="relative col-span-5 h-10 bg-[#111]/5"><motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 120, damping: 18, delay: i * 0.1 }} className="absolute inset-y-0 origin-left" style={{ left: ((a - 6) / 15) * 100 + "%", width: ((b - a) / 15) * 100 + "%", background: [R, B, Y, K][i] }} /><span className="absolute right-3 top-2 text-sm font-bold">{a}:00–{b}:00</span></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 items-end gap-5">{[["GUJI", "Ethiopia · jasmine, peach", R, 300], ["HUILA", "Colombia · cocoa, cherry", B, 360], ["CERRADO", "Brazil · nut, caramel", Y, 260]].map(([n, d, c, h]) => (
          <div key={n}><div className="flex items-start justify-center pt-6 text-base font-extrabold text-[#F3EEE3]" style={{ height: h, background: c, ...syne }}>{n}</div><p className="mt-3 text-sm">{d}</p></div>
        ))}</div>
      </section>
      <section className="grid grid-cols-2 gap-16 border-t-4 border-[#111] px-14 py-20">
        <div><h2 className="text-5xl font-extrabold uppercase" style={syne}>Visit</h2><p className="mt-6 text-2xl">Rothschild Blvd 71, Tel Aviv</p><p className="mt-2">Corner of Sheinkin. Bike racks out front.</p><span className="mt-8 inline-block border-b-4 border-[#E63322] pb-1 text-xl font-extrabold uppercase" style={syne}>Get directions →</span></div>
        <div className="grid h-72 grid-cols-6 grid-rows-4 gap-1">{Array.from({ length: 24 }).map((_, i) => <div key={i} style={{ background: i === 14 ? R : i % 7 === 0 ? Y : i % 5 === 0 ? B : "#111" + "18" }} className={i === 14 ? "rounded-full" : ""} />)}</div>
      </section>
      <footer className="flex justify-between bg-[#111] px-14 py-10 font-bold uppercase text-[#F3EEE3]" style={syne}><span>Café Bauhaus · since 2019</span><span>@cafebauhaus</span></footer>
    </div>
  );
}
render(<Demo />);
`,
  },

  // ───────────────────────── 9. CLAYMORPHISM HEALTH APP ─────────────────────────
  {
    title: "Vitals Habit App Landing",
    category: WEBSITE,
    style: "Claymorphism",
    description: "A soft, squishy app landing page: inflated phone mockup with a live habit ring, pastel feature bubbles, a streak calendar, testimonials and app-store buttons.",
    tags: ["Full Site", "Mobile App", "Health", "Soft UI"],
    prompt: {
      title: "Vitals Habit App Landing",
      design: { name: "Claymorphism", rules: ["Background #F3EEFF; pastel lilac #CDB8FF, peach #FFC9A9, mint #B8F0D8, butter #FFF1A8; ink #3B2B63.", "Inflated shapes: big radii, outer soft shadow + inner light top-left + inner shade bottom-right.", "Fredoka 600/700 for everything; friendly, round."] },
      brief: "A landing page for a habit-tracking app for people who hate habit trackers. It should feel soft, toy-like and encouraging.",
      details: [
        "Nav: clay pill containing logo 'vitals', links Features / Stories / Pricing, and a 'Get the app' clay button.",
        "Hero: headline 'Tiny habits. Big squish.' with a clay phone mockup showing a progress ring that fills to 72% and three habit chips.",
        "Features: four clay bubbles (Water, Steps, Sleep, Calm) with icons and one-line copy.",
        "Streak: a month calendar where completed days are inflated mint circles.",
        "Stories: three testimonial clay cards with avatars made of pastel circles.",
        "Download: App Store / Google Play clay buttons; footer.",
      ],
      interactions: [
        "Progress ring animates strokeDashoffset to 72% with a spring; the phone floats.",
        "Clay buttons deflate on press (scale 0.94, smaller shadow) and wobble back (damping 9).",
        "Calendar days pop in with stagger when visible.",
      ],
    },
    previewCode: String.raw`
const font = { fontFamily: "'Fredoka', sans-serif" };
function clay(c, r) { return { background: c, borderRadius: r || 32, boxShadow: "18px 22px 40px rgba(80,60,140,0.22), inset -8px -10px 18px rgba(0,0,0,0.08), inset 10px 10px 18px rgba(255,255,255,0.8)" }; }
const press = { scale: 0.94 };
function Ring({ pct }) {
  const c = 2 * Math.PI * 70;
  return (
    <svg width="180" height="180" viewBox="0 0 180 180"><circle cx="90" cy="90" r="70" stroke="#E9E2FF" strokeWidth="20" fill="none" />
      <motion.circle cx="90" cy="90" r="70" stroke="#9F84FF" strokeWidth="20" fill="none" strokeLinecap="round" strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c * (1 - pct) }} transition={{ type: "spring", stiffness: 40, damping: 14, delay: 0.4 }} transform="rotate(-90 90 90)" />
      <text x="90" y="98" textAnchor="middle" fontSize="30" fontWeight="700" fill="#3B2B63">72%</text></svg>
  );
}
function Demo() {
  return (
    <div className="w-full bg-[#F3EEFF] text-[#3B2B63]" style={font}>
      <nav className="mx-12 mt-8 flex items-center justify-between px-8 py-4" style={clay("#FFFFFF", 999)}>
        <span className="text-2xl font-bold">vitals</span>
        <div className="flex gap-10 text-lg font-semibold">{["Features", "Stories", "Pricing"].map((l) => <a key={l} href="#">{l}</a>)}</div>
        <motion.span whileTap={press} transition={{ type: "spring", stiffness: 400, damping: 9 }} className="px-6 py-3 text-lg font-semibold" style={clay("#CDB8FF", 999)}>Get the app</motion.span>
      </nav>
      <section className="grid h-[640px] grid-cols-2 items-center gap-10 px-16">
        <div>
          <h1 className="text-[5.6rem] font-bold leading-[0.95]">Tiny habits.<br /><span className="text-[#9F84FF]">Big squish.</span></h1>
          <p className="mt-6 max-w-md text-xl text-[#3B2B63]/75">The habit app for people who quit habit apps. No guilt, no streak shame, just small wins you can feel.</p>
          <div className="mt-8 flex gap-4"><motion.span whileTap={press} transition={{ type: "spring", stiffness: 400, damping: 9 }} className="px-8 py-4 text-xl font-semibold" style={clay("#FFC9A9", 999)}>Try free for 14 days</motion.span></div>
        </div>
        <motion.div animate={{ y: [0, -16, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="mx-auto flex h-[540px] w-[290px] flex-col items-center gap-5 p-6" style={clay("#FFFFFF", 54)}>
          <div className="h-5 w-24 rounded-full bg-[#E9E2FF]" />
          <div className="text-lg font-semibold">Today</div>
          <Ring pct={0.72} />
          {[["Drink water", "#B8F0D8", "6/8"], ["10 min walk", "#FFC9A9", "done"], ["Read 5 pages", "#FFF1A8", "2/5"]].map(([n, c, s]) => <div key={n} className="flex w-full justify-between px-5 py-3 font-semibold" style={clay(c, 999)}><span>{n}</span><span className="opacity-70">{s}</span></div>)}
        </motion.div>
      </section>
      <section className="grid grid-cols-4 gap-8 px-16 py-20">
        {[["Water", Coffee, "#B8F0D8", "Sips, not gallons."], ["Steps", MapPin, "#FFC9A9", "Walks count, even to the fridge."], ["Sleep", Moon, "#CDB8FF", "Bedtime nudges, no alarms."], ["Calm", Leaf, "#FFF1A8", "One breath counts."]].map(([n, I, c, d]) => (
          <motion.div key={n} whileHover={{ y: -8, rotate: -2 }} transition={{ type: "spring", stiffness: 300, damping: 12 }} className="p-8" style={clay(c, 40)}>
            <div className="flex h-16 w-16 items-center justify-center" style={clay("#FFFFFF", 999)}><I size={28} strokeWidth={2} /></div>
            <h3 className="mt-6 text-3xl font-bold">{n}</h3><p className="mt-2 text-lg opacity-75">{d}</p>
          </motion.div>
        ))}
      </section>
      <section className="grid grid-cols-2 items-center gap-16 px-16 py-16">
        <div><h2 className="text-6xl font-bold leading-tight">A month of<br />little yeses.</h2><p className="mt-4 text-xl opacity-75">Miss a day? The bubble just stays flat. Tomorrow it can puff up again.</p></div>
        <div className="grid grid-cols-7 gap-3 p-8" style={clay("#FFFFFF", 40)}>
          {Array.from({ length: 28 }).map((_, i) => { const on = [0, 1, 2, 4, 5, 7, 8, 9, 10, 12, 14, 15, 16, 18, 19, 20, 21, 22, 24, 25].includes(i); return (
            <motion.div key={i} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 500, damping: 12, delay: i * 0.02 }} className="flex aspect-square items-center justify-center text-sm font-semibold" style={on ? clay("#B8F0D8", 999) : { borderRadius: 999, background: "#F3EEFF" }}>{i + 1}</motion.div>
          ); })}
        </div>
      </section>
      <section className="grid grid-cols-3 gap-8 px-16 py-16">
        {[["I finally drink water. Like, on purpose.", "Dana", "#CDB8FF"], ["It's the only app that doesn't yell at me.", "Omar", "#FFC9A9"], ["My kid steals my phone to press the bubbles.", "Ruth", "#B8F0D8"]].map(([q, n, c]) => (
          <div key={n} className="p-8" style={clay("#FFFFFF", 40)}><p className="text-2xl font-semibold leading-snug">“{q}”</p><div className="mt-6 flex items-center gap-3"><span className="h-12 w-12" style={clay(c, 999)} /><span className="text-lg font-semibold">{n}</span></div></div>
        ))}
      </section>
      <section className="mx-16 my-12 flex items-center justify-between p-12" style={clay("#CDB8FF", 48)}>
        <h2 className="text-5xl font-bold">Squeeze in a habit.</h2>
        <div className="flex gap-4">{["App Store", "Google Play"].map((s) => <motion.span key={s} whileTap={press} transition={{ type: "spring", stiffness: 400, damping: 9 }} className="px-7 py-4 text-lg font-semibold" style={clay("#FFFFFF", 999)}>{s}</motion.span>)}</div>
      </section>
      <footer className="flex justify-between px-16 py-12 text-lg font-semibold opacity-70"><span>vitals · made softly in Haifa</span><span>Privacy · Terms · hi@vitals.app</span></footer>
    </div>
  );
}
render(<Demo />);
`,
  },

  // ───────────────────────── 10. RISOGRAPH ZINE / CULTURAL EVENTS ─────────────────────────
  {
    title: "Overprint Zine Fair Website",
    category: WEBSITE,
    style: "Risograph Zine",
    description: "A loud cultural-event site printed in two riso inks: misregistered hero type that follows the cursor, a halftone program grid, exhibitor list and a ticket strip.",
    tags: ["Full Site", "Events", "Print", "Editorial"],
    prompt: {
      title: "Overprint Zine Fair Website",
      design: { name: "Risograph Zine", rules: ["Newsprint #F2EFE4, fluorescent pink #FF48B0, riso blue #0078BF; overlaps in multiply make purple.", "Halftone dots, deliberate 3–6px misregistration, grainy edges, stickers and staples.", "Archivo Black for display, Space Mono for program details."] },
      brief: "The website of an independent zine and print fair. Everything should look like it came off a Risograph that needs servicing, on purpose.",
      details: [
        "Nav: logo 'OVERPRINT' stamped, links Program / Exhibitors / Workshops / Visit, a ticket sticker.",
        "Hero: 'ZINE FAIR 07' in two overprinted ink layers, halftone circle, dates and venue.",
        "Program: grid of 6 event cards, each with a halftone color block, time, title and room.",
        "Exhibitors: a dense three-column list of 24 small presses with their city, in Space Mono.",
        "Workshop spotlight: big two-ink split block 'Learn to print in 3 hours' with a sign-up button.",
        "Tickets strip: three perforated ticket stubs (Day, Weekend, Supporter).",
        "Footer: credits 'Printed on a Riso MZ in Jaffa'.",
      ],
      interactions: [
        "Hero ink layers offset toward and away from the pointer (pink +8px, blue −6px) via springs.",
        "Program cards: on hover the two ink layers of the color block slide apart.",
        "Ticket stubs tear down slightly (rotate 2°, y 6px) on hover.",
      ],
    },
    previewCode: String.raw`
const blk = { fontFamily: "'Archivo Black', sans-serif" };
const mono = { fontFamily: "'Space Mono', monospace" };
const PINK = "#FF48B0", BLUE = "#0078BF";
const PROGRAM = [["10:00", "Opening & coffee", "Main hall"], ["11:30", "Comics without words", "Room B"], ["13:00", "Riso 101 workshop", "Print room"], ["14:30", "Panel: who reads zines?", "Main hall"], ["16:00", "Swap meet", "Courtyard"], ["18:00", "Night of tiny books", "Rooftop"]];
const PRESSES = ["Paper Tiger · Haifa", "Small Fires · Berlin", "Ink & Pulp · Jaffa", "Half Tone Club · Lisbon", "Staple Press · Leeds", "Lime Ink · Athens", "Bad Registration · Tel Aviv", "Grain · Vienna", "Two Colour Co. · Glasgow", "Cheap Thrills · Paris", "Fold Here · Brooklyn", "Tiny Fist · Oslo"];
function Halftone({ c, size }) {
  return <div className="absolute inset-0 mix-blend-multiply" style={{ backgroundImage: "radial-gradient(" + c + " 42%, transparent 44%)", backgroundSize: size + "px " + size + "px" }} />;
}
function Demo() {
  const mx = useSpring(0, { stiffness: 150, damping: 15 }), my = useSpring(0, { stiffness: 150, damping: 15 });
  const pX = useTransform(mx, (v) => v * 8), pY = useTransform(my, (v) => v * 8), bX = useTransform(mx, (v) => v * -6), bY = useTransform(my, (v) => v * -6);
  const title = <>ZINE<br />FAIR 07</>;
  return (
    <div className="w-full bg-[#F2EFE4] text-[#111]" style={mono}>
      <nav className="flex items-center justify-between border-b-2 border-[#111] px-12 py-5">
        <span className="relative text-3xl" style={blk}><span className="text-[#FF48B0] mix-blend-multiply">OVERPRINT</span><span className="absolute left-1 top-1 text-[#0078BF] mix-blend-multiply">OVERPRINT</span></span>
        <div className="flex gap-10 text-sm font-bold uppercase">{["Program", "Exhibitors", "Workshops", "Visit"].map((l) => <a key={l} href="#">{l}</a>)}</div>
        <span className="rotate-6 bg-[#FF48B0] px-4 py-2 text-sm font-bold uppercase text-white">Tickets ₪30</span>
      </nav>
      <section onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set(((e.clientX - r.left) / r.width) * 2 - 1); my.set(((e.clientY - r.top) / r.height) * 2 - 1); }} onPointerLeave={() => { mx.set(0); my.set(0); }} className="relative h-[620px] overflow-hidden px-12 pt-16">
        <div className="absolute right-16 top-16 h-[460px] w-[460px] overflow-hidden rounded-full"><Halftone c={BLUE} size={12} /></div>
        <div className="relative text-[11rem] leading-[0.85]" style={blk}>
          <motion.div style={{ x: pX, y: pY }} className="text-[#FF48B0] mix-blend-multiply">{title}</motion.div>
          <motion.div style={{ x: bX, y: bY }} className="absolute inset-0 text-[#0078BF] mix-blend-multiply">{title}</motion.div>
        </div>
        <div className="relative mt-10 flex gap-12 text-lg font-bold uppercase"><span>Nov 21–22 2026</span><span>Jaffa Port Hangar 2</span><span className="text-[#0078BF]">120 tables · free entry Sunday</span></div>
      </section>
      <section className="border-y-2 border-[#111] px-12 py-16">
        <h2 className="mb-10 text-6xl" style={blk}>PROGRAM <span className="text-[#FF48B0]">SAT</span></h2>
        <div className="grid grid-cols-3 gap-6">{PROGRAM.map(([t, n, r], i) => (
          <motion.div key={n} initial="rest" whileHover="hover" className="border-2 border-[#111] bg-[#F2EFE4]">
            <div className="relative h-40 overflow-hidden">
              <motion.div variants={{ rest: { x: 0 }, hover: { x: -10 } }} className="absolute inset-0"><Halftone c={PINK} size={8 + (i % 3) * 3} /></motion.div>
              <motion.div variants={{ rest: { x: 0 }, hover: { x: 10 } }} className="absolute inset-0" style={{ clipPath: i % 2 ? "circle(40% at 70% 50%)" : "polygon(0 0, 70% 0, 40% 100%, 0 100%)" }}><Halftone c={BLUE} size={7} /></motion.div>
            </div>
            <div className="border-t-2 border-[#111] p-4"><div className="flex justify-between text-sm font-bold"><span>{t}</span><span className="text-[#0078BF]">{r}</span></div><h3 className="mt-2 text-2xl leading-tight" style={blk}>{n}</h3></div>
          </motion.div>
        ))}</div>
      </section>
      <section className="grid grid-cols-12 gap-8 px-12 py-16">
        <h2 className="col-span-4 text-5xl leading-tight" style={blk}>120<br />SMALL<br /><span className="text-[#0078BF]">PRESSES</span></h2>
        <ul className="col-span-8 grid grid-cols-3 gap-x-8 gap-y-3 text-sm">{PRESSES.map((p) => <li key={p} className="border-b border-dashed border-[#111]/40 pb-2">{p}</li>)}<li className="font-bold text-[#FF48B0]">+108 more</li></ul>
      </section>
      <section className="relative mx-12 grid h-72 grid-cols-2 overflow-hidden border-2 border-[#111]">
        <div className="relative bg-[#FF48B0] p-10 text-white"><h2 className="text-6xl leading-none" style={blk}>LEARN TO<br />PRINT IN<br />3 HOURS</h2></div>
        <div className="relative p-10"><Halftone c={BLUE} size={10} /><div className="relative flex h-full flex-col justify-end gap-4"><p className="max-w-sm bg-[#F2EFE4] p-2 text-sm font-bold">Saturday 13:00, print room. Bring a drawing, leave with 50 copies. 12 places.</p><span className="w-fit bg-[#111] px-6 py-3 font-bold uppercase text-[#F2EFE4]">Sign up — ₪60</span></div></div>
      </section>
      <section className="grid grid-cols-3 gap-6 px-12 py-16">{[["Day ticket", "₪30", PINK], ["Weekend", "₪50", BLUE], ["Supporter + tote", "₪120", "#111"]].map(([n, p, c]) => (
        <motion.div key={n} whileHover={{ rotate: 2, y: 6 }} transition={{ type: "spring", stiffness: 300, damping: 15 }} className="flex border-2 border-[#111]">
          <div className="flex-1 p-6"><div className="text-sm font-bold uppercase">Admit one</div><div className="mt-2 text-3xl" style={blk}>{n}</div></div>
          <div className="flex w-28 items-center justify-center border-l-2 border-dashed border-[#111] text-3xl text-white" style={{ background: c, ...blk }}>{p}</div>
        </motion.div>
      ))}</section>
      <footer className="flex justify-between border-t-2 border-[#111] px-12 py-8 text-sm font-bold uppercase"><span>Printed on a Riso MZ in Jaffa</span><span className="text-[#FF48B0]">hello@overprint.fair</span></footer>
    </div>
  );
}
render(<Demo />);
`,
  },
];

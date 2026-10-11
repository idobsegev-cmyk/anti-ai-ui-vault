# Specimen Design Playbook

Rules for anyone (human or agent) designing for Specimen: the site itself and the designs in the library.
Terse on purpose. When a rule here conflicts with an explicit brief, the brief wins. When it conflicts with the
Specimen brand (docs/PROJECT-BRIEF.md section 4), the brand wins on the site; library designs may break the palette.

Sources (credit and read the originals):
- Emil Kowalski, design-engineering skill (MIT): https://www.ui-skills.com/skills/emilkowalski/emil-design-eng (source: https://github.com/emilkowalski/skills/tree/main/skills/emil-design-eng) and his course https://animations.dev
- Leon Lin, Taste Skill: https://github.com/Leonxlnx/taste-skill (skills/taste-skill/SKILL.md)
- Impeccable (Paul Bakaus): /polish, /distill, /clarify, /critique and its "craft floor"
- Impeccable site and docs: https://impeccable.style
- Rauno Freiberg, Web Interface Guidelines: https://interfaces.rauno.me and "Invisible Details of Interaction Design": https://rauno.me/craft/interaction-design
- Reference reel shown by @amichai.ai (Lando Norris site, before/after revenue widget, Taste Skill page, PRIMARY NODE page)

## 1. Before drawing anything

1. Write a one-line Design Read: audience, page kind, mood, one reference. ("Kids' parents on a phone at 7am, warm storybook, Maurice Sendak endpapers".) (Taste)
2. Commit to one world. Ask: what is the single thing someone screenshots? Design that moment first; everything else supports it. (Impeccable)
3. Pick light or dark from the use scene (who, where, what light), never from the category. (Impeccable)
4. Use the product's own language and real-sounding content: specific names, messy numbers (47.2%, ₪38, 06:40), local streets. No Acme, Jane Doe, 99.9%, "Elevate / Seamless / Unleash". (Taste 9.D)

## 2. Type

- One family per voice. Emphasis is weight or italic of the SAME family, not a random serif word dropped into a sans headline. (Taste 4.1; Specimen's own Instrument Serif italic is a brand exception.)
- Display max ~6rem on a 1280 canvas, tracking floor -0.04em, line-height 0.9-1.0 for display, 1.5-1.65 for body. Italic display with descenders (g y p j q) needs >= 1.1 line-height or it clips. (Impeccable, Taste)
- Headlines: max 2 lines in a hero, `text-wrap: balance`. Body measure 60-72ch. (Taste 4.7, Impeccable)
- Weight 500-600 for mid headings, nothing under 400 for text, never change weight on hover (layout shift). (Rauno)
- `font-variant-numeric: tabular-nums` for prices, times, counters, tables. (Rauno)
- Fluid size with `clamp()`, e.g. `clamp(2.75rem, 6vw, 5.5rem)`. (Rauno)
- Hebrew: no tracking, no uppercase, no italics; emphasis = light weight of the same face; line-height 1.1 display, 1.65 body.
- Fonts to retire as defaults: Inter, Fraunces, Instrument Serif (outside Specimen's own logo/brand), Playfair. Rotate instead.

## 3. Space and layout

- 4px base; working scale 4 8 12 16 24 32 48 64 96 128. More space above a heading than below it. Tight groups, generous separation. (Impeccable)
- Hero fits the first viewport: <= 4 text elements (optional label, headline, <= 20-word subline, 1 primary + 1 secondary CTA). Hero top padding <= 96px. (Taste 4.7)
- Nav: one line, 64-72px tall.
- At least 4 layout families on an 8-section page; never the same family twice; max 2 zig-zag image/text rows in a row. (Taste 4.7)
- Grids have exactly as many cells as content. No empty bento cell, no three identical icon+heading+text cards. (Taste, Impeccable)
- One corner-radius system per page (all sharp, all 12-16, or pill-for-controls) and keep it. (Taste 4.4)
- One accent per page, locked: the CTA in section 7 uses the same accent as the hero. (Taste 4.2)

## 4. Motion (numbers to copy)

Decide first whether it should animate at all (Emil):
- 100+ times a day (keyboard, command menus): no animation.
- Tens of times a day (hover, list nav): minimal or none.
- Occasional (modal, drawer, toast): standard.
- Rare (first visit, success): this is where delight goes.

Easing (Emil):
- Enter / exit: strong ease-out `cubic-bezier(0.23, 1, 0.32, 1)`.
- On-screen movement: ease-in-out `cubic-bezier(0.77, 0, 0.175, 1)`.
- Drawers/sheets: `cubic-bezier(0.32, 0.72, 0, 1)`.
- Never `ease-in` for UI. Linear only for constant motion (marquees, progress, hold-to-confirm).

Duration (Emil, Rauno):
- Press feedback 100-160ms; tooltip 125-200ms; dropdown 150-250ms; modal/drawer 200-500ms. UI under 300ms.
- Exit faster than enter (enter 300ms, exit ~180ms). Hold slow, release snappy (~200ms).
- Stagger 30-80ms per item; stagger never blocks interaction.

Springs (Emil):
- For drag, gestures, cursor-follow and anything interruptible. Apple-ish `{ type: "spring", duration: 0.5, bounce: 0.2 }`; bounce 0.1-0.3, zero in serious UI. Springs keep velocity on interruption; keyframes restart from zero.

Shapes of motion:
- Never enter from `scale(0)`: start at 0.95 + opacity 0 (dialogs ~0.9). Press `scale(0.97)`.
- Popovers scale from their trigger (`transform-origin` at the trigger); modals stay centred.
- Percentage translates (`translateY(100%)`) so motion adapts to element size.
- `clip-path: inset()` is the workhorse for reveals, comparison sliders, tab ink and hold-to-confirm. `inset(0 100% 0 0)` -> `inset(0)`.
- `filter: blur(2px)` hides an imperfect crossfade; keep blur < 20px.
- Animate transform, opacity, clip-path, filter only; never width/height/top/left. In Framer Motion prefer `transform` strings for heavy motion.
- One authored moment per page, not the same fade-up on every section. (Impeccable)
- No `window.addEventListener("scroll")` or scrollY in React state; use `useScroll` / `useInView` / CSS scroll timelines. (Taste 5.D)
- Pause loops off-screen. (Rauno)

Accessibility of motion:
- `prefers-reduced-motion`: remove movement, keep opacity and colour fades. Loops, parallax, cursor-follow collapse to static. (Emil, Taste 6.B)
- Hover effects behind `@media (hover: hover) and (pointer: fine)`. (Emil, Rauno)

## 5. Interaction details (Rauno, Emil)

- Feedback next to its trigger: inline check on copy, invalid field highlighted, not a far-away toast.
- Never `transition: all`; name the properties (`transition: transform 200ms ease-out`). (Emil)
- Tooltips: delay the first one, then skip delay and animation for neighbours while the group is open. (Emil)
- Disable transitions while switching light/dark; disable a submit button after the first press. (Rauno)
- `-webkit-font-smoothing: antialiased`, `-webkit-text-size-adjust: 100%`; `spellcheck`/`autocomplete` off on non-prose inputs. (Rauno)
- Gestures: respond immediately, commit on release; dismiss on velocity (> ~0.11 px/ms), damp past bounds instead of hard stops; pointer capture during drag.
- Interruptible everything: a hover-out mid-animation reverses from where it is.
- Focus rings via `box-shadow`/`outline-offset` that follow the radius; every control keyboard-reachable; icon-only buttons get `aria-label`.
- Inputs >= 16px on touch (no iOS zoom), label above input, never placeholder-as-label, `<form>` so Enter submits.
- No dead gaps between list items: pad the items, not the gaps.
- `::selection`, caret, scrollbars and underline offset are themed from the palette. The cheapest proof a page was built, not assembled. (Impeccable)
- `pointer-events: none` on decorative layers.

## 6. The tells of AI-generated design (refuse unless the brief earns it)

Visual:
- Purple/blue gradient glow, gradient text, neon outer glow, glassmorphism, blurred blobs behind a centred hero.
- Generic bento of cream cards with only text; three equal feature cards; hero-metric template (big number + small label x3).
- Div-built fake dashboards/terminals in the hero; fake version stamps ("v0.6.2", "last sync 4s ago").
- Pure #000 on #fff; untinted black shadows on light grounds (tint shadows to the ground).
- Hard offset shadows outside a world that chose them (Specimen's own brand did; most library designs did not).
- Decorative status dots on every row; hairline grids drawn only to "feel designed".
- Monospace as a costume. Use mono for data, code, measurements, times.
Typographic:
- An eyebrow above every heading. Max one small label per 3 sections; Impeccable bans them outright. Section numbers (01/02/03) only when sequence matters.
- Em-dash everywhere. Use a period, comma, colon or parentheses. Hyphen for ranges (07-19).
- Middle-dot chains ("foo · bar · baz · qux"). One per line, max.
Copy:
- "Field notes", "Quietly trusted by", "Scroll to explore", poetic labels, locale/weather strips, CTA synonyms (Contact / Let's talk / Get in touch on one page: pick one).

## 7. Library design recipe (Specimen full-site entries)

- Canvas is 1280px wide (SitePreview scales it). Design at that width; no responsive breakpoints needed inside previewCode, but nothing may overflow 1280.
- 6-8 sections, each a different layout family, one signature interaction, one secondary interaction, one scroll moment.
- Illustration is SVG or CSS, authored with a consistent stroke and a limited palette. No external images.
- Cursor-relative effects inside a scaled preview: compute `(clientX - rect.left) / (rect.width / el.offsetWidth)`.
- Fonts: add any new Google family to `PREVIEW_FONTS_URL` (src/lib/preview-fonts.js) and name it in the prompt with next/font/google.
- previewCode: no imports/exports, no backticks, ends with `render(<Demo />)`, nothing that focuses or scrolls the page, only globals in src/lib/live-scope.js.
- Prompt: the 5-part structure (CONCEPT, LAYOUT & CONTENT, INTERACTIONS & MOTION, DESIGN SYSTEM, CRAFT RULES + OUTPUT), with exact hexes, fonts, spring values and copy.

## 8. Techniques proven in the library (October 2026 set)

- Cursor lens (Noa Shiloh): a second, fully designed layer clipped by `circle(r at x y)` driven by springs; click locks it (`aria-pressed`). The hidden layer must be a different reading of the same scene (x-ray, data), not a recolour.
- Fake-3D product (Gat & Daughters): cylinder of 36 `rotateY(i*10deg) translateZ(R)` facets, each showing a shifted slice of one wide label; lighting is a fixed gradient overlay that does NOT rotate, so metal reads round while the label turns. Drag with pointer capture, release keeps measured velocity and decays (x0.94/frame).
- Light study (Kanso): pointer x maps to an hour; shadows are computed paths (`overhang * tan(altitude)`) via `useTransform`, and the hour label is a MotionValue rendered as a child, so no React re-render per frame.
- Network trace (Relay 9): SVG `<animateMotion>` packets on cubic cables; selecting a node draws its cable with `pathLength` 0 to 1 in 0.5s and updates a mono readout. Real buttons sit over the SVG for keyboard and screen readers.
- Storybook scene (Night Oven): 3-4 parallax depths on springs (stiffness 60, damping 18), loops with staggered durations (2.4-4.5s) so nothing pulses in sync; one toggle (the window light) as the hidden delight.
- Variable fonts: Google serves width axes as `font-stretch` ranges; set `font-stretch: 75%` (not only `font-variation-settings`) or condensed type silently renders wide.
- Library previews are scaled; give every page one interaction that still reads at 30% scale (big shapes, big type), because the card thumbnail is the first impression.

## 9. Review loop

1. Build fully. 2. One batched screenshot round: desktop 1440 + mobile 390. 3. Run an Impeccable critique and the checklist above. 4. Fix everything in one batch. 5. One confirming round, then stop. Watch motion at 2-5x slow-mo; review again with fresh eyes. (Impeccable, Emil)

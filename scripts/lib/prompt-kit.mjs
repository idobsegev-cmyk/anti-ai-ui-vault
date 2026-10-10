// Shared helpers for building vault entries (used by the seed and the daily generator).

export const CATEGORIES = [
  "Editorial Hero Sections",
  "Bento Feature Grids",
  "Tactile Micro-Interaction Buttons",
  "Kinetic Typography Banners",
  "Parallax/3D Interactive Cards",
  "Dynamic Accordions",
  "Animated Navigation Bars",
  "Interactive Forms",
];

export const STYLE_GUARDRAILS = `
DESIGN SYSTEM (non-negotiable):
- Palette: paper background #FAF9F6, deep charcoal #121212 for text and 1px borders, ONE human accent: cobalt #1D4ED8 or terracotta #D9534F. Secondary surface #F2EFE8.
- Typography: Swiss / editorial. A tight grotesk for UI (Instrument Sans, Inter Tight or similar) with negative tracking on display sizes; an italic serif (Instrument Serif) used sparingly for one emphasized word.
- NO dark-mode neon, NO glow, NO glassmorphism, NO backdrop blur, NO purple-to-blue gradients, NO emoji icons. Solid fills, hairline rules, honest shadows (hard offset or none).
- Motion: Framer Motion with spring physics (type: "spring", stiffness 300-500, damping 20-35). Animate transform and opacity only. Respect prefers-reduced-motion via useReducedMotion().
- Icons: lucide-react, 1.5px stroke.
- Accessibility: real <button>/<a>/<label> elements, visible focus ring (2px cobalt, 3px offset), keyboard operable, aria attributes where state changes.

OUTPUT: one self-contained React component file (Tailwind CSS v4 utility classes, framer-motion, lucide-react), no external images, default export, ready to paste into a Next.js App Router page with "use client".`.trim();

export function buildPrompt({ title, brief, details, interactions }) {
  return [
    `Build a "${title}" React component.`,
    "",
    `CONCEPT: ${brief}`,
    "",
    "LAYOUT & CONTENT:",
    ...details.map((d) => `- ${d}`),
    "",
    "INTERACTIONS & MOTION:",
    ...interactions.map((d) => `- ${d}`),
    "",
    STYLE_GUARDRAILS,
  ].join("\n");
}

export function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function finalize(list, startIndex = 1) {
  return list.map((item, i) => {
    const slug = item.slug || slugify(item.title);
    return {
      id: item.id || `vault-${String(startIndex + i).padStart(3, "0")}`,
      slug,
      title: item.title,
      category: item.category,
      description: item.description,
      tags: item.tags,
      claudePrompt: buildPrompt(item.prompt),
      previewCode: item.previewCode.trim(),
      addedAt: item.addedAt || "2026-10-10",
    };
  });
}

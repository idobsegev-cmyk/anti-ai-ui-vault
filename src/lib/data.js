import prompts from "@/data/prompts.json";
import HE from "@/data/he.json";
import { CATEGORY_HE, STYLE_HE } from "./labels";

export const WEBSITE = "Full Website Designs";

export const CATEGORY_ORDER = [
  "Full Website Designs",
  "Editorial Hero Sections",
  "Bento Feature Grids",
  "Tactile Micro-Interaction Buttons",
  "Kinetic Typography Banners",
  "Parallax/3D Interactive Cards",
  "Dynamic Accordions",
  "Animated Navigation Bars",
  "Interactive Forms",
];

export function getAll() {
  return prompts;
}

export function getBySlug(slug) {
  return prompts.find((p) => p.slug === slug) || null;
}

export function getCategories() {
  const present = new Set(prompts.map((p) => p.category));
  const ordered = CATEGORY_ORDER.filter((c) => present.has(c));
  const extra = [...present].filter((c) => !CATEGORY_ORDER.includes(c));
  return [...ordered, ...extra];
}

export function getRelated(item, n = 3) {
  return prompts.filter((p) => p.category === item.category && p.slug !== item.slug).slice(0, n);
}

export function shortCategory(c) {
  return {
    "Full Website Designs": "Websites",
    "Editorial Hero Sections": "Heroes",
    "Bento Feature Grids": "Bento",
    "Tactile Micro-Interaction Buttons": "Buttons",
    "Kinetic Typography Banners": "Kinetic Type",
    "Parallax/3D Interactive Cards": "3D Cards",
    "Dynamic Accordions": "Accordions",
    "Animated Navigation Bars": "Navigation",
    "Interactive Forms": "Forms",
  }[c] || c;
}

// Small, legible-when-tiny pieces: each slot rotates through its own list.
export const STRIP_SLUGS = [
  ["squish-press-button", "split-flap-headline", "clay-inflate-buttons", "holo-chrome-card", "hold-to-confirm-button", "wave-letter-hover-banner"],
  ["elastic-toggle-switch", "magnifying-dock-bar", "pixel-arcade-start-button", "specimen-flip-card", "spring-budget-slider", "bauhaus-geometry-hero"],
  ["paper-confetti-like-button", "sliding-pill-navigation", "memphis-squiggle-buttons", "typewriter-otp-input", "copy-button-morph", "swiss-grid-index-nav"],
];


export function getStrip() {
  return STRIP_SLUGS.map((list) => list.map(getBySlug).filter(Boolean));
}

/** Title and description in the page language. Hebrew falls back to a generated line for new daily items. */
export function localize(item, lang) {
  if (lang !== "he") return { title: item.title, description: item.description };
  const he = HE[item.slug];
  if (he) return { title: he[0], description: he[1] };
  const cat = CATEGORY_HE[item.category] || item.category;
  const sty = STYLE_HE[item.style || "Warm Editorial"] || item.style;
  return { title: item.title, description: `${cat} בסגנון ${sty}, עם תצוגה חיה, קוד React ופרומפט מוכן ל-Claude.` };
}

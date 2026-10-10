import prompts from "@/data/prompts.json";

export const CATEGORY_ORDER = [
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

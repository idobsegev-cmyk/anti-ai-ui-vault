// A design's own colors, read from its preview code: used for the poster a window shows before (or instead of) its live preview.

function lum(hex) {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

const contrast = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

/** { bg, fg, accent } from the most used hex colors in the code; brand colors when there are none. */
export function sitePalette(code = "") {
  const counts = {};
  for (const m of code.matchAll(/#([0-9a-fA-F]{6})\b/g)) {
    const h = "#" + m[1].toLowerCase();
    counts[h] = (counts[h] || 0) + 1;
  }
  const list = Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([h]) => h);
  if (list.length < 2) return { bg: "#121212", fg: "#faf9f6", accent: "#d9534f" };
  const bg = list[0];
  const fg = [...list.slice(1), "#121212", "#faf9f6"].reduce((best, h) => (contrast(h, bg) > contrast(best, bg) ? h : best), list[1]);
  const accent = list.find((h) => h !== bg && h !== fg && contrast(h, bg) > 1.6) || fg;
  return { bg, fg, accent };
}

/** "ostro-racing-team-website" -> "ostro-racing.site" */
export function siteHost(slug) {
  return slug.split("-").slice(0, 2).join("-") + ".site";
}

/** Stable small numbers per slug, so each window keeps its own personality between renders. */
export function seeded(slug, salt = 0) {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < slug.length; i++) h = Math.imul(h ^ slug.charCodeAt(i), 16777619);
  return ((h >>> 0) % 10000) / 10000;
}

/** "Gat & Daughters Olive Oil Website" -> "Gat & Daughters": the business name reads the same in both languages. */
export function brandOf(title) {
  const words = title.split(" ");
  const tail = /^(Website|Site|Landing|Page|Olive|Oil|IT|Networks|Athlete|Bakery|Architects|Hotel|Agency|Studio|Festival|Game|Shop|SaaS|Habit|App|Launch|Drop|Team|Charter|Academy|Night|Fair|Clinic|Firm|Law|Winery|Ceramics|Physiotherapy|Matchday|Racing|Flight|Sneaker|Techno|Esports|Arcade|Hoops|Skincare|Zine)$/i;
  while (words.length > 1 && tail.test(words[words.length - 1])) words.pop();
  return words.join(" ");
}

// Builds src/data/prompts.json from the hand-written seed files.
// Run once: `npm run seed`. Daily additions are appended by generate-daily-components.mjs.
import { writeFileSync } from "node:fs";
import { finalize } from "./lib/prompt-kit.mjs";
import part1 from "./seed/part1.mjs";
import part2 from "./seed/part2.mjs";
import part3 from "./seed/part3.mjs";

const items = finalize([...part1, ...part2, ...part3]);
const slugs = new Set();
for (const it of items) {
  if (slugs.has(it.slug)) throw new Error("Duplicate slug " + it.slug);
  slugs.add(it.slug);
}
writeFileSync(new URL("../src/data/prompts.json", import.meta.url), JSON.stringify(items, null, 2) + "\n");
console.log(`Wrote ${items.length} components.`);

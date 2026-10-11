// Splits a library prompt (CONCEPT / LAYOUT & CONTENT / INTERACTIONS & MOTION / DESIGN SYSTEM / CRAFT RULES)
// into its parts, so the UI can show "the prompt behind what you see".

const HEADS = [
  ["concept", /^CONCEPT:\s*/],
  ["layout", /^LAYOUT & CONTENT:\s*/],
  ["motion", /^INTERACTIONS & MOTION:\s*/],
  ["system", /^DESIGN SYSTEM\b[^:]*:\s*/],
  ["tin", /^THE TIN[^:]*:\s*/],
  ["craft", /^CRAFT RULES:\s*/],
  ["output", /^OUTPUT:\s*/],
];

export function promptParts(prompt = "") {
  const out = { concept: "", layout: [], motion: [], system: [], craft: [], systemName: "" };
  let cur = null;
  for (const raw of prompt.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const head = HEADS.find(([, re]) => re.test(line));
    if (head) {
      cur = head[0] === "tin" ? "motion" : head[0];
      if (cur === "system") out.systemName = (line.match(/DESIGN SYSTEM\s*[—-]\s*([^:]+):/) || [])[1] || "";
      const rest = line.replace(head[1], "");
      if (cur === "concept") out.concept = rest;
      else if (rest && Array.isArray(out[cur])) out[cur].push(rest);
      continue;
    }
    if (!cur || cur === "output") continue;
    const text = line.replace(/^-\s*/, "");
    if (cur === "concept") out.concept += (out.concept ? " " : "") + text;
    else if (Array.isArray(out[cur])) out[cur].push(text);
  }
  return out;
}

/** "Hero (760px): ..." -> "Hero" */
export function bulletHead(b) {
  const m = b.match(/^([^:(]{2,40})(?:\([^)]*\))?:/);
  return m ? m[1].trim() : "";
}

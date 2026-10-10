// Compiles and server-renders every previewCode so a broken snippet never ships.
// Usage: node scripts/check-previews.mjs [path/to/prompts.json]
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { transform } from "sucrase";

const require = createRequire(import.meta.url);
const React = require("react");
const { renderToString } = require("react-dom/server");
const fm = require("framer-motion");
const L = require("lucide-react");

const src = new URL("../src/lib/live-scope.js", import.meta.url);
const text = readFileSync(src, "utf8");
const iconNames = text.match(/export const icons = \{([\s\S]*?)\};/)[1].split(/[\s,]+/).filter(Boolean);
const fmNames = text.match(/from "framer-motion";/) && text.match(/import \{([\s\S]*?)\} from "framer-motion"/)[1].split(/[\s,]+/).filter(Boolean);

const scope = {
  React, useState: React.useState, useEffect: React.useEffect, useRef: React.useRef, useMemo: React.useMemo,
  useCallback: React.useCallback, useId: React.useId, useLayoutEffect: React.useLayoutEffect,
};
for (const n of fmNames) scope[n] = fm[n];
for (const n of iconNames) {
  if (!L[n]) throw new Error("Unknown icon in scope: " + n);
  scope[n] = L[n];
}

export function checkItem(item) {
  const code = transform(item.previewCode, { transforms: ["jsx"], production: true }).code;
  let el = null;
  const render = (e) => (el = e);
  const fn = new Function(...Object.keys(scope), "render", code);
  fn(...Object.values(scope), render);
  if (!el) throw new Error("previewCode never called render()");
  renderToString(el);
  return true;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const file = process.argv[2] || new URL("../src/data/prompts.json", import.meta.url);
  const items = JSON.parse(readFileSync(file, "utf8"));
  let bad = 0;
  for (const it of items) {
    try { checkItem(it); } catch (e) { bad++; console.error(`✗ ${it.slug}: ${e.message}`); }
  }
  console.log(`${items.length - bad}/${items.length} previews compile and render.`);
  process.exit(bad ? 1 : 0);
}

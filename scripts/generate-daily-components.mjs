#!/usr/bin/env node
// Daily vault update: appends 3–5 new animated components to src/data/prompts.json.
//
// Two engines:
//   • Claude (when ANTHROPIC_API_KEY is set): asks Claude for brand-new components in the vault schema.
//   • Offline (always available): combines component families × business verticals from scripts/lib/templates.mjs.
// Every candidate is compiled and server-rendered before it is accepted (scripts/check-previews.mjs),
// so a bad snippet can never break the site build. Claude output that fails falls back to offline items.
//
// Env:
//   ANTHROPIC_API_KEY   optional — enables the Claude engine
//   CLAUDE_MODEL        optional — default "claude-sonnet-5-5"
//   VAULT_FORCE=1       ignore the campaign window in scripts/daily-config.json
//   VAULT_DATE=YYYY-MM-DD  pretend today is this date (testing)
//   VAULT_DRY_RUN=1     print what would be added, write nothing

import { readFileSync, writeFileSync } from "node:fs";
import { buildPrompt, CATEGORIES, slugify, STYLE_GUARDRAILS } from "./lib/prompt-kit.mjs";
import { FAMILIES, VERTICALS } from "./lib/templates.mjs";
import { checkItem } from "./check-previews.mjs";

const DATA = new URL("../src/data/prompts.json", import.meta.url);
const CONFIG = JSON.parse(readFileSync(new URL("./daily-config.json", import.meta.url), "utf8"));

const today = process.env.VAULT_DATE || new Date().toISOString().slice(0, 10);
const force = process.env.VAULT_FORCE === "1";
const dry = process.env.VAULT_DRY_RUN === "1";

function log(...a) {
  console.log("[vault]", ...a);
}

// ── Deterministic RNG seeded by date, so reruns on the same day pick the same items ──
function rng(seedStr) {
  let h = 2166136261;
  for (const c of seedStr) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(arr, rand) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function nextId(items) {
  const max = items.reduce((m, it) => Math.max(m, parseInt(String(it.id).replace(/\D/g, ""), 10) || 0), 0);
  let n = max;
  return () => `vault-${String(++n).padStart(3, "0")}`;
}

function accept(candidate, existingSlugs) {
  if (!candidate || existingSlugs.has(candidate.slug)) return false;
  for (const k of ["title", "category", "description", "claudePrompt", "previewCode"]) {
    if (typeof candidate[k] !== "string" || candidate[k].length < 10) return false;
  }
  if (!Array.isArray(candidate.tags) || candidate.tags.length === 0) return false;
  if (candidate.previewCode.includes("`") || /\bimport\s/.test(candidate.previewCode)) return false;
  try {
    checkItem(candidate);
    return true;
  } catch (e) {
    log(`rejected "${candidate.title}": ${e.message}`);
    return false;
  }
}

// ── Offline engine ──
function offlineCandidates(rand, existing) {
  const combos = [];
  for (const f of FAMILIES) for (const v of VERTICALS) combos.push([f, v]);
  const pool = shuffle(combos, rand);
  // Prefer categories that appeared least recently / least often so the vault stays balanced
  const counts = Object.fromEntries(CATEGORIES.map((c) => [c, existing.filter((e) => e.category === c).length]));
  const usedVerticals = new Set(existing.map((e) => e.tags[e.tags.length - 1]));
  pool.sort((a, b) => counts[a[0].category] - counts[b[0].category] || usedVerticals.has(a[1].name) - usedVerticals.has(b[1].name));
  return pool.map(([f, v]) => {
    const title = f.title(v);
    const p = f.prompt(v);
    return {
      slug: slugify(title),
      title,
      category: f.category,
      description: f.description(v),
      style: "Warm Editorial",
      tags: f.tags(v),
      claudePrompt: buildPrompt({ title, brief: p.brief, details: p.details, interactions: p.interactions }),
      previewCode: f.code(v).trim(),
      source: "offline",
    };
  });
}

// ── Claude engine ──
async function claudeCandidates(n, existing) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return [];
  const model = process.env.CLAUDE_MODEL || "claude-sonnet-5-5";
  const existingTitles = existing.map((e) => e.title).join("; ");
  const example = existing.find((e) => e.slug === "squish-press-button") || existing[0];

  const system = `You design animated React UI components for "Specimen", a design specimen book: warm editorial, Swiss typography, human and tactile. ${STYLE_GUARDRAILS}`;
  const user = `Create ${n} NEW components (not variations of: ${existingTitles}).
Spread them across these categories: ${CATEGORIES.join(", ")}.
Give each one a DIFFERENT, clearly recognizable design language (e.g. Neo-Brutalist, Bauhaus, Swiss International, Memphis 90s, Retro 70s, Luxury Noir, Japanese Minimal, Y2K Chrome, Retro OS, Claymorphism, Risograph Zine, Organic Earth, Art Deco, 8-bit Arcade, Mono Data, or a new one) and name it in a "style" field. Google Fonts available in previews: Archivo Black, Space Mono, Syne, Fredoka, Shrikhand, DM Serif Display, DM Sans, Noto Serif JP, Pixelify Sans, Poiret One, Press Start 2P, IBM Plex Mono, Inter Tight, Bodoni Moda.

Return ONLY a JSON array. Each element:
{"title": string, "category": one of the categories above, "style": string, "palette_and_type": string[] (3 rules describing the design language), "description": 1-2 sentences, "tags": 3-5 strings,
 "brief": string, "details": string[], "interactions": string[], "previewCode": string}

previewCode rules (it runs in react-live with noInline):
- No import/export statements. No backtick characters anywhere. No template literals.
- Globals available: React, useState, useEffect, useRef, useMemo, useCallback, useId, motion, AnimatePresence, LayoutGroup,
  animate, useAnimate, useAnimationFrame, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll,
  useSpring, useTransform, useVelocity, and lucide icons: ArrowLeft ArrowRight ArrowUpRight Bell Bookmark Calendar Check
  ChevronDown ChevronRight Circle Clock Coffee Command Compass Copy Eye Feather Folder Globe Grid3x3 Hand Heart Home Image
  Inbox Layers Leaf Lock Mail MapPin Menu Minus Moon MousePointer2 Music Pause PenTool Play Plus Search Send Settings
  ShoppingBag Sparkle Square Star Sun Triangle Type User X Zap.
- Define function Demo() and end with: render(<Demo />);
- Root element fills its box: className includes "h-full w-full". Designed for a ~520x390 box.
- Tailwind classes with hex arbitrary values only (e.g. bg-[#FAF9F6], text-[#121212]). Set fonts with style={{ fontFamily: "'Font Name', fallback" }}.
- No window/document access during render (only inside effects/handlers). No external images or fetches.

Here is one existing component's previewCode as a style reference:
${example.previewCode}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model, max_tokens: 16000, system, messages: [{ role: "user", content: user }] }),
    });
    if (!res.ok) {
      log(`Claude API ${res.status}: ${(await res.text()).slice(0, 300)}`);
      return [];
    }
    const data = await res.json();
    const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
    const json = text.slice(text.indexOf("["), text.lastIndexOf("]") + 1);
    const arr = JSON.parse(json);
    return arr.map((c) => ({
      slug: slugify(c.title || ""),
      title: c.title,
      category: CATEGORIES.includes(c.category) ? c.category : CATEGORIES[0],
      description: c.description,
      style: typeof c.style === "string" ? c.style.slice(0, 40) : "Warm Editorial",
      tags: Array.isArray(c.tags) ? c.tags.slice(0, 5) : [],
      claudePrompt: buildPrompt({ title: c.title, brief: c.brief || c.description, details: c.details || [], interactions: c.interactions || [], design: Array.isArray(c.palette_and_type) && c.style ? { name: c.style, rules: c.palette_and_type } : undefined }),
      previewCode: String(c.previewCode || "").trim(),
      source: "claude",
    }));
  } catch (e) {
    log("Claude engine failed, falling back to offline:", e.message);
    return [];
  }
}

async function main() {
  if (!force && (today < CONFIG.startDate || today > CONFIG.endDate)) {
    log(`${today} is outside the campaign window ${CONFIG.startDate} → ${CONFIG.endDate}. Nothing to do.`);
    return;
  }

  const items = JSON.parse(readFileSync(DATA, "utf8"));
  if (items.some((i) => i.addedAt === today) && !force) {
    log(`Components for ${today} already exist. Nothing to do.`);
    return;
  }

  const rand = rng(`vault-${today}`);
  const n = CONFIG.perDayMin + Math.floor(rand() * (CONFIG.perDayMax - CONFIG.perDayMin + 1));
  const slugs = new Set(items.map((i) => i.slug));
  const newId = nextId(items);
  const added = [];

  const tryAdd = (c) => {
    if (added.length >= n) return;
    if (accept(c, slugs)) {
      slugs.add(c.slug);
      const { source, ...rest } = c;
      added.push({ id: newId(), ...rest, addedAt: today });
      log(`+ [${source}] ${c.title}`);
    }
  };

  for (const c of await claudeCandidates(n, items)) tryAdd(c);
  // Offline: one component per category per day, least-filled categories first.
  const pool = offlineCandidates(rand, items);
  for (const c of pool) {
    if (added.length >= n) break;
    if (added.some((a) => a.category === c.category)) continue;
    tryAdd(c);
  }

  if (added.length === 0) {
    log("No new components could be produced (offline pool exhausted?).");
    return;
  }

  if (dry) {
    log(`Dry run — would add ${added.length} components for ${today}.`);
    return;
  }

  writeFileSync(DATA, JSON.stringify([...items, ...added], null, 2) + "\n");
  log(`Added ${added.length} components for ${today}. Specimen now has ${items.length + added.length}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

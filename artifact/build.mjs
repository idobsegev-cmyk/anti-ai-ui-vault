// Builds dist/anti-ai-ui-vault.html: the whole site as one self-contained page (for Claude Artifacts).
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "dist");
mkdirSync(out, { recursive: true });

const js = await build({
  entryPoints: [path.join(root, "artifact/App.jsx")],
  bundle: true,
  minify: true,
  format: "iife",
  target: "es2020",
  jsx: "automatic",
  write: false,
  alias: { "next/link": path.join(root, "artifact/shims/link.jsx"), "next/navigation": path.join(root, "artifact/shims/navigation.js"), "@": path.join(root, "src") },
  loader: { ".js": "jsx" },
  define: {
    "process.env.NODE_ENV": '"production"',
    "process.env.NEXT_PUBLIC_REPO_URL": '"https://github.com/idobsegev-cmyk/anti-ai-ui-vault"',
    "process.env.NEXT_PUBLIC_SITE_URL": '""',
    "process.env.VERCEL_PROJECT_PRODUCTION_URL": '""',
    "process.env.VERCEL_URL": '""',
    "process.env.VERCEL_GIT_REPO_OWNER": '""',
    "process.env.VERCEL_GIT_REPO_SLUG": '""',
  },
  legalComments: "none",
});
const bundle = js.outputFiles[0].text.replace(/<\/script/gi, "<\\/script");

const cssFile = path.join(out, "artifact.css");
execFileSync("npx", ["@tailwindcss/cli", "-i", path.join(root, "artifact/styles.css"), "-o", cssFile, "--minify"], { cwd: root, stdio: "inherit" });
const css = readFileSync(cssFile, "utf8");

const [FONTS, HE_FONTS] = [...readFileSync(path.join(root, "src/lib/preview-fonts.js"), "utf8").matchAll(/"(https:[^"]+)"/g)].map((m) => m[1]);
const html = `<title>Specimen Design</title>
<meta name="description" content="Animated, human-feeling UI components with copy-ready Claude prompts.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400..700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;700&family=Bricolage+Grotesque:opsz,wght@12..96,800&family=Caveat:wght@700&family=Bagel+Fat+One&family=Unbounded:wght@300&family=Bodoni+Moda:ital,opsz,wght@1,6..96,500&family=Anton&family=Fraunces:opsz,wght,SOFT,WONK@9..144,600,100,1&display=swap">
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="${HE_FONTS}">
<style>${css}</style>
<div id="root"></div>
<script>${bundle}</script>
`;
writeFileSync(path.join(out, "anti-ai-ui-vault.html"), html);
console.log(`dist/anti-ai-ui-vault.html  ${(html.length / 1024).toFixed(0)} KB`);

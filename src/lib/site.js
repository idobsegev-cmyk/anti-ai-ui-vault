export const SITE = {
  name: "Anti-AI UI Vault",
  nameHe: "מבצר העיצוב",
  tagline: "Build websites that feel alive & human.",
  description:
    "A free vault of hand-tuned, animated React components — editorial heroes, bento grids, tactile buttons, kinetic type — each with a copy-ready Claude prompt and live preview. No neon, no glassmorphism, no template look.",
  author: "Ido Segev",
  locale: "en_US",
};

export function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const prod = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (prod) return `https://${prod}`;
  const preview = process.env.VERCEL_URL;
  if (preview) return `https://${preview}`;
  return "http://localhost:3000";
}

export function repoUrl() {
  if (process.env.NEXT_PUBLIC_REPO_URL) return process.env.NEXT_PUBLIC_REPO_URL;
  const owner = process.env.VERCEL_GIT_REPO_OWNER;
  const slug = process.env.VERCEL_GIT_REPO_SLUG;
  return owner && slug ? `https://github.com/${owner}/${slug}` : null;
}

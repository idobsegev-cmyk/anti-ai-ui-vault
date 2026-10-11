export const SITE = {
  name: "Specimen Design",
  nameHe: "דוגמית עיצוב",
  tagline: "Start from a real design, not a blank page.",
  description:
    "A free library of full website designs and animated components. Each has a live preview and the exact Claude prompt used to make it, and new ones land daily. Copy one, or hire the studio to turn it into your business site.",
  author: "Ido Segev",
  instagram: "https://www.instagram.com/specimen.design/",
  instagramHandle: "@specimen.design",
  locale: "en_US",
};

export const PRODUCTION_URL = "https://specimen-designs.vercel.app";

export function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_ENV === "production") return PRODUCTION_URL;
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

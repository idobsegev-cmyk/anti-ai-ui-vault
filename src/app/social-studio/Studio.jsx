"use client";

import Live from "./Live";
import { bySlug } from "./Kit";
import { ReelScenes, ReelSites } from "./Reels";
import { Slides } from "./Slides";

export default function Studio({ template, q }) {
  if (template === "bare") {
    const item = bySlug[q.slug];
    const w = Number(q.w || 1280);
    const h = q.h ? Number(q.h) : undefined;
    return <Live item={item} w={w} h={h} box={Number(q.box || w)} />;
  }
  if (template === "reel-sites") return <ReelSites q={q} />;
  if (template === "reel-press") return <ReelScenes q={q} set="press" />;
  if (template === "reel-type") return <ReelScenes q={q} set="type" />;
  if (template === "slide") return <Slides q={q} />;
  return <div>unknown template</div>;
}

import { ImageResponse } from "next/og";
import { OgCard } from "@/lib/og";
import { getAll, getBySlug } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Component preview card";

export function generateStaticParams() {
  return getAll().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const item = getBySlug(slug);
  return new ImageResponse(<OgCard kicker={item?.category || "Component"} title={item?.title || "Component"} foot="Live preview · Claude prompt · React + Framer Motion" />, size);
}

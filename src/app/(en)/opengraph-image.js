import { ImageResponse } from "next/og";
import { OgCard } from "@/lib/og";
import { getSites } from "@/lib/data";

export const alt = "Specimen Design — Start from a real design, not a blank page";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<OgCard kicker="Issue Nº 01" title="Start From A Real Design, Not A Blank Page." foot={`${getSites().length} website designs · live previews · the exact Claude prompts`} />, size);
}

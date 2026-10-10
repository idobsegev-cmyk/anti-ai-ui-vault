import { ImageResponse } from "next/og";
import { OgCard } from "@/lib/og";
import { getAll } from "@/lib/data";

export const alt = "Specimen — Build websites that feel alive & human";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<OgCard kicker="Issue Nº 01" title="Build Websites That Feel Alive & Human." foot={`${getAll().length} animated components · copy-ready Claude prompts`} />, size);
}

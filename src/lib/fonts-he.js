import { Frank_Ruhl_Libre, IBM_Plex_Sans_Hebrew } from "next/font/google";

// Hebrew type roles, self-hosted with size-matched fallbacks so text does not reflow when they arrive.
// IBM Plex Sans Hebrew carries the interface and headlines; Frank Ruhl Libre is the editorial serif.
// Imported only by the Hebrew layout, so English pages never download them.
const plex = IBM_Plex_Sans_Hebrew({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-he",
  display: "swap",
});
const frank = Frank_Ruhl_Libre({ subsets: ["hebrew", "latin"], variable: "--font-frank", display: "swap" });

export const hebrewFontClasses = [plex, frank].map((f) => f.variable).join(" ");

import { Frank_Ruhl_Libre, Heebo, IBM_Plex_Sans_Hebrew } from "next/font/google";

// Hebrew UI faces, self-hosted with size-matched fallbacks so text does not reflow when they arrive.
// Imported only by the Hebrew layout, so English pages never download them.
const heebo = Heebo({ subsets: ["hebrew", "latin"], variable: "--font-heebo", display: "swap" });
const frank = Frank_Ruhl_Libre({ subsets: ["hebrew", "latin"], variable: "--font-frank", display: "swap" });
const plex = IBM_Plex_Sans_Hebrew({ subsets: ["hebrew", "latin"], weight: ["400", "500"], variable: "--font-plex-he", display: "swap" });

export const hebrewFontClasses = [heebo, frank, plex].map((f) => f.variable).join(" ");

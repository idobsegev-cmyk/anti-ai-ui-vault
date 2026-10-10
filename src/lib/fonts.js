import { Anton, Bagel_Fat_One, Bodoni_Moda, Bricolage_Grotesque, Caveat, Fraunces, Instrument_Sans, Instrument_Serif, JetBrains_Mono, Unbounded } from "next/font/google";

const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument-sans", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument-serif", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
// Display faces for the hero's rotating adjective (each word gets its own voice)
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], display: "swap", preload: false, weight: "800", variable: "--font-bricolage" });
const caveat = Caveat({ subsets: ["latin"], display: "swap", preload: false, weight: "700", variable: "--font-caveat" });
const bagel = Bagel_Fat_One({ subsets: ["latin"], display: "swap", preload: false, weight: "400", variable: "--font-bagel" });
const unbounded = Unbounded({ subsets: ["latin"], display: "swap", preload: false, weight: "300", variable: "--font-unbounded" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], display: "swap", preload: false, weight: "500", style: "italic", variable: "--font-bodoni" });
const anton = Anton({ subsets: ["latin"], display: "swap", preload: false, weight: "400", variable: "--font-anton" });
const fraunces = Fraunces({ subsets: ["latin"], display: "swap", preload: false, axes: ["SOFT", "WONK"], variable: "--font-fraunces" });

export const fontClasses = [sans, serif, mono, bricolage, caveat, bagel, unbounded, bodoni, anton, fraunces].map((f) => f.variable).join(" ");

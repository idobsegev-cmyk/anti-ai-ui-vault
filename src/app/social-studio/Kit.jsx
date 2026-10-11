"use client";

import { motion } from "framer-motion";
import data from "@/data/prompts.json";

export const bySlug = Object.fromEntries(data.map((d) => [d.slug, d]));
export const URL = "specimen-designs.vercel.app";
export const spring = { type: "spring", stiffness: 170, damping: 22 };

export function Logo({ dark = false, h = 26 }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/brand/specimen-design-logo-${dark ? "dark" : "light"}.svg`} alt="" style={{ height: h, width: "auto", display: "block" }} />;
}

export function Top({ label, dark = false, h = 40, pad = 22 }) {
  return (
    <div style={{ position: "absolute", left: pad, right: pad, top: pad, display: "flex", alignItems: "flex-start", justifyContent: "space-between", zIndex: 5 }}>
      <Logo dark={dark} h={h} />
      {label && (
        <div className="mono" style={{ color: dark ? "#b9b4aa" : "#6f6c66", marginTop: 10 }}>
          {label}
        </div>
      )}
    </div>
  );
}

export function Bottom({ left, dark = false, pad = 28, url = true }) {
  return (
    <div style={{ position: "absolute", left: pad, right: pad, bottom: pad - 4, display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${dark ? "#3a3a38" : "#121212"}`, paddingTop: 10, zIndex: 5 }}>
      <div className="mono" style={{ color: dark ? "#b9b4aa" : "#3a3a38" }}>{left}</div>
      {url && <div className="mono" style={{ color: dark ? "#faf9f6" : "#121212", fontWeight: 600 }}>{URL}</div>}
    </div>
  );
}

export function Frame({ children, url = URL, style, dark = false }) {
  return (
    <div className="frame" style={{ overflow: "hidden", ...(dark ? { borderColor: "#faf9f6", boxShadow: "5px 5px 0 #d9534f" } : null), ...style }}>
      <div className="chrome">
        <i />
        <i />
        <i />
        <span>{url}</span>
      </div>
      {children}
    </div>
  );
}

/** A line of display type that springs up from under a mask. */
export function Rise({ children, delay = 0, style, className = "" }) {
  return (
    <div style={{ overflow: "hidden", paddingBottom: "0.08em", marginBottom: "-0.08em" }}>
      <motion.div className={className} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ ...spring, delay }} style={style}>
        {children}
      </motion.div>
    </div>
  );
}

export function Fade({ children, delay = 0, style, y = 10 }) {
  return (
    <motion.div initial={{ opacity: 0, y }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay }} style={style}>
      {children}
    </motion.div>
  );
}

export function Cursor() {
  return (
    <div id="studio-cursor" style={{ position: "fixed", left: -40, top: -40, zIndex: 50, pointerEvents: "none", transform: "translate(-3px,-2px)" }}>
      <svg width="22" height="26" viewBox="0 0 22 26">
        <path d="M2 2 L2 21 L7.5 16.5 L11 24 L14.5 22.5 L11 15 L18 15 Z" fill="#121212" stroke="#faf9f6" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export const SITES = [
  ["nocturne-hotel-website", "Nocturne Hotel", "Luxury Noir"],
  ["loudmouth-agency-website", "Loudmouth Agency", "Neo-Brutalist"],
  ["kanso-architects-website", "Kanso Architects", "Japanese Minimal"],
  ["bloom-root-skincare-shop", "Bloom & Root", "Organic Earth"],
  ["ledgerly-saas-landing-page", "Ledgerly", "Swiss International"],
  ["sunwave-festival-website", "Sunwave Festival", "Retro 70s"],
  ["pixel-pals-game-studio-site", "Pixel Pals", "8-bit Arcade"],
  ["caf-bauhaus-website", "Café Bauhaus", "Bauhaus"],
  ["vitals-habit-app-landing", "Vitals", "Claymorphism"],
  ["overprint-zine-fair-website", "Overprint Zine Fair", "Risograph Zine"],
];

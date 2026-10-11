"use client";

import { useEffect, useState } from "react";
import Live from "./Live";
import { Bottom, Cursor, Fade, Frame, Rise, SITES, Top, URL, bySlug } from "./Kit";

function useScene(initial = 0) {
  const [scene, setScene] = useState(initial);
  useEffect(() => {
    window.__studio = { setScene };
    window.__studioReady = true;
  }, []);
  return scene;
}

const H1 = { fontSize: 62, lineHeight: 0.95, fontWeight: 700, letterSpacing: "-0.035em" };

function Card({ title, lines, sub, foot, scene }) {
  // Title card used for intros and outros (keyed by scene so it replays).
  return (
    <div key={scene} style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 34px" }}>
      <Fade delay={0.05}>
        <div className="mono" style={{ color: "#d9534f", marginBottom: 22 }}>{title}</div>
      </Fade>
      {lines.map((l, i) => (
        <Rise key={i} delay={0.12 + i * 0.09} style={H1}>
          {l}
        </Rise>
      ))}
      {sub && (
        <Fade delay={0.12 + lines.length * 0.09 + 0.15}>
          <div style={{ marginTop: 26, fontSize: 18, lineHeight: 1.35, color: "#3a3a38", maxWidth: 420 }}>{sub}</div>
        </Fade>
      )}
      {foot && <Fade delay={0.12 + lines.length * 0.09 + 0.3}>{foot}</Fade>}
    </div>
  );
}

const UrlPill = ({ size = 17 }) => (
  <div className="pill" style={{ fontSize: size, padding: "11px 20px", marginTop: 28 }}>
    {URL}
  </div>
);

/** Reel 1: ten full websites, each in its own design language, scrolled top to bottom. */
export function ReelSites({ q }) {
  const scene = useScene(Number(q.scene || 0));
  const n = SITES.length;
  return (
    <div className="cv story">
      <Top label={scene > 0 && scene <= n ? "10 sites · 10 design languages" : "Website library"} />
      {scene === 0 && (
        <Card
          scene={scene}
          title="Specimen Design — sheet 01"
          lines={[
            "10 websites.",
            "10 design",
            <span key="l">
              <span className="serif" style={{ color: "#1d4ed8", fontWeight: 400, letterSpacing: "-0.02em" }}>languages.</span>
            </span>,
            <span key="z">
              Prompts included.
            </span>,
          ]}
        />
      )}
      {SITES.map(([slug, name, style], i) => (
        <div key={slug} style={{ position: "absolute", inset: 0, visibility: scene === i + 1 ? "visible" : "hidden" }}>
          <div style={{ position: "absolute", left: 24, right: 24, top: 86 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div className="mono" style={{ color: "#121212" }}>No. {String(i + 1).padStart(2, "0")} / 10</div>
              <div className="tag mono" style={{ fontSize: 9, color: "#121212" }}>{style}</div>
            </div>
            <div className="serif" style={{ fontSize: 46, lineHeight: 1, marginTop: 10, letterSpacing: "-0.01em" }}>{name}</div>
          </div>
          <Frame url={`${URL}/vault/${slug}`} style={{ position: "absolute", left: 24, top: 176, width: 492 }}>
            <Live item={bySlug[slug]} box={489} boxH={690} scrollKey={`s${i + 1}`} />
          </Frame>
        </div>
      ))}
      {scene > n && (
        <Card
          scene={scene}
          title="Free — no sign-up"
          lines={["Every design", "comes with the", <span key="p" className="serif" style={{ color: "#1d4ed8", fontWeight: 400 }}>Claude prompt</span>, "that builds it."]}
          sub="Copy it, paste it into Claude, make it yours."
          foot={<UrlPill />}
        />
      )}
      <Bottom left={scene > 0 && scene <= n ? "Live code · prompt included" : "Link in bio"} url={scene > 0 && scene <= n} />
    </div>
  );
}

/** Reels built from components: one design per scene, framed, optionally driven by a cursor. */
const SCENE_SETS = {
  press: {
    label: "Buttons worth pressing",
    dims: [380, 500],
    intro: { title: "Specimen Design — micro-interactions", lines: ["Buttons", "you'll want", <span key="s" className="serif" style={{ color: "#d9534f", fontWeight: 400 }}>to press.</span>] },
    outro: { title: "Free — prompt included", lines: ["Spring physics,", "prompt included."], sub: "Every button comes with the Claude prompt that builds it." },
    slugs: ["squish-press-button", "paper-confetti-like-button", "elastic-toggle-switch", "clay-inflate-buttons", "copy-button-morph", "memphis-squiggle-buttons", "pixel-arcade-start-button", "hold-to-confirm-button"],
  },
  type: {
    label: "Type that moves",
    dims: [440, 580],
    intro: { title: "Specimen Design — kinetic type", lines: ["Headlines", "that refuse", <span key="s" className="serif" style={{ color: "#1d4ed8", fontWeight: 400 }}>to sit still.</span>] },
    outro: { title: "Free — prompt included", lines: ["Copy the prompt.", "Ship the motion."], sub: "Kinetic typography, ready to paste into Claude." },
    slugs: ["split-flap-headline", "masked-word-swap-banner", "riso-overprint-headline", "wave-letter-hover-banner", "groovy-sunset-banner", "draggable-speed-marquee", "masthead-hero-with-rotating-serif-word"],
  },
};

export function ReelScenes({ q, set }) {
  const cfg = SCENE_SETS[set];
  const scene = useScene(Number(q.scene || 0));
  const n = cfg.slugs.length;
  return (
    <div className="cv story">
      <Top label={cfg.label} />
      {scene === 0 && <Card scene={scene} {...cfg.intro} />}
      {cfg.slugs.map((slug, i) => {
        const it = bySlug[slug];
        return (
          <div key={slug} data-scene={i + 1} style={{ position: "absolute", inset: 0, visibility: scene === i + 1 ? "visible" : "hidden" }}>
            <div style={{ position: "absolute", left: 24, right: 24, top: 82 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className="mono" style={{ color: "#121212" }}>No. {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</div>
                <div className="tag mono" style={{ fontSize: 9 }}>{it.style}</div>
              </div>
              <div style={{ fontSize: 32, lineHeight: 1.02, fontWeight: 700, letterSpacing: "-0.03em", marginTop: 10 }}>{it.title}</div>
              <div style={{ fontSize: 14, lineHeight: 1.38, color: "#3a3a38", marginTop: 8, maxWidth: 470 }}>{it.description}</div>
            </div>
            <Frame url={`${URL}/vault/${slug}`} style={{ position: "absolute", left: 24, top: 236, width: 492 }}>
              {scene === i + 1 && <Live item={it} w={cfg.dims[0]} h={cfg.dims[1]} box={489} />}
            </Frame>
          </div>
        );
      })}
      {scene > n && <Card scene={scene} {...cfg.outro} foot={<UrlPill />} />}
      <Bottom left={scene > 0 && scene <= n ? "Live code · prompt included" : "Link in bio"} url={scene > 0 && scene <= n} />
      <Cursor />
    </div>
  );
}

export const REEL_META = { sites: SITES.length, press: SCENE_SETS.press.slugs, type: SCENE_SETS.type.slugs };

"use client";

import { useEffect } from "react";
import Live from "./Live";
import { Bottom, Frame, Logo, SITES, Top, URL, bySlug } from "./Kit";

const H = { fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 0.96 };
const accent = (t, c = "#1d4ed8") => (
  <span className="serif" style={{ color: c, fontWeight: 400, letterSpacing: "-0.015em" }}>
    {t}
  </span>
);

function Crop({ slug, y = 0, x = 0, zoom = 1, w = 484, h = 400, left = 28, top, url, dark }) {
  return (
    <Frame url={url || `${URL}/vault/${slug}`} dark={dark} style={{ position: "absolute", left, top, width: w }}>
      <Live item={bySlug[slug]} box={w - 3} boxH={h} zoom={zoom} x={x} y={y} />
    </Frame>
  );
}

function Angle({ no, title, note, total, children, label = "One website, every angle" }) {
  return (
    <div className="cv feed">
      <Top label={label} />
      <div style={{ position: "absolute", left: 28, right: 28, top: 78 }}>
        <div className="mono" style={{ color: "#d9534f" }}>
          {String(no).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        <div style={{ ...H, fontSize: 34, marginTop: 8 }}>{title}</div>
        <div style={{ fontSize: 14.5, lineHeight: 1.4, color: "#3a3a38", marginTop: 8, maxWidth: 440 }}>{note}</div>
      </div>
      {children}
      <Bottom left="Swipe →" />
    </div>
  );
}

function PromptCard({ slug, lines = 12, left = 28, top, w = 484, h, size = 9.6, highlight }) {
  const text = bySlug[slug].claudePrompt.split("\n").slice(0, lines).join("\n");
  return (
    <div className="frame" style={{ position: "absolute", left, top, width: w, height: h, background: "#121212", color: "#e8e3d8", boxShadow: "5px 5px 0 #d9534f", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid #3a3a38" }}>
        <div className="mono" style={{ fontSize: 8.5, color: "#b9b4aa", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginRight: 8 }}>claude prompt · {slug}</div>
        <div className="mono" style={{ fontSize: 8.5, background: "#faf9f6", color: "#121212", borderRadius: 99, padding: "4px 10px", fontWeight: 600, whiteSpace: "nowrap" }}>Copy prompt</div>
      </div>
      <pre style={{ margin: 0, padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: size, lineHeight: 1.55, whiteSpace: "pre-wrap", overflow: "hidden", flex: 1, minHeight: 0 }}>
        {highlight
          ? text.split(highlight).flatMap((part, i, arr) => (i < arr.length - 1 ? [part, <mark key={i} style={{ background: "#1d4ed8", color: "#faf9f6" }}>{highlight}</mark>] : [part]))
          : text}
      </pre>
    </div>
  );
}

function PromptLine({ children, top = 150 }) {
  return (
    <div style={{ position: "absolute", left: 28, right: 28, top, background: "#121212", color: "#e8e3d8", padding: "10px 14px", fontFamily: "var(--font-mono)", fontSize: 10, lineHeight: 1.5, boxShadow: "4px 4px 0 #d9534f" }}>
      <span style={{ color: "#d9534f" }}>prompt › </span>
      {children}
    </div>
  );
}

function Cta({ title = "Copy the prompt.", line2 = "Build it in Claude.", sub = "Free. No sign-up. 59 designs and counting.", format = "feed", dark = false }) {
  return (
    <div className={`cv ${format} ${dark ? "ink" : "paper2"}`}>
      <Top label="Link in bio" dark={dark} />
      <div style={{ position: "absolute", left: 28, right: 28, top: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ ...H, fontSize: 56 }}>{title}</div>
        <div style={{ ...H, fontSize: 56 }}>{accent(line2, dark ? "#7c9bff" : "#1d4ed8")}</div>
        <div style={{ fontSize: 17, lineHeight: 1.4, color: dark ? "#b9b4aa" : "#3a3a38", marginTop: 22, maxWidth: 420 }}>{sub}</div>
        <div>
          <div className="pill" style={{ fontSize: 17, padding: "11px 20px", marginTop: 26, ...(dark ? { background: "#faf9f6", color: "#121212" } : null) }}>{URL}</div>
        </div>
      </div>
      <Bottom left="@specimen.design" dark={dark} url={false} />
    </div>
  );
}

/* ---------- Post: Nocturne Hotel, every angle ---------- */
const N = "nocturne-hotel-website";
const nocturne = [
  () => (
    <div className="cv feed paper2">
      <Top label="Specimen No. 01" />
      <div style={{ position: "absolute", left: 28, right: 28, top: 84 }}>
        <div style={{ ...H, fontSize: 60 }}>One website,</div>
        <div style={{ ...H, fontSize: 60 }}>{accent("every angle.")}</div>
      </div>
      <Crop slug={N} top={238} h={338} zoom={1.08} x={10} />
      <Bottom left="Nocturne Hotel · Luxury Noir · swipe →" url={false} />
    </div>
  ),
  () => (
    <Angle no={1} total={6} title="The hero" note="“Stay up late.” in Bodoni italic. One line of copy, two buttons, nothing else competing for the first second.">
      <Crop slug={N} top={218} h={380} zoom={1.32} x={0} y={70} />
    </Angle>
  ),
  () => (
    <Angle no={2} total={6} title="The suites" note="Numbers set on hairlines like a hotel menu card, then three tall suite cards with size, price and one quiet link.">
      <Crop slug={N} top={218} h={380} zoom={1} y={700} />
    </Angle>
  ),
  () => (
    <Angle no={3} total={6} title="The bar" note="A split section for The Composing Room: editorial text on the left, a tall image block with a vertical caption on the right.">
      <Crop slug={N} top={218} h={380} zoom={1.12} y={1640} x={20} />
    </Angle>
  ),
  () => (
    <Angle no={4} total={6} title="The finish" note="One guest quote with a lot of black around it, a reservation band, and a footer that stays out of the way.">
      <Crop slug={N} top={218} h={380} zoom={1} y={2059} />
    </Angle>
  ),
  () => (
    <Angle no={5} total={6} title="The prompt behind it" note="This is the brief Claude builds the whole page from. It's free on the site: copy it, change the hotel, keep the evening.">
      <PromptCard slug={N} top={218} h={380} lines={14} />
    </Angle>
  ),
  () => (
    <div className="cv feed">
      <Top label="06 / 06" />
      <div style={{ position: "absolute", left: 28, top: 82 }}>
        <Frame url="nocturne-hotel-website" style={{ width: 208 }}>
          <Live item={bySlug[N]} box={205} />
        </Frame>
      </div>
      <div style={{ position: "absolute", left: 268, right: 28, top: 92 }}>
        <div className="mono" style={{ color: "#d9534f" }}>The whole page</div>
        <div style={{ ...H, fontSize: 30, marginTop: 10 }}>3,064 px, one voice, top to bottom.</div>
        <div style={{ marginTop: 18, fontSize: 13.5, lineHeight: 1.9, color: "#3a3a38" }}>
          {["Nav", "Hero", "Stats", "Suites", "Dining", "Quote", "Reserve", "Footer"].map((s, i) => (
            <div key={s} style={{ borderTop: "1px solid #e8e3d8", display: "flex", justifyContent: "space-between" }}>
              <span>{s}</span>
              <span className="mono" style={{ fontSize: 9, color: "#6f6c66", alignSelf: "center" }}>{String(i + 1).padStart(2, "0")}</span>
            </div>
          ))}
        </div>
        <div className="pill" style={{ fontSize: 12.5, padding: "9px 14px", marginTop: 22 }}>Prompt free · link in bio</div>
      </div>
      <Bottom left="@specimen.design" />
    </div>
  ),
];

/* ---------- Post: Pick a design language ---------- */
const LANG = [
  ["loudmouth-agency-website", "Neo-Brutalist", "Agencies, studios, brands with opinions.", ["Thick black outlines", "Hard offset shadows", "Flat, loud color"]],
  ["caf-bauhaus-website", "Bauhaus", "Cafés, galleries, design shops.", ["Primary colors only", "Circles, squares, half-discs", "The grid is the decoration"]],
  ["kanso-architects-website", "Japanese Minimal", "Architects, craft, wellness.", ["Generous empty space", "One quiet serif", "Muted paper tones"]],
  ["bloom-root-skincare-shop", "Organic Earth", "Skincare, food, slow brands.", ["Soft blob shapes", "Moss green and clay", "Rounded everything"]],
  ["ledgerly-saas-landing-page", "Swiss International", "SaaS, finance, serious tools.", ["A strict grid", "Tight grotesk headlines", "One signal red"]],
  ["sunwave-festival-website", "Retro 70s", "Festivals, bars, summer events.", ["Orange, mustard, brown", "Rainbow arcs and waves", "Chunky serif display"]],
  ["pixel-pals-game-studio-site", "8-bit Arcade", "Games, kids, playful tech.", ["Pixel type", "Black stage, bright blocks", "A high-score table"]],
  ["vitals-habit-app-landing", "Claymorphism", "Apps and friendly products.", ["Puffy pastel cards", "Soft inner shadows", "Rounded bold sans"]],
  ["overprint-zine-fair-website", "Risograph Zine", "Print, culture, community events.", ["Two inks overprinting", "Halftone dots", "Proudly off-register"]],
];
const languages = [
  () => (
    <div className="cv feed">
      <Top label="Save this for your next site" />
      <div style={{ position: "absolute", left: 28, right: 28, top: 80 }}>
        <div style={{ ...H, fontSize: 58 }}>Pick your</div>
        <div style={{ ...H, fontSize: 58 }}>{accent("design language.")}</div>
      </div>
      <div style={{ position: "absolute", left: 28, top: 232, display: "grid", gridTemplateColumns: "repeat(3, 152px)", gap: 14 }}>
        {LANG.map(([slug, name]) => (
          <div key={slug}>
            <div style={{ border: "1.2px solid #121212", boxShadow: "3px 3px 0 #121212", overflow: "hidden" }}>
              <Live item={bySlug[slug]} box={150} boxH={92} />
            </div>
            <div className="mono" style={{ fontSize: 7.5, marginTop: 6 }}>{name}</div>
          </div>
        ))}
      </div>
      <Bottom left="9 styles · swipe →" url={false} />
    </div>
  ),
  ...LANG.map(([slug, name, best, rules], i) => () => (
    <div className="cv feed">
      <Top label={`Design languages · ${String(i + 1).padStart(2, "0")}/09`} />
      <div style={{ position: "absolute", left: 28, right: 28, top: 76 }}>
        <div style={{ ...H, fontSize: 44 }}>{name}</div>
        <div style={{ fontSize: 14.5, marginTop: 8, color: "#3a3a38" }}>
          <span className="mono" style={{ color: "#d9534f", marginRight: 8 }}>Best for</span>
          {best}
        </div>
      </div>
      <Crop slug={slug} top={176} h={300} />
      <div style={{ position: "absolute", left: 28, right: 28, top: 518 }}>
        {rules.map((r, k) => (
          <div key={r} style={{ display: "flex", gap: 14, alignItems: "baseline", borderTop: "1px solid #121212", padding: "7px 0", fontSize: 15, fontWeight: 600 }}>
            <span className="mono" style={{ color: "#6f6c66" }}>R{k + 1}</span>
            {r}
          </div>
        ))}
      </div>
      <Bottom left={SITES.find((s) => s[0] === slug)[1]} />
    </div>
  )),
  () => <Cta title="16 languages." line2="Every prompt free." sub="Each style in the library comes with a full website or components, and the Claude prompt that builds them." />,
];

/* ---------- Post: the November offer ---------- */
const offer = [
  ({ format }) => (
    <div className={`cv ${format} ink`}>
      <Top label="Studio offer · until Nov 30" dark />
      <div style={{ position: "absolute", left: 28, right: 28, top: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="mono" style={{ color: "#e8705f" }}>Custom website · design, build & care</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginTop: 8 }}>
          <div style={{ ...H, fontSize: format === "story" ? 210 : 190, color: "#e8705f", letterSpacing: "-0.06em", lineHeight: 0.85 }}>70%</div>
          <div style={{ ...H, fontSize: 64, paddingBottom: 10 }}>{accent("off", "#faf9f6")}</div>
        </div>
        <div style={{ ...H, fontSize: 34, marginTop: 22 }}>Start from a design you’ve seen working.</div>
        <div style={{ fontSize: 16, lineHeight: 1.45, color: "#b9b4aa", marginTop: 14, maxWidth: 430 }}>
          Strategy, content, design, development and ongoing care, for small businesses. Pick a design from our free library, or a new direction, and we make it yours.
        </div>
        {format === "story" && (
          <div style={{ marginTop: 34 }}>
            <div className="pill" style={{ fontSize: 17, padding: "12px 22px", background: "#faf9f6", color: "#121212" }}>DM “SITE” to start</div>
          </div>
        )}
      </div>
      <Bottom left="Ends November 30, 2026" dark url={format === "story"} />
    </div>
  ),
  () => (
    <div className="cv feed">
      <Top label="What's in it" />
      <div style={{ position: "absolute", left: 28, right: 28, top: 84 }}>
        <div style={{ ...H, fontSize: 44 }}>One team,</div>
        <div style={{ ...H, fontSize: 44 }}>{accent("the whole site.", "#d9534f")}</div>
      </div>
      <div style={{ position: "absolute", left: 28, right: 28, top: 214 }}>
        {[
          ["Strategy & content", "What the site says, and who it's for."],
          ["Design that fits", "A library design, or a new direction, fitted to your brand."],
          ["Built in Next.js", "Fast, solid, yours."],
          ["SEO & analytics", "From day one, not as an add-on."],
          ["Ongoing care", "We keep managing it after launch."],
        ].map(([t, d], i) => (
          <div key={t} style={{ display: "grid", gridTemplateColumns: "42px 1fr", borderTop: "1px solid #121212", padding: "11px 0 12px" }}>
            <div className="mono" style={{ color: "#d9534f", paddingTop: 5 }}>{String(i + 1).padStart(2, "0")}</div>
            <div>
              <div style={{ fontSize: 21, fontWeight: 700, letterSpacing: "-0.02em" }}>{t}</div>
              <div style={{ fontSize: 14, color: "#3a3a38", marginTop: 2 }}>{d}</div>
            </div>
          </div>
        ))}
      </div>
      <Bottom left="70% off until Nov 30 · swipe →" url={false} />
    </div>
  ),
  () => (
    <div className="cv feed paper2">
      <Top label="Where it starts" />
      <div style={{ position: "absolute", left: 28, right: 28, top: 80 }}>
        <div style={{ ...H, fontSize: 38 }}>Start from a design</div>
        <div style={{ ...H, fontSize: 38 }}>you’ve {accent("seen working,")}</div>
        <div style={{ ...H, fontSize: 38 }}>not a blank page.</div>
      </div>
      <Crop slug="ledgerly-saas-landing-page" left={28} top={238} w={300} h={186} />
      <Crop slug="nocturne-hotel-website" left={212} top={314} w={300} h={186} />
      <Crop slug="caf-bauhaus-website" left={60} top={420} w={300} h={160} />
      <Bottom left="Most projects go live in 4–6 weeks" url={false} />
    </div>
  ),
  ({ format }) => (
    <div className={`cv ${format}`} style={{ background: "#d9534f", color: "#faf9f6" }}>
      <Top label="How to claim it" dark />
      <div style={{ position: "absolute", left: 28, right: 28, top: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ ...H, fontSize: 54 }}>DM us “SITE”.</div>
        <div style={{ ...H, fontSize: 54 }}>{accent("We'll take it from there.", "#121212")}</div>
        <div style={{ fontSize: 17, lineHeight: 1.45, marginTop: 22, maxWidth: 430 }}>
          Tell us what your business does. We reply within one business day.
        </div>
        <div style={{ marginTop: 26, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <div className="pill" style={{ fontSize: 15, padding: "10px 18px", boxShadow: "3px 3px 0 #faf9f6" }}>{URL}</div>
        </div>
        <div className="mono" style={{ marginTop: 26, color: "#121212", fontWeight: 600 }}>70% off · offer ends November 30, 2026</div>
      </div>
      <Bottom left="@specimen.design" dark url={false} />
    </div>
  ),
];

/* ---------- Post: one prompt → one website (Café Bauhaus) ---------- */
const B = "caf-bauhaus-website";
const bauhaus = [
  () => (
    <div className="cv feed">
      <Top label="Prompt → page" />
      <div style={{ position: "absolute", left: 28, right: 28, top: 82 }}>
        <div style={{ ...H, fontSize: 58 }}>One prompt.</div>
        <div style={{ ...H, fontSize: 58 }}>{accent("One website.", "#d9534f")}</div>
      </div>
      <PromptCard slug={B} left={28} top={240} w={230} h={300} lines={9} size={7.4} />
      <div style={{ position: "absolute", left: 262, top: 370, fontSize: 30, fontWeight: 700 }}>→</div>
      <Crop slug={B} left={290} top={240} w={222} h={300} />
      <Bottom left="Café Bauhaus · Bauhaus · swipe →" url={false} />
    </div>
  ),
  () => (
    <Angle no={1} total={5} label="Prompt → page" title="It starts as a brief" note="Concept, layout, content, interactions. Written once, so you don't have to.">
      <PromptCard slug={B} top={218} h={380} lines={14} />
    </Angle>
  ),
  () => (
    <Angle no={2} total={5} label="Prompt → page" title="The hero" note="">
      <PromptLine top={162}>Hero: left headline 'FORM / FOLLOWS / COFFEE' stacked; right a 3x3 geometric composition</PromptLine>
      <Crop slug={B} top={238} h={360} zoom={1.05} />
    </Angle>
  ),
  () => (
    <Angle no={3} total={5} label="Prompt → page" title="The menu" note="">
      <PromptLine top={162}>Menu: 6 tiles in a grid … each with a shape icon, price and short note.</PromptLine>
      <Crop slug={B} top={238} h={360} zoom={1.15} y={760} x={20} />
    </Angle>
  ),
  () => (
    <Angle no={4} total={5} label="Prompt → page" title="The hours" note="">
      <PromptLine top={162}>Hours: each weekday as a horizontal bar in the grid with times.</PromptLine>
      <Crop slug={B} top={238} h={360} zoom={1.15} y={1430} x={20} />
    </Angle>
  ),
  () => (
    <Angle no={5} total={5} label="Prompt → page" title="The visit" note="">
      <PromptLine top={162}>Visit: address in Tel Aviv's White City, a geometric map made of squares.</PromptLine>
      <Crop slug={B} top={238} h={360} zoom={1.15} y={1780} x={20} />
    </Angle>
  ),
  () => <Cta title="Your turn." line2="Steal the prompt." sub="Pick a design, copy its prompt, paste it into Claude, make it yours. All 59 designs are free." />,
];

/* ---------- Stories (9:16) ---------- */
const stories = {
  nocturne: [
    () => (
      <div className="cv story paper2">
        <Top label="New post" />
        <div style={{ position: "absolute", left: 28, right: 28, top: 92 }}>
          <div style={{ ...H, fontSize: 64 }}>One website,</div>
          <div style={{ ...H, fontSize: 64 }}>{accent("every angle.")}</div>
          <div style={{ fontSize: 17, color: "#3a3a38", marginTop: 14 }}>Nocturne Hotel · Luxury Noir</div>
        </div>
        <Crop slug={N} top={300} h={470} zoom={1.25} x={10} y={40} />
        <Bottom left="Full carousel on our profile" url={false} />
      </div>
    ),
    () => <Cta format="story" title="The prompt" line2="is free." sub="Nocturne Hotel and 58 more designs, each with the Claude prompt that builds it." />,
  ],
  languages: [
    () => (
      <div className="cv story">
        <Top label="Quick poll" />
        <div style={{ position: "absolute", left: 28, right: 28, top: 92 }}>
          <div style={{ ...H, fontSize: 56 }}>Which one is</div>
          <div style={{ ...H, fontSize: 56 }}>{accent("your business?")}</div>
        </div>
        <div style={{ position: "absolute", left: 28, top: 250, display: "grid", gridTemplateColumns: "repeat(2, 234px)", gap: 16 }}>
          {[LANG[0], LANG[1], LANG[2], LANG[4]].map(([slug, name], i) => (
            <div key={slug}>
              <div style={{ border: "1.5px solid #121212", boxShadow: "4px 4px 0 #121212", overflow: "hidden" }}>
                <Live item={bySlug[slug]} box={231} boxH={170} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, marginTop: 8 }}>
                <span className="mono" style={{ color: "#d9534f", marginRight: 6 }}>{"ABCD"[i]}</span>
                {name}
              </div>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 28, right: 28, top: 712, height: 120, border: "1.5px dashed #6f6c66", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="mono" style={{ color: "#6f6c66" }}>Poll sticker goes here</div>
        </div>
        <Bottom left="All 9 styles in today's post" url={false} />
      </div>
    ),
  ],
  offer: [offer[0], offer[3]],
  bauhaus: [
    () => (
      <div className="cv story">
        <Top label="New post" />
        <div style={{ position: "absolute", left: 28, right: 28, top: 92 }}>
          <div style={{ ...H, fontSize: 60 }}>One prompt.</div>
          <div style={{ ...H, fontSize: 60 }}>{accent("One website.", "#d9534f")}</div>
        </div>
        <PromptCard slug={B} top={262} h={210} lines={6} size={9} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 486, textAlign: "center", fontSize: 34, fontWeight: 700 }}>↓</div>
        <Crop slug={B} top={540} h={250} />
        <Bottom left="Copy the prompt · link below" url />
      </div>
    ),
  ],
};

const POSTS = { nocturne, languages, offer, bauhaus };

export function Slides({ q }) {
  const format = q.format || "feed";
  const list = format === "story" ? stories[q.post] : POSTS[q.post];
  const n = Number(q.n || 0);
  useEffect(() => {
    window.__slideCount = list.length;
    window.__studioReady = true;
  }, [list.length]);
  const S = list[n];
  return <S format={format} />;
}

export const SLIDE_COUNTS = Object.fromEntries(Object.entries(POSTS).map(([k, v]) => [k, v.length]));
export { Logo };

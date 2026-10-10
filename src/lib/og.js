// Shared renderer for OpenGraph cards (1200x630), editorial paper style.
export function OgCard({ kicker, title, foot }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#FAF9F6", color: "#121212", padding: 64, fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #121212", paddingBottom: 14, fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>
        <span>{kicker}</span>
        <span style={{ color: "#1D4ED8" }}>Specimen</span>
      </div>
      <div style={{ display: "flex", fontSize: title.length > 40 ? 82 : 104, fontWeight: 700, lineHeight: 0.95, letterSpacing: -4, maxWidth: 1050 }}>{title}</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 26 }}>
        <span>{foot}</span>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 999, background: "#D9534F" }} />
          <div style={{ width: 34, height: 34, borderRadius: 999, background: "#1D4ED8" }} />
          <div style={{ width: 34, height: 34, borderRadius: 999, background: "#121212" }} />
        </div>
      </div>
    </div>
  );
}

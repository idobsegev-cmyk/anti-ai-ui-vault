# Brand asset scripts

Python + Playwright (Chromium) + fontTools/uharfbuzz + ffmpeg. Run against a local production build (`npm run build && npx next start -p 3100`).

- `build-logo.py` — writes the outlined SVG logos (EN/HE, light/dark) and the app icon into `public/brand/`, drawing glyphs from the site's own fonts.
  The font files are read from `.next/static/media/` by their hashed file-name prefix; after a dependency or font change, re-identify them (fontTools `name` table) and update the `FONTS` map.
  Geometry mirrors the header wordmark in `src/components/SiteHeader.jsx` (measured in the browser).
- `render-png.py` — renders every SVG in `public/brand/` to transparent PNG (logos 2400px wide, icon 1024px).
- `record-reel.py` — records the "How it works" loop as a 1080×1920, 30 fps vertical video.
  It replaces the page clock (performance.now, Date, rAF, timers) and disables the Web Animations API so every
  Framer Motion animation is stepped frame by frame; output frames are encoded with
  `ffmpeg -framerate 30 -i full/f%04d.png -c:v libx264 -crf 16 -pix_fmt yuv420p -movflags +faststart`.
  `python3 record-reel.py full 372` = one seamless 12.4 s loop (scenes 3200+2600+3600+3000 ms).

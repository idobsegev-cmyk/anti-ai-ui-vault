# Social media

Content for @specimen.design (Instagram first, other networks later). Plan and rules: `docs/PROJECT-BRIEF.md` §10.

- `instagram/<date>-<slug>/` — one folder per post: media, `caption.txt`, story frames. `WEEK-NN.md` = the week's calendar.
- `tools/` — how the media is made:
  - The capture studio is a local-only Next route, `src/app/social-studio/` (404s in production). Start it with
    `SOCIAL_STUDIO=1 npx next dev -p 3200`.
  - Studio pages: `/social-studio/reel-sites`, `/reel-press`, `/reel-type` (reels), `/slide?post=<nocturne|languages|offer|bauhaus>&n=<i>&format=<feed|story>` (carousels and stories), `/bare?slug=<slug>&w=&h=` (one design, no chrome). Post content lives in `Slides.jsx` / `Reels.jsx`.
  - `python3 social/tools/record.py <sites|press|type> out.mp4` records a reel at 1080×1920, 30 fps. The page clock is replaced (`tools/clock.js`) so every animation is stepped frame by frame; a scripted cursor presses buttons.
  - `python3 social/tools/stills.py nocturne:feed:7 offer:story:2 …` renders slides at 2× (1080 px wide).
- Brand rules from the brief apply: paper/ink/cobalt/terracotta, Instrument Sans + Serif italic + JetBrains Mono, hairlines and hard offset shadows.

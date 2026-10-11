"""Record a Specimen Design Instagram reel from the local capture studio.

Usage: python3 social/tools/record.py <sites|press|type> <out.mp4> [base_url]
Needs the studio running: SOCIAL_STUDIO=1 npx next dev -p 3200 (see social/README.md).
Every animation runs on a replaced page clock, stepped frame by frame, so the video is smooth and repeatable.
"""
import sys, os, math, shutil, subprocess, tempfile
from playwright.sync_api import sync_playwright

KIND, OUT = sys.argv[1], sys.argv[2]
BASE = sys.argv[3] if len(sys.argv) > 3 else "http://localhost:3200"
FPS = 30
DT = 1000 / FPS
CLOCK = open(os.path.join(os.path.dirname(__file__), "clock.js")).read()

PRESS = ["squish-press-button", "paper-confetti-like-button", "elastic-toggle-switch", "clay-inflate-buttons", "copy-button-morph", "memphis-squiggle-buttons", "pixel-arcade-start-button", "hold-to-confirm-button"]
TYPE = ["split-flap-headline", "masked-word-swap-banner", "riso-overprint-headline", "wave-letter-hover-banner", "groovy-sunset-banner", "draggable-speed-marquee", "masthead-hero-with-rotating-serif-word"]

def ease(t):
    return 0.5 - 0.5 * math.cos(math.pi * max(0, min(1, t)))

def main():
    tmp = tempfile.mkdtemp(prefix="reel-")
    frame = [0]
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport={"width": 540, "height": 960}, device_scale_factor=2)
        ctx.add_init_script(CLOCK)
        pg = ctx.new_page()
        pg.goto(f"{BASE}/social-studio/reel-{KIND}", wait_until="domcontentloaded")
        for _ in range(300):
            pg.evaluate("__advance(16)"); pg.wait_for_timeout(6)
        pg.wait_for_function("document.fonts.status === 'loaded' && window.__studioReady === true")
        pg.mouse.move(600, 1000)

        def tick(n=1, shot=True):
            for _ in range(n):
                for _s in range(3):  # sub-steps let React render between timer callbacks
                    pg.evaluate(f"__advance({DT / 3})")
                    pg.wait_for_timeout(2)
                if shot:
                    pg.screenshot(path=f"{tmp}/f{frame[0]:05d}.png")
                    frame[0] += 1

        def scene(i):
            pg.evaluate(f"window.__studio.setScene({i})")
            pg.wait_for_timeout(30)

        def cursor(x, y):
            pg.mouse.move(x, y)
            pg.evaluate(f"(() => {{ const c = document.getElementById('studio-cursor'); if (c) {{ c.style.left = '{x}px'; c.style.top = '{y}px'; }} }})()")

        def frames(ms):
            return max(1, round(ms / DT))

        # warm every scene once (fonts, code compile) without recording
        n = {"sites": 10, "press": len(PRESS), "type": len(TYPE)}[KIND]
        for i in range(n + 2):
            scene(i); tick(20, shot=False)
        scene(0); tick(2, shot=False)

        if KIND == "sites":
            scene(0); tick(frames(2400))
            for i in range(1, n + 1):
                scene(i)
                total = pg.evaluate(f"document.querySelector('[data-scroll=\"s{i}\"]').getBoundingClientRect().height") / (489 / 1280)
                dist = max(0, total - 690 / (489 / 1280))
                pg.evaluate(f"document.querySelector('[data-scroll=\"s{i}\"]').style.transform = 'translateY(0px)'")
                hold, run, end = frames(380), frames(1150), frames(220)
                tick(hold)
                for k in range(run):
                    y = dist * ease((k + 1) / run)
                    pg.evaluate(f"document.querySelector('[data-scroll=\"s{i}\"]').style.transform = 'translateY({-y:.1f}px)'")
                    tick(1)
                tick(end)
            scene(n + 1); tick(frames(3400))
        else:
            slugs = PRESS if KIND == "press" else TYPE
            cursor(620, 1040)
            scene(0); tick(frames(2200))
            for i, slug in enumerate(slugs, start=1):
                scene(i); tick(3)
                sel = f'[data-scene="{i}"] .preview-scope'
                boxes = pg.evaluate(f"""Array.from(document.querySelectorAll('{sel} button, {sel} [role=switch], {sel} [role=button]')).slice(0,3).map(e => {{ const r = e.getBoundingClientRect(); return [r.x + r.width/2, r.y + r.height/2, r.width]; }})""")
                region = pg.evaluate(f"(() => {{ const r = document.querySelector('{sel}').getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; }})()")
                dur = 2700
                steps = []  # (t_ms, x, y, event)
                x0, y0 = 560, 900
                if KIND == "press" and boxes:
                    t = 250
                    holdms = 1500 if slug == "hold-to-confirm-button" else 200
                    targets = boxes if len(boxes) > 1 else boxes * (2 if slug in ("elastic-toggle-switch", "paper-confetti-like-button") else 1)
                    if slug == "hold-to-confirm-button":
                        targets = boxes[:1]; dur = 3300
                    gap = (dur - 600) / len(targets)
                    for (bx, by, _w) in targets:
                        steps.append((t, x0, y0, None)); steps.append((t + 420, bx, by, None))
                        steps.append((t + 520, bx, by, "down")); steps.append((t + 520 + holdms, bx, by, "up"))
                        x0, y0 = bx, by; t += gap
                elif KIND == "type" and slug == "wave-letter-hover-banner":
                    rx, ry, rw, rh = region
                    steps = [(150, 560, 900, None), (600, rx + 30, ry + rh / 2, None), (2500, rx + rw - 30, ry + rh / 2 + 4, None)]
                    dur = 3000
                elif KIND == "type" and slug == "draggable-speed-marquee":
                    rx, ry, rw, rh = region
                    my = ry + rh * 0.3
                    steps = [(150, 560, 900, None), (550, rx + rw * 0.8, my, None), (650, rx + rw * 0.8, my, "down"), (1500, rx + rw * 0.15, my, None), (1560, rx + rw * 0.15, my, "up"), (2400, 560, 990, None)]
                    dur = 3000
                else:
                    dur = 4300 if slug == "split-flap-headline" else 2800
                    cursor(620, 1040)
                nf = frames(dur)
                done = set()
                for k in range(nf):
                    tms = k * DT
                    if steps:
                        prev = [s for s in steps if s[0] <= tms]
                        nxt = [s for s in steps if s[0] > tms]
                        if prev and nxt:
                            a, c = prev[-1], nxt[0]
                            u = ease((tms - a[0]) / (c[0] - a[0]))
                            cursor(a[1] + (c[1] - a[1]) * u, a[2] + (c[2] - a[2]) * u)
                        elif prev:
                            cursor(prev[-1][1], prev[-1][2])
                        else:
                            cursor(steps[0][1], steps[0][2])
                        for s in prev:
                            if s[3] and s not in done:
                                done.add(s)
                                (pg.mouse.down() if s[3] == "down" else pg.mouse.up())
                    tick(1)
                cursor(620, 1040)
            scene(n + 1); tick(frames(3400))
        b.close()
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", f"{tmp}/f%05d.png", "-c:v", "libx264", "-crf", "17", "-pix_fmt", "yuv420p", "-movflags", "+faststart", OUT], check=True)
    shutil.copy(f"{tmp}/f00062.png", OUT.replace(".mp4", "-cover.png"))
    shutil.rmtree(tmp)
    print(OUT, frame[0], "frames")

main()

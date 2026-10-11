import sys, time, os, subprocess, shutil
from playwright.sync_api import sync_playwright
OUT=sys.argv[1] if len(sys.argv)>1 else "test"
FRAMES=int(sys.argv[2]) if len(sys.argv)>2 else 1
FPS=30
CLOCK = r"""
(() => {
  // keep every animation on our clock: no Web Animations API, so Framer Motion animates in JS
  try { delete Element.prototype.animate; Element.prototype.animate = undefined; } catch (e) {}
  let now = 0;
  const T0 = 1791700000000;
  let rafQ = [], rafId = 1, timers = [], tid = 1;
  performance.now = () => now;
  const RealDate = Date;
  Date.now = () => T0 + now;
  window.requestAnimationFrame = (cb) => { rafQ.push([rafId, cb]); return rafId++; };
  window.cancelAnimationFrame = (id) => { rafQ = rafQ.filter((x) => x[0] !== id); };
  const add = (fn, ms, a, every) => { const id = tid++; timers.push({ id, at: now + Math.max(0, +ms || 0), fn, a, every }); return id; };
  window.setTimeout = (fn, ms, ...a) => add(fn, ms, a, 0);
  window.setInterval = (fn, ms, ...a) => add(fn, ms, a, Math.max(1, +ms || 1));
  window.clearTimeout = window.clearInterval = (id) => { timers = timers.filter((t) => t.id !== id); };
  window.__advance = (ms) => {
    const target = now + ms;
    for (;;) {
      timers.sort((a, b) => a.at - b.at || a.id - b.id);
      const t = timers[0];
      if (!t || t.at > target) break;
      now = t.at;
      if (t.every) t.at += t.every; else timers.shift();
      try { typeof t.fn === "function" ? t.fn(...t.a) : null; } catch (e) { console.error(e); }
    }
    now = target;
    const q = rafQ; rafQ = [];
    for (const [, cb] of q) { try { cb(now); } catch (e) { console.error(e); } }
  };
})();
"""
STAGE = r"""
(() => {
  const how = document.getElementById("how");
  // hide everything that is not the section or one of its ancestors
  let el = how;
  while (el && el !== document.body) {
    for (const s of el.parentElement.children) if (s !== el && s.tagName !== "SCRIPT") s.style.display = "none";
    el = el.parentElement;
  }
  document.body.classList.remove("grain");
  const st = document.createElement("style");
  st.textContent = `
    html, body { overflow: hidden !important; background: #F2EFE8 !important; }
    #how { position: fixed; inset: 0; z-index: 100; display: flex; flex-direction: column; justify-content: center; border: 0 !important; padding: 0 !important; }
    #how > div { display: flex !important; flex-direction: column; align-items: stretch !important; gap: 30px !important; padding: 0 22px !important; margin-top: -6px; }
    #how > div > * { width: 100% !important; }
    #how h2 { font-size: 44px !important; line-height: 0.98 !important; }
    #how ol { margin-top: 20px !important; display: grid !important; grid-template-columns: 1fr 1fr; gap: 8px !important; }
    #how ol button { font-size: 15px !important; padding: 11px 16px !important; }
    #how p { font-size: 12px !important; }
    .reel-top { position: fixed; z-index: 200; top: 50px; left: 0; right: 0; display: flex; justify-content: center; }
    .reel-top img { width: 150px; height: auto; }
    .reel-bottom { position: fixed; z-index: 200; bottom: 122px; left: 0; right: 0; display: flex; flex-direction: column; align-items: center; gap: 12px; font-family: var(--font-sans); color: #121212; }
    .reel-bottom .l1 { font-size: 15px; color: #3a3a38; }
    .reel-bottom .url { font-size: 17px; font-weight: 600; background: #121212; color: #FAF9F6; border-radius: 999px; padding: 10px 20px; box-shadow: 3px 3px 0 #D9534F; }
  `;
  document.head.appendChild(st);
  const top = document.createElement("div"); top.className = "reel-top";
  top.innerHTML = '<img src="/brand/specimen-design-logo-light.svg" alt="">';
  const bot = document.createElement("div"); bot.className = "reel-bottom";
  bot.innerHTML = '<div class="l1">Free website designs + Claude prompts</div><div class="url">specimen-designs.vercel.app</div>';
  document.body.append(top, bot);
})();
"""
with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 540, "height": 960}, device_scale_factor=2, reduced_motion="no-preference")
    ctx.add_init_script("try{localStorage.setItem('vault-lang','en')}catch(e){}")
    ctx.add_init_script(CLOCK)
    pg = ctx.new_page()
    pg.goto("http://localhost:3100/", wait_until="domcontentloaded")
    # warm up: let the app hydrate and load with time moving
    for _ in range(240):
        pg.evaluate("__advance(16)"); pg.wait_for_timeout(8)
    pg.evaluate(STAGE)
    pg.wait_for_function("document.fonts.status === 'loaded'")
    pg.evaluate("document.querySelector('.reel-top img').decode()")
    # restart the loop at step 1 and let it settle
    pg.locator("#how ol button").first.click()
    pg.mouse.move(-10, -10)
    for _ in range(90):
        pg.evaluate("__advance(1000/30)"); pg.wait_for_timeout(5)
    # now jump to the last scene's end so frame 0 is the start of scene 1 exactly:
    pg.locator("#how ol button").nth(3).click(); pg.mouse.move(-10, -10)
    for _ in range(10): pg.evaluate("__advance(1000/30)"); pg.wait_for_timeout(5)
    d = f"/tmp/claude-0/sp/reel/{OUT}"; shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
    # scene 4 lasts 3000ms; advance to just before it flips to scene 1
    pg.evaluate("__advance(3000 - 10*1000/30 - 1)"); pg.wait_for_timeout(20)
    pg.evaluate("__advance(1)"); pg.wait_for_timeout(30)
    for f in range(FRAMES):
        pg.evaluate("__advance(1000/30)"); pg.wait_for_timeout(12)
        pg.screenshot(path=f"{d}/f{f:04d}.png")
    b.close()
print("frames:", FRAMES)

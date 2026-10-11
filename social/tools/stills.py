import sys, os
from playwright.sync_api import sync_playwright
BASE="http://localhost:3200/social-studio"
jobs=[]  # (post, format, n)
spec=sys.argv[1:]  # e.g. nocturne:feed:7
for s in spec:
    post,fmt,cnt=s.split(':'); jobs+= [(post,fmt,i) for i in range(int(cnt))]
with sync_playwright() as p:
    b=p.chromium.launch()
    for fmt in ("feed","story"):
        js=[j for j in jobs if j[1]==fmt]
        if not js: continue
        pg=b.new_page(viewport={"width":540,"height":675 if fmt=="feed" else 960},device_scale_factor=2)
        pg.on('pageerror', lambda e: print('ERR',e))
        for post,_,n in js:
            pg.goto(f"{BASE}/slide?post={post}&format={fmt}&n={n}",wait_until="networkidle")
            pg.wait_for_function("document.fonts.status==='loaded'")
            pg.wait_for_timeout(3500)
            d=f"social/out/{post}-{fmt}"; os.makedirs(d,exist_ok=True)
            pg.screenshot(path=f"{d}/{n+1:02d}.png")
        pg.close()
    b.close()

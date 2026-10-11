import os
from playwright.sync_api import sync_playwright
D="/home/claude/anti-ai-ui-vault/public/brand/"
jobs=[(f,2400 if "logo" in f else 1024) for f in sorted(os.listdir(D)) if f.endswith(".svg")]
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page()
    for f,w in jobs:
        svg=open(D+f).read()
        vb=[float(x) for x in svg.split('viewBox="')[1].split('"')[0].split()]
        h=round(w*vb[3]/vb[2])
        pg.set_viewport_size({"width":w,"height":h})
        pg.set_content(f'<html><body style="margin:0;background:transparent">{svg.replace("<svg ",f"<svg width=\"{w}\" height=\"{h}\" ",1)}</body></html>')
        pg.screenshot(path=D+f.replace(".svg",".png"), omit_background=True, clip={"x":0,"y":0,"width":w,"height":h})
        print(f, w, h)
    # contact sheet for review
    imgs="".join(f'<div style="background:{"#121212" if "dark" in f else "#FAF9F6"};padding:24px;border:1px solid #ccc"><img src="file://{D+f.replace(".svg",".png")}" style="height:{160 if "logo" in f else 120}px"></div>' for f,_ in jobs)
    pg.set_viewport_size({"width":1100,"height":900}); pg.goto("file:///dev/null")
    pg.set_content(f'<body style="margin:0;display:flex;flex-wrap:wrap;gap:12px;padding:12px;background:#ddd">{imgs}</body>'); pg.wait_for_timeout(500)
    pg.screenshot(path="sheet.png", full_page=True)
    b.close()

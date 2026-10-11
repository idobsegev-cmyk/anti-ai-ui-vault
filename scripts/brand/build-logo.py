import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import io, os
M="/home/claude/anti-ai-ui-vault/.next/static/media/"
def find(prefix): return M+[f for f in os.listdir(M) if f.startswith(prefix)][0]
FONTS={
 "sans": (find("f06bf9da926bae75"), {"wght":700}),
 "serifI": (find("7ebf22b5a21034f8"), {}),
 "mono": (find("70bc3e132a0a741e"), {"wght":500}),
 "heebo": (find("965081c897c2ba41"), {}),
 "heeboLat": (find("f5591087385f4568"), {}),
 "plexHe": (find("49efb7b859c245c7"), {}),
}
cache={}
def load(key):
    if key in cache: return cache[key]
    path,var=FONTS[key]
    tt=TTFont(path); buf=io.BytesIO(); tt.flavor=None; tt.save(buf); data=buf.getvalue()
    face=hb.Face(hb.Blob(data)); font=hb.Font(face)
    if var: font.set_variations(var)
    upm=face.upem; hh=tt['hhea']
    cache[key]=(font,upm,hh.ascent,hh.descent)
    return cache[key]

def run(text, key, size, x, line_top, line_h, ls, color, rtl=False):
    """Shape `text`, return (svg_path_d_list, advance_px). x is the visual left edge."""
    font,upm,asc,desc=load(key); s=size/upm
    buf=hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    if rtl: buf.direction="rtl"
    hb.shape(font,buf,{"kern":True,"liga":True})
    base = line_top + (line_h - (asc-desc)*s)/2 + asc*s
    paths=[]; pen_x=x
    for info,pos in zip(buf.glyph_infos, buf.glyph_positions):
        sp=SVGPathPen(None)
        tp=TransformPen(sp,(s,0,0,-s,pen_x+pos.x_offset*s, base-pos.y_offset*s))
        font.draw_glyph_with_pen(info.codepoint, tp)
        d=sp.getCommands()
        if d: paths.append(d)
        pen_x+=pos.x_advance*s+ls
    return " ".join(paths), pen_x-x

def fmt(d): # round numbers to 2 decimals for compact output
    import re
    return re.sub(r"-?\d+\.\d+", lambda m: f"{float(m.group()):.2f}".rstrip('0').rstrip('.'), d)

PAL={"light":dict(ink="#121212",accent="#1D4ED8",terra="#D9534F"),
     "dark":dict(ink="#FAF9F6",accent="#7C9BFF",terra="#E8705F")}

def logo_en(p):
    d1,w1=run("Speci","sans",20,0,0,28,-0.7,p["ink"])
    d2,w2=run("men","serifI",20,w1,0,28,-0.7,p["accent"])
    d3,w3=run("DESIGN","mono",9,26,32,9,3.78,p["terra"])
    W=max(w1+w2, 26+w3)
    body=f'<path fill="{p["ink"]}" d="{fmt(d1)}"/><path fill="{p["accent"]}" d="{fmt(d2)}"/><rect x="0" y="36" width="20" height="1" fill="{p["terra"]}"/><path fill="{p["terra"]}" d="{fmt(d3)}"/>'
    return body, W, 41

def logo_he(p):
    # RTL: the word sits on the right; the cobalt full stop follows it on the left. IBM Plex Sans Hebrew, as in the header.
    font_w = lambda t,k,sz,ls: run(t,k,sz,0,0,28,ls,"",rtl=True)[1]
    W=64.94
    wd=font_w("דוגמית","heebo",20,0); wp=font_w(".","heeboLat",20,0)
    d1,_=run("דוגמית","heebo",20,W-wd,0,28,0,p["ink"],rtl=True)
    d2,_=run(".","heeboLat",20,W-wd-wp,0,28,0,p["accent"],rtl=True)
    ww=run("עיצוב","plexHe",12.5,0,32,12.5,0,"",rtl=True)[1]
    d3,_=run("עיצוב","plexHe",12.5,W-20-6-ww,32,12.5,0,p["terra"],rtl=True)
    body=f'<path fill="{p["ink"]}" d="{fmt(d1)}"/><path fill="{p["accent"]}" d="{fmt(d2)}"/><rect x="{W-20:.2f}" y="37.75" width="20" height="1" fill="{p["terra"]}"/><path fill="{p["terra"]}" d="{fmt(d3)}"/>'
    left=min(W-wd-wp, W-26-ww)
    return body, W, 44.5, left

def svg(body, x0, w, h, pad, title, bg=None):
    vb=f"{x0-pad:.2f} {-pad:.2f} {w+2*pad:.2f} {h+2*pad:.2f}"
    rect=f'<rect x="{x0-pad:.2f}" y="{-pad:.2f}" width="{w+2*pad:.2f}" height="{h+2*pad:.2f}" fill="{bg}"/>' if bg else ""
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-label="{title}"><title>{title}</title>{rect}{body}</svg>\n'

OUT="/home/claude/anti-ai-ui-vault/public/brand/"
for mode,p in PAL.items():
    b,W,H=logo_en(p); open(OUT+f"specimen-design-logo-{mode}.svg","w").write(svg(b,0,W,H,4,"Specimen Design"))
    b,W,H,left=logo_he(p); open(OUT+f"specimen-design-logo-he-{mode}.svg","w").write(svg(b,left,W-left,H,4,"דוגמית עיצוב"))

# App icon: the italic serif "S" of the wordmark accent on charcoal, with the terracotta mark
font,upm,asc,desc=load("serifI"); s=46/upm
buf=hb.Buffer(); buf.add_str("S"); buf.guess_segment_properties(); hb.shape(font,buf,{})
adv=buf.glyph_positions[0].x_advance*s
sp=SVGPathPen(None); font.draw_glyph_with_pen(buf.glyph_infos[0].codepoint, TransformPen(sp,(s,0,0,-s,29-adv/2,47)))
icon=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Specimen Design"><title>Specimen Design</title><rect width="64" height="64" rx="14" fill="#121212"/><path fill="#FAF9F6" d="{fmt(sp.getCommands())}"/><circle cx="47" cy="44.5" r="4.5" fill="#D9534F"/></svg>\n'
open(OUT+"specimen-design-icon.svg","w").write(icon)
print("ok", os.listdir(OUT))

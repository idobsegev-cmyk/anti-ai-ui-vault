// Live previews are someone else's code running inside our page. They must never move the page.
// - focus() from inside a preview only goes through right after the visitor touched or typed in
//   that same preview, and never scrolls the page (covers autoFocus too: React calls .focus()).
// - scrollIntoView() from inside a preview is ignored.
const SCOPE = ".preview-scope";
let lastIntent = { scope: null, at: 0 };

function scopeOf(node) {
  return node && node.nodeType === 1 ? node.closest(SCOPE) : null;
}

if (typeof window !== "undefined" && !window.__previewGuard) {
  window.__previewGuard = true;

  const mark = (e) => {
    lastIntent = { scope: scopeOf(e.target), at: performance.now() };
  };
  window.addEventListener("pointerdown", mark, true);
  window.addEventListener("keydown", mark, true);

  const focus = HTMLElement.prototype.focus;
  HTMLElement.prototype.focus = function (opts) {
    const scope = scopeOf(this);
    if (!scope) return focus.call(this, opts);
    const intended = lastIntent.scope === scope && performance.now() - lastIntent.at < 1500;
    if (!intended) return;
    return focus.call(this, { ...(opts || {}), preventScroll: true });
  };

  const intoView = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = function (...args) {
    if (scopeOf(this)) return;
    return intoView.apply(this, args);
  };
}

// Stand-in for next/link inside the single-file artifact: maps site routes to in-page hashes.
export function toHash(href = "") {
  href = href.replace(/^\/he(?=\/|#|$)/, "") || "/";
  if (href === "/" || href === "") return "#top";
  if (href.startsWith("/#")) return href.slice(1);
  if (href.startsWith("#")) return href;
  const m = href.match(/^\/vault\/([a-z0-9-]+)/);
  if (m) return "#c-" + m[1];
  if (href.startsWith("/")) return "#top";
  return href;
}

export default function Link({ href, children, ref, prefetch, scroll, replace, ...rest }) {
  return (
    <a ref={ref} href={toHash(href)} {...rest}>
      {children}
    </a>
  );
}

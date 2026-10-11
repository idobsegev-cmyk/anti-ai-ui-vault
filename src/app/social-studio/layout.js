import "../globals.css";
import "./studio.css";
import { notFound } from "next/navigation";
import { fontClasses } from "@/lib/fonts";
import { PREVIEW_FONTS_URL } from "@/lib/preview-fonts";

// Local-only capture studio for Instagram assets (see social/README.md).
// Production never serves it: it 404s unless the server runs with SOCIAL_STUDIO=1.
export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default function StudioLayout({ children }) {
  if (process.env.SOCIAL_STUDIO !== "1") notFound();
  return (
    <html lang="en" className={fontClasses}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={PREVIEW_FONTS_URL} />
      </head>
      <body className="studio-body">{children}</body>
    </html>
  );
}

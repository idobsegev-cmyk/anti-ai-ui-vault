import SiteShell from "@/components/SiteShell";
import { baseMetadata } from "@/lib/meta";
import { hebrewFontClasses } from "@/lib/fonts-he";

export const metadata = baseMetadata("he");
export const viewport = { themeColor: "#FAF9F6" };

export default function HebrewLayout({ children }) {
  return <SiteShell lang="he" fonts={hebrewFontClasses}>{children}</SiteShell>;
}

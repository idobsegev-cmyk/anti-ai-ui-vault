import SiteShell from "@/components/SiteShell";
import { baseMetadata } from "@/lib/meta";

export const metadata = baseMetadata("he");
export const viewport = { themeColor: "#FAF9F6" };

export default function HebrewLayout({ children }) {
  return <SiteShell lang="he">{children}</SiteShell>;
}

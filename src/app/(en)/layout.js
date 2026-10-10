import SiteShell from "@/components/SiteShell";
import { baseMetadata } from "@/lib/meta";

export const metadata = baseMetadata("en");
export const viewport = { themeColor: "#FAF9F6" };

export default function EnglishLayout({ children }) {
  return <SiteShell lang="en">{children}</SiteShell>;
}

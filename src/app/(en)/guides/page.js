import { GuideHubView, guideMetadata } from "@/views/GuideView";

export const metadata = guideMetadata(null, "en");

export default function Page() {
  return <GuideHubView lang="en" />;
}

import { GuideHubView, guideMetadata } from "@/views/GuideView";

export const metadata = guideMetadata(null, "he");

export default function Page() {
  return <GuideHubView lang="he" />;
}

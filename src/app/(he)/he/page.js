import HomeView, { homeMetadata } from "@/views/HomeView";

export const metadata = homeMetadata("he");

export default function HomeHe() {
  return <HomeView lang="he" />;
}

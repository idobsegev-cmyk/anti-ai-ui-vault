import { ServiceHubView, serviceMetadata } from "@/views/ServiceView";

export const metadata = serviceMetadata(null, "he");

export default function Page() {
  return <ServiceHubView lang="he" />;
}

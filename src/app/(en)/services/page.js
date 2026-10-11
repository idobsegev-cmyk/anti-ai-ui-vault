import { ServiceHubView, serviceMetadata } from "@/views/ServiceView";

export const metadata = serviceMetadata(null, "en");

export default function Page() {
  return <ServiceHubView lang="en" />;
}

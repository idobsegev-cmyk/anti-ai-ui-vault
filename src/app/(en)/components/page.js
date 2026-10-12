import LabView, { labMetadata } from "@/views/LabView";

export const metadata = labMetadata("en");

export default function Page() {
  return <LabView lang="en" />;
}

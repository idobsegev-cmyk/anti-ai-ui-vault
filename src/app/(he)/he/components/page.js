import LabView, { labMetadata } from "@/views/LabView";

export const metadata = labMetadata("he");

export default function Page() {
  return <LabView lang="he" />;
}

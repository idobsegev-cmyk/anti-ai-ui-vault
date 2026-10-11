import ServiceDetailView, { serviceMetadata, serviceParams } from "@/views/ServiceView";

export const dynamicParams = false;
export const generateStaticParams = () => serviceParams();

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return serviceMetadata(slug, "he");
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <ServiceDetailView slug={slug} lang="he" />;
}

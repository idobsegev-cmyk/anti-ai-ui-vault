import DetailView, { detailMetadata, detailParams } from "@/views/DetailView";

export const dynamicParams = false;
export const generateStaticParams = detailParams;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return detailMetadata(slug, "he");
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <DetailView slug={slug} lang="he" />;
}

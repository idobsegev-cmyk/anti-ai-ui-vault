import GuideView, { guideMetadata, guideParams } from "@/views/GuideView";

export const dynamicParams = false;
export const generateStaticParams = () => guideParams();

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return guideMetadata(slug, "he");
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <GuideView slug={slug} lang="he" />;
}

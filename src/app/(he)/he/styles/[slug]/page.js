import CollectionView, { collectionMetadata, collectionParams } from "@/views/CollectionView";

export const dynamicParams = false;
export const generateStaticParams = () => collectionParams("styles");

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return collectionMetadata("styles", slug, "he");
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <CollectionView kind="styles" slug={slug} lang="he" />;
}

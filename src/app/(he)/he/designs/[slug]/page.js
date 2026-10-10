import CollectionView, { collectionMetadata, collectionParams } from "@/views/CollectionView";

export const dynamicParams = false;
export const generateStaticParams = () => collectionParams("designs");

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return collectionMetadata("designs", slug, "he");
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <CollectionView kind="designs" slug={slug} lang="he" />;
}

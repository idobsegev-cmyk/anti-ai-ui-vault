import Studio from "../Studio";

export default async function Page({ params, searchParams }) {
  const { template } = await params;
  const q = await searchParams;
  return <Studio template={template} q={q} />;
}

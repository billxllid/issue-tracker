import Pagination from "./components/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");

  return (
    <div>
      <Pagination currentPage={currentPage} pageSize={10} itemsCount={100} />
    </div>
  );
}

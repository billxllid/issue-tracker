"use client";
import Pagination from "./components/Pagination";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  return (
    <Pagination currentPage={currentPage} pageSize={10} itemsCount={100} />
  );
}

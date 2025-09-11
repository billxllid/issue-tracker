"use client";
import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <Pagination
      currentPage={10}
      pageSize={10}
      onPageChange={() => {}}
      itemsCount={100}
    />
  );
}

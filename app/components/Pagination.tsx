"use client";

import React, { useEffect } from "react";
import { Flex, Text, Button } from "@radix-ui/themes";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  itemsCount: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = ({ itemsCount, currentPage, pageSize }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const lastPage = Math.ceil(itemsCount / pageSize);

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  // 使用useEffect来处理页面重定向，避免在渲染过程中更新Router状态
  useEffect(() => {
    if (lastPage === 0) return;

    if (currentPage < 1) {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      router.push(`?${params.toString()}`);
    } else if (currentPage > lastPage) {
      const params = new URLSearchParams(searchParams);
      params.set("page", lastPage.toString());
      router.push(`?${params.toString()}`);
    }
  }, [currentPage, lastPage, searchParams, router]);

  if (lastPage === 0) return null;

  return (
    <Flex align="center" gap="2">
      <Text size="2" color="gray">
        Page {currentPage} of {lastPage}
      </Text>
      <Button
        color="gray"
        variant="soft"
        onClick={() => changePage(1)}
        disabled={currentPage === 1 || itemsCount === 0}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1 || itemsCount === 0}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === lastPage || itemsCount === 0}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        onClick={() => changePage(lastPage)}
        disabled={currentPage === lastPage || itemsCount === 0}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;

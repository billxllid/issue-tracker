"use client";

import React from "react";
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

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Flex align="center" gap="2">
      <Text size="2" color="gray">
        Page {currentPage} of {Math.ceil(itemsCount / pageSize)}
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
        disabled={
          currentPage === Math.ceil(itemsCount / pageSize) || itemsCount === 0
        }
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        onClick={() => changePage(Math.ceil(itemsCount / pageSize))}
        disabled={
          currentPage === Math.ceil(itemsCount / pageSize) || itemsCount === 0
        }
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;

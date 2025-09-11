"use client";

import React from "react";
import { Flex, Text, Button } from "@radix-ui/themes";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

interface PaginationProps {
  itemsCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  itemsCount,
  currentPage,
  pageSize,
  onPageChange,
}: PaginationProps) => {
  return (
    <Flex align="center" gap="2">
      <Text size="2" color="gray">
        Page {currentPage} of {Math.ceil(itemsCount / pageSize)}
      </Text>
      <Button
        color="gray"
        variant="soft"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1 || itemsCount === 0}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || itemsCount === 0}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={
          currentPage === Math.ceil(itemsCount / pageSize) || itemsCount === 0
        }
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        onClick={() => onPageChange(Math.ceil(itemsCount / pageSize))}
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

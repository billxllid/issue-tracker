import React from "react";
import prisma from "@/lib/prisma";
import { Pagination } from "@/app/components";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@/app/generated/prisma/client";
import IssueTable, { columnsNames, IssueQueryParams } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface IssuesPageProps {
  searchParams: Promise<IssueQueryParams>;
}

const IssuesPage = async ({ searchParams }: IssuesPageProps) => {
  // wait for the search params to be resolved
  const params = await searchParams;
  // check if the status is a valid status
  const status = Object.values(Status).includes(params.status as Status)
    ? (params.status as Status)
    : undefined;

  // Order by
  const orderBy = columnsNames.includes(params.orderBy as keyof Issue)
    ? {
        [params.orderBy as keyof Issue]:
          params.orderDirection === "asc" ? "asc" : "desc",
      }
    : {};

  // Where
  const where = {
    status,
  };

  // Pagination
  const page = parseInt(params.page || "1");
  const pageSize = 5;
  const itemsCount = await prisma.issue.count({
    where,
  });
  const skip = (page - 1) * pageSize;

  // Get the issues
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip,
    take: pageSize,
  });

  return (
    <Flex direction="column" gap="4">
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemsCount={itemsCount}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issues List",
  description: "View all issues",
};

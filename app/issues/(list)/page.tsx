import React from "react";
import { Table } from "@radix-ui/themes";
import prisma from "@/lib/prisma";
import { IssueStatusBadge, Link, Pagination } from "@/app/components";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@/app/generated/prisma/client";
import NextLink from "next/link";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    status?: Status;
    orderBy?: keyof Issue;
    orderDirection?: "asc" | "desc";
    page?: string;
  }>;
}) => {
  // Columns
  const columns: { label: string; key: keyof Issue; className?: string }[] = [
    { label: "Issue", key: "title" },
    { label: "Status", key: "status", className: "hidden md:table-cell" },
    { label: "Created", key: "createdAt", className: "hidden md:table-cell" },
    { label: "Updated", key: "updatedAt", className: "hidden md:table-cell" },
  ];
  // wait for the search params to be resolved
  const params = await searchParams;
  // check if the status is a valid status
  const status = Object.values(Status).includes(params.status as Status)
    ? (params.status as Status)
    : undefined;

  // Order by
  const orderBy = columns
    .map((column) => column.key)
    .includes(params.orderBy as keyof Issue)
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
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.key}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: {
                      ...params,
                      orderBy: column.key,
                      orderDirection:
                        params.orderDirection === "asc" ? "desc" : "asc",
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {params.orderBy === column.key &&
                  (params.orderDirection === "asc" ? (
                    <AiFillCaretUp className="inline-block" />
                  ) : (
                    <AiFillCaretDown className="inline-block" />
                  ))}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toLocaleDateString()}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.updatedAt.toLocaleDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        className="mt-5"
        currentPage={page}
        pageSize={pageSize}
        itemsCount={itemsCount}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;

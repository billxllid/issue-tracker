import React from "react";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { Issue, Status } from "@/app/generated/prisma/client";
import { IssueStatusBadge, Link } from "@/app/components";

export interface IssueQueryParams {
  status?: Status;
  orderBy?: keyof Issue;
  orderDirection?: "asc" | "desc";
  page?: string;
}

interface IssueTableProps {
  searchParams: Promise<IssueQueryParams>;
  issues: Issue[];
}

const IssueTable = async ({ issues, searchParams }: IssueTableProps) => {
  const params = await searchParams;
  return (
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
  );
};

const columns: {
  label: string;
  key: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", key: "title" },
  { label: "Status", key: "status", className: "hidden md:table-cell" },
  { label: "Created", key: "createdAt", className: "hidden md:table-cell" },
  { label: "Updated", key: "updatedAt", className: "hidden md:table-cell" },
];

export const columnsNames = columns.map((column) => column.key);

export default IssueTable;

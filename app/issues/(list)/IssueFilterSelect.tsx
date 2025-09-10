"use client";

import { Select } from "@radix-ui/themes";
import React from "react";
import { Status } from "@/app/generated/prisma/client";
import { useRouter } from "next/navigation";

const statuses: { label: string; value?: Status | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueFilterSelect = () => {
  const router = useRouter();

  const handleChange = (value: string) => {
    const query = value === "ALL" ? "" : `?status=${value}`;
    router.push(`/issues${query}`);
  };

  return (
    <Select.Root defaultValue="ALL" onValueChange={handleChange}>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item
            key={status.value || "ALL"}
            value={status.value || "ALL"}
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueFilterSelect;

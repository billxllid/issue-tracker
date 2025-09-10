"use client";

import { Select } from "@radix-ui/themes";
import React from "react";
import { Status } from "@/app/generated/prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value: Status | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueFilterSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const query = new URLSearchParams(searchParams);
    if (value === "ALL") {
      query.delete("status");
    } else {
      query.set("status", value);
    }
    router.push(`/issues?${query.toString()}`);
  };

  const currentStatus = searchParams.get("status") ?? "ALL";

  return (
    <Select.Root value={currentStatus} onValueChange={handleChange}>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueFilterSelect;

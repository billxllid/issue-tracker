"use client";

import React from "react";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { User, Issue } from "@/app/generated/prisma/client";
import axios from "axios";
import Skeleton from "@/app/components/Skeleton";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 1 minute
    retry: 3,
  });

  if (error) return null;
  if (isLoading) return <Skeleton height="2rem" />;

  return (
    <Select.Root
      defaultValue={issue.assignedToId ? issue.assignedToId : "unassigned"}
      onValueChange={(value) => {
        axios.patch(`/api/issues/${issue.id}`, {
          assignedToId: value === "unassigned" ? null : value,
        });
      }}
    >
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;

"use client";

import React from "react";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { User, Issue } from "@/app/generated/prisma/client";
import axios from "axios";
import Skeleton from "@/app/components/Skeleton";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (error) return null;
  if (isLoading) return <Skeleton height="2rem" />;

  const assignee = (value: string) => {
    toast.promise(
      axios.patch(`/api/issues/${issue.id}`, {
        assignedToId: value === "unassigned" ? null : value,
      }),
      {
        loading: "Assigning...",
        success: "Assigned",
        error: "Failed to assign",
      }
    );
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToId ? issue.assignedToId : "unassigned"}
        onValueChange={assignee}
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
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 600 * 1000, // 10 minute
    retry: 3,
  });

export default AssigneeSelect;

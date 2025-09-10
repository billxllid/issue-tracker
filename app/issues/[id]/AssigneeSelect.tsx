"use client";

import React, { useState, useEffect } from "react";
import { Select } from "@radix-ui/themes";
import { User } from "@/app/generated/prisma/client";
import axios from "axios";

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      // const { data } = await axios.get<User[]>("/api/users");
      const data = await fetch("/api/users").then<User[]>((res) => res.json());
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
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

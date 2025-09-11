import React from "react";
import { Status } from "@/app/generated/prisma";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummery = ({ open, inProgress, closed }: Props) => {
  const container: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4" justify="between">
      {container.map((item) => (
        <Card key={item.label} variant="surface" className="w-full h-24">
          <Flex direction="column" gap="4">
            <Link
              className="text-sm font-medium"
              href={`/issues?status=${item.status}`}
            >
              {item.label}
            </Link>
            <Text size="5" className="font-bold">
              {item.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummery;

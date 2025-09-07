import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@/app/generated/prisma";
import { Heading, Flex, Text, Card } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";
import { ClockIcon, UpdateIcon } from "@radix-ui/react-icons";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  const IssueDate = [
    {
      label: "Created",
      icon: ClockIcon,
      date: issue.createdAt,
    },
    {
      label: "Updated",
      icon: UpdateIcon,
      date: issue.updatedAt,
    },
  ];

  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" my="2" align="center">
        <IssueStatusBadge status={issue.status} />
        {IssueDate.map((date) => (
          <Flex key={date.label} align="center" gap="1">
            <date.icon />
            <Text className="text-sm">{date.date.toDateString()}</Text>
          </Flex>
        ))}
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditIssueClient from "./EditIssueClient";

const EditIssuePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) {
    notFound();
  }

  return <EditIssueClient issue={issue} />;
};

export default EditIssuePage;

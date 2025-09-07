"use client";

import dynamic from "next/dynamic";
import { Issue } from "@/app/generated/prisma";
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  issue: Issue;
}

const EditIssueClient = ({ issue }: Props) => {
  return <IssueForm initialValues={issue} />;
};

export default EditIssueClient;

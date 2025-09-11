import LatestIssues from "./LatestIssues";
import IssueSummery from "./IssueSummery";
import prisma from "@/lib/prisma";
import { Status } from "./generated/prisma";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({
    where: {
      status: Status.OPEN,
    },
  });
  const inProgress = await prisma.issue.count({
    where: {
      status: Status.IN_PROGRESS,
    },
  });
  const closed = await prisma.issue.count({
    where: {
      status: Status.CLOSED,
    },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <Flex direction="column" gap="4">
        <IssueSummery open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker Dashboard",
  description: "View a summary of the project's issues",
};

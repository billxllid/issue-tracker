import LatestIssues from "./LatestIssues";
import IssueSummery from "./IssueSummery";
import prisma from "@/lib/prisma";
import { Status } from "./generated/prisma";
import IssueChart from "./IssueChart";

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
    <div>
      {/* <LatestIssues /> */}
      {/* <IssueSummery open={open} inProgress={inProgress} closed={closed} /> */}
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
    </div>
  );
}

import LatestIssues from "./LatestIssues";
import IssueSummery from "./IssueSummery";

export default async function Home() {
  return (
    <div>
      {/* <LatestIssues /> */}
      <IssueSummery open={1} inProgress={2} closed={3} />
    </div>
  );
}

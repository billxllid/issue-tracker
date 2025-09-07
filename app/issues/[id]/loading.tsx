import ReactSkeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Flex, Card, Box } from "@radix-ui/themes";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <ReactSkeleton />
      <Flex gap="4" my="2">
        <ReactSkeleton width="5rem" />
        <ReactSkeleton width="8rem" />
        <ReactSkeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <ReactSkeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;

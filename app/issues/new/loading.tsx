import { Box } from "@radix-ui/themes";
import ReactSkeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingNewIssuePage = () => {
  return (
    <Box className="max-w-xl">
      <ReactSkeleton />
      <ReactSkeleton height="20rem" />
    </Box>
  );
};

export default LoadingNewIssuePage;

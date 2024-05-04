import { Box, Skeleton } from "@radix-ui/themes";

const IssueFormLoading = () => {
    return (
        <Box className="max-w-4xl">
            <Skeleton height="2rem" mb="1rem" />
            <Skeleton height="24rem" />
        </Box>
    );
};

export default IssueFormLoading;

import { Box, Skeleton } from "@radix-ui/themes";

const NewIssuePageLoading = () => {
    return (
        <Box className="max-w-xl">
            <Skeleton />
            <Skeleton />
        </Box>
    );
};

export default NewIssuePageLoading;

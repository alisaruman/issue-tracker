import { Flex, Card, Box, Skeleton } from "@radix-ui/themes";

const IssueDetailPageLoading = () => {
    return (
        <Box className="max-w-xl">
            <Skeleton height="2rem" />
            <Flex gap="3" my="2">
                <Skeleton width="5rem" />
                <Skeleton width="8rem" />
            </Flex>
            <Card className="prose" mt="4">
                <Skeleton height="8rem" />
            </Card>
        </Box>
    );
};

export default IssueDetailPageLoading;

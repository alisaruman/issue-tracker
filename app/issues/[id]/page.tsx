import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueDetail from "./IssueDetail";
import IssueEditButton from "./IssueEditButton";
import IssueDeleteButton from "./IssueDeleteButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

interface Props {
    params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions);

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id),
        },
    });

    if (!issue) notFound();

    return (
        <Grid columns={{ initial: "1", sm: "5" }} className="gap-5">
            <Box className="md:col-span-4">
                <IssueDetail issue={issue} />
            </Box>
            {session && (
                <Box>
                    <Flex direction="column" gap="3">
                        <IssueEditButton issueId={issue.id} />
                        <IssueDeleteButton issueId={issue.id} />
                    </Flex>
                </Box>
            )}
        </Grid>
    );
};

export const dynamic = "force-dynamic";

export default IssueDetailPage;

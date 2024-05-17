import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";
import IssueDeleteButton from "./IssueDeleteButton";
import IssueDetail from "./IssueDetail";
import IssueEditButton from "./IssueEditButton";

interface Props {
    params: { id: string };
}

const fetchUser = cache((issueId: number) => {
    return prisma.issue.findUnique({ where: { id: issueId } });
});

const IssueDetailPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions);

    const issue = await fetchUser(parseInt(params.id));

    if (!issue) notFound();

    return (
        <Grid columns={{ initial: "1", sm: "5" }} className="gap-5">
            <Box className="md:col-span-4">
                <IssueDetail issue={issue} />
            </Box>
            {session && (
                <Box>
                    <Flex direction="column" gap="3">
                        <AssigneeSelect issue={issue} />
                        <IssueEditButton issueId={issue.id} />
                        <IssueDeleteButton issueId={issue.id} />
                    </Flex>
                </Box>
            )}
        </Grid>
    );
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
    const issue = await fetchUser(parseInt(params.id));

    return {
        title: issue?.title,
        description: issue?.description,
    };
}

export default IssueDetailPage;

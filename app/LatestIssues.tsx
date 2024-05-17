import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
    const issues = await prisma.issue.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 5,
        include: {
            assignedToUser: true,
        },
    });

    return (
        <Card>
            <Heading size="4" mb="5">
                Latest issues
            </Heading>
            <Flex direction="column">
                <Table.Root>
                    <Table.Body>
                        {issues.map((issue) => (
                            <Table.Row key={issue.id}>
                                <Table.Cell>
                                    <Flex justify="between" align="start">
                                        <Flex
                                            direction="column"
                                            gap="2"
                                            align="start"
                                        >
                                            <Link href={`/issues/${issue.id}`}>
                                                {issue.title}
                                            </Link>
                                            <IssueStatusBadge
                                                status={issue.status}
                                            />
                                        </Flex>
                                        {issue.assignedToUser && (
                                            <Avatar
                                                fallback="?"
                                                src={
                                                    issue.assignedToUser.image!
                                                }
                                                radius="full"
                                                size="2"
                                            />
                                        )}
                                    </Flex>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Flex>
        </Card>
    );
};

export default LatestIssues;

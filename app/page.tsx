import Image from "next/image";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

const Home = async () => {
    const open = await prisma.issue.count({ where: { status: "OPEN" } });
    const inProgress = await prisma.issue.count({
        where: { status: "IN_PROGRESS" },
    });
    const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

    const issueProps = {
        open,
        closed,
        inProgress,
    };

    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Flex direction="column" gap="5">
                <IssueSummary issueProps={issueProps} />
                <IssueChart issueProps={issueProps} />
            </Flex>
            <LatestIssues />
        </Grid>
    );
};

export const metadata: Metadata = {
    title: "Issue Tracker - Dashboard",
    description: "An app for tracking and assigning issues",
};

export default Home;

import prisma from "@/prisma/client";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormLoading from "./loading";

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
    ssr: false,
    loading: () => <IssueFormLoading />,
});

interface Props {
    params: { id: string };
}

const IssueEditPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id),
        },
    });

    if (!issue) notFound();

    return <IssueForm issue={issue} />;
};

export const metadata: Metadata = {
    title: "Issue Tracker - Edit",
    description: "Edit an issue",
};

export default IssueEditPage;

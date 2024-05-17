import { Metadata } from "next";
import dynamic from "next/dynamic";
import IssueFormLoading from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
    ssr: false,
    loading: () => <IssueFormLoading />,
});

const IssueNew = () => {
    return <IssueForm />;
};

export const metadata: Metadata = {
    title: "Issue Tracker - New issue",
    description: "Create an issue",
};

export default IssueNew;

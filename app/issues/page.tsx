import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueActions from "./list/IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./list/IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
    searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined;
    const where = { status };

    const orderBy = columnNames.includes(searchParams.orderBy)
        ? { [searchParams.orderBy]: "asc" }
        : undefined;

    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;

    const issues = await prisma.issue.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const issueCount = await prisma.issue.count({ where });

    return (
        <Flex gap="3" direction="column">
            <IssueActions />
            <IssueTable issues={issues} searchParams={searchParams} />
            <Pagination
                currentPage={page}
                pageSize={pageSize}
                itemCount={issueCount}
            />
        </Flex>
    );
};

export default IssuesPage;

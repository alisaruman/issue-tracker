import { Skeleton, Table } from "@radix-ui/themes";
import IssueActions from "./list/IssueActions";

const IssuesLoadingPage = () => {
    const issues = [1, 2, 3, 4, 5];

    return (
        <div>
            <IssueActions />
            <Table.Root className="rt-variant-surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">
                            Status
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">
                            Created
                        </Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue}>
                            <Table.Cell>
                                <Skeleton minHeight="25px" />
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <Skeleton minHeight="25px" />
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <Skeleton minHeight="25px" />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
};

export default IssuesLoadingPage;

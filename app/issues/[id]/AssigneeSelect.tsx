"use client";
import { Issue, User } from "@prisma/client";
import { Select, Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
        staleTime: 60 * 1000, //60s
        retry: 3,
    });

    if (isLoading) return <Skeleton width="100%" height="2rem" />;

    if (error) return null;

    return (
        <Select.Root
            defaultValue={issue.assignedToUserId || ""}
            onValueChange={(userId) => {
                axios.patch(`/api/issues/${issue.id}`, {
                    assignedToUserId: userId === "unassigned" ? null : userId,
                });
            }}
        >
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value="unassigned">Unassigned</Select.Item>
                    {data?.map((user) => (
                        <Select.Item key={user.id} value={user.id}>
                            {user.name}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssigneeSelect;

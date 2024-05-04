"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const IssueDeleteButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter();
    const [error, setError] = useState(false);

    const deleteIssue = async () => {
        try {
            await axios.delete(`/api/issues/${issueId}`);
            router.push("/issues");
            router.refresh();
        } catch (error) {
            setError(true);
        }
    };

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red">Delete Issue</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Deletion.</AlertDialog.Title>
                    <AlertDialog.Description>
                        Are you sure you want delete this issue? this action
                        cannot be undone.
                    </AlertDialog.Description>
                    <Flex gap="3" mt="4">
                        <AlertDialog.Cancel>
                            <Button color="gray" variant="soft">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button color="red" onClick={deleteIssue}>
                                Delete
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error!</AlertDialog.Title>
                    <AlertDialog.Description>
                        An error occured during deleting this issue.
                    </AlertDialog.Description>
                    <AlertDialog.Cancel>
                        <Button
                            color="gray"
                            variant="soft"
                            onClick={() => setError(false)}
                            mt="4"
                        >
                            OK
                        </Button>
                    </AlertDialog.Cancel>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    );
};

export default IssueDeleteButton;

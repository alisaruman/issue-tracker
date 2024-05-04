import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";

const IssueDeleteButton = ({ issueId }: { issueId: number }) => {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color="red">Delete Issue</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Confirm Deletion.</AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure you want delete this issue? this action cannot
                    be undone.
                </AlertDialog.Description>
                <Flex gap="3" mt="4">
                    <AlertDialog.Cancel>
                        <Button color="gray" variant="soft">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button color="red">Delete</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

export default IssueDeleteButton;

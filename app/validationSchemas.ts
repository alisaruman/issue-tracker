import { z } from "zod";

export const issueSchema = z.object({
    title: z.string().min(1, "Title is required.").max(255),
    description: z.string().min(1),
});

export const patchIssueSchema = z.object({
    title: z.string().min(1, "Title is empty").max(255).optional(),
    description: z.string().min(1).max(65535).optional(),
    assignedToUserId: z.string().min(1).max(255).optional().nullable(),
});

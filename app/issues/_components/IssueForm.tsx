"use client";
import { ErrorMessage } from "@/app/components/index";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type issueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<issueFormData>({
        resolver: zodResolver(issueSchema),
    });
    const router = useRouter();
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
            if (issue) await axios.patch("/api/issues/" + issue.id, data);
            else await axios.post("/api/issues/", data);
            router.push("/issues");
            router.refresh();
        } catch (error) {
            setIsSubmitting(false);
            setError("An error has occurred.");
        }
    });

    return (
        <div className="max-w-4xl">
            {error && (
                <Callout.Root color="red" className="mb-5">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form className="space-y-3" onSubmit={onSubmit}>
                <TextField.Root
                    defaultValue={issue?.title}
                    placeholder="Title"
                    {...register("title")}
                />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => (
                        <SimpleMDE placeholder="description" {...field} />
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    {issue ? "Update issue" : "Submit New Issue"}{" "}
                    {isSubmitting && <Spinner size="2" />}
                </Button>
            </form>
        </div>
    );
};

export default IssueForm;

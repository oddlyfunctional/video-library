import { useState } from "react";
import { NewVideoSchema, type NewVideo } from "../../../core/video.ts";
import { trpc } from "../../trpc.ts";
import { TagsInput } from "./TagsInput.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "../../components/Input.tsx";
import { Button } from "../../components/Button.tsx";
import type { z } from "zod/mini";

type Errors = Partial<Record<keyof NewVideo, string>>;

const formatError = (code: z.core.$ZodIssue["code"]) => {
  switch (code) {
    case "too_small":
      return "required";
    default:
      return "something went wrong";
  }
};

const Error = ({ message }: { message: string }) => (
  <p className="text-red-700">{message}</p>
);

export const NewVideoPage = () => {
  const [errors, setErrors] = useState<Errors>({});
  const [tags, setTags] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const createVideoMutation = useMutation(
    trpc.createVideo.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.listVideos.pathKey() });
      },
    }),
  );

  const submit = async (form: HTMLFormElement) => {
    const formData = new FormData(form);

    const result = NewVideoSchema.safeParse({
      ...Object.fromEntries(formData.entries()),
      tags,
    });

    if (result.success) {
      await createVideoMutation.mutate(result.data);
      form.reset();
      setTags([]);
      setErrors({});
    } else {
      const errors = result.error.issues.reduce((errors, issue) => {
        // I guarantee that the path is flat and a valid error key
        errors[issue.path[0] as keyof Errors] = formatError(issue.code);
        return errors;
      }, {} as Errors);
      setErrors(errors);
    }
  };

  return (
    <>
      <h1 className="text-3xl mb-8">Create a new video</h1>

      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          submit(ev.currentTarget);
        }}
      >
        <label className="font-semibold block mb-4">
          *Title
          <Input
            type="text"
            name="title"
            placeholder="Title of your video (e.g. Best cats compilation 2025)"
          />
          {errors.title && <Error message={errors.title} />}
        </label>

        <label className="font-semibold block mb-8">
          Tags
          <TagsInput tags={tags} onSetTags={setTags} />
        </label>

        {createVideoMutation.isError && (
          <Error message={createVideoMutation.error.message} />
        )}
        <Button type="submit" disabled={createVideoMutation.isPending}>
          {createVideoMutation.isPending ? "Creating..." : "Create"}
        </Button>
      </form>
    </>
  );
};

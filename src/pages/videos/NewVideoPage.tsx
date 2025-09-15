import { useState } from "react";
import { NewVideoSchema, type NewVideo } from "../../../core/video.ts";
import { trpc } from "../../trpc.ts";
import { TagsInput } from "./TagsInput.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Errors = Partial<Record<keyof NewVideo, string>>;

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

  return (
    <form
      onSubmit={async (ev) => {
        ev.preventDefault();
        const form = ev.currentTarget;
        const formData = new FormData(form);

        const result = NewVideoSchema.safeParse({
          ...Object.fromEntries(formData.entries()),
          tags,
        });

        if (result.success) {
          await createVideoMutation.mutate(result.data);
          form.reset();
          setTags([]);
        } else {
          const errors = result.error.issues.reduce((errors, issue) => {
            // I guarantee that the path is flat and a valid error key
            errors[issue.path[0] as keyof Errors] = issue.message;
            return errors;
          }, {} as Errors);
          setErrors(errors);
        }
      }}
    >
      <input type="text" name="title" placeholder="title" />
      {errors.title && <p>{errors.title}</p>}

      <TagsInput tags={tags} onSetTags={setTags} />

      <button type="submit">submit</button>
    </form>
  );
};

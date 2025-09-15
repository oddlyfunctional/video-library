import { useState } from "react";
import { NewVideoSchema, type NewVideo } from "../../../core/video.ts";
import { trpc } from "../../trpc.ts";
import { TagsInput } from "./TagsInput.tsx";

type Errors = Partial<Record<keyof NewVideo, string>>;

export const NewVideoPage = () => {
  const [errors, setErrors] = useState<Errors>({});
  const [tags, setTags] = useState<string[]>([]);

  return (
    <form
      onSubmit={async (ev) => {
        ev.preventDefault();
        const formData = new FormData(ev.currentTarget);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newVideo: Record<string, any> = Object.fromEntries(
          formData.entries(),
        );
        newVideo.tags = tags;

        const result = NewVideoSchema.safeParse(newVideo);

        if (result.success) {
          await trpc.createVideo.mutate(result.data);
          // TODO: handle cache invalidation instead of reloading page
          window.location.reload();
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

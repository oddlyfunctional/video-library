import { useState } from "react";
import { NewVideoSchema, type NewVideo } from "../../../core/video.ts";
import { trpc } from "../../trpc.ts";

type Errors = Partial<Record<keyof NewVideo, string>>;

export const NewVideoPage = () => {
  const [errors, setErrors] = useState<Errors>({});

  return (
    <form
      onSubmit={async (ev) => {
        ev.preventDefault();
        const formData = new FormData(ev.currentTarget);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newVideo: Record<string, any> = Object.fromEntries(
          Array.from(formData.entries()).map(([key, value]) => {
            // map fields to correct types
            switch (key) {
              case "duration":
                return [key, Number(value)];
              case "tags":
                return [key, (value as string).split(",").filter(Boolean)];
              default:
                return [key, value];
            }
          }),
        );

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

      <input type="text" name="thumbnail_url" placeholder="thumbnail url" />
      {errors.thumbnail_url && <p>{errors.thumbnail_url}</p>}

      <input type="number" name="duration" placeholder="duration" />
      {errors.duration && <p>{errors.duration}</p>}

      <input type="text" name="tags" placeholder="tags" />
      {errors.tags && <p>{errors.tags}</p>}

      <button type="submit">submit</button>
    </form>
  );
};

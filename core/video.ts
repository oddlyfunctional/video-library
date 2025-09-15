import { z } from "zod/mini";

export const VideoSchema = z.object({
  id: z.number(),
  title: z.string().check(z.minLength(1)),
  thumbnail_url: z.url(),
  created_at: z.iso.datetime(),
  duration: z.number().check(z.nonnegative()),
  views: z.int().check(z.nonnegative()),
  tags: z.array(z.string().check(z.minLength(1))),
});

export type Video = z.infer<typeof VideoSchema>;

export const NewVideoSchema = z.pick(VideoSchema, {
  title: true,
  tags: true,
});

export type NewVideo = z.infer<typeof NewVideoSchema>;

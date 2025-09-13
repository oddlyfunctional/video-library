import { z } from "zod/mini";

export const schema = z.object({
  id: z.string().check(z.minLength(1)),
  title: z.string().check(z.minLength(1)),
  thumbnail_url: z.url(),
  created_at: z.iso.datetime(),
  duration: z.number().check(z.nonnegative()),
  views: z.int().check(z.nonnegative()),
  tags: z.array(z.string().check(z.minLength(1))),
});

export type Video = z.infer<typeof schema>;

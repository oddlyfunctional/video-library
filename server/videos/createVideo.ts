import { Kysely } from "kysely";
import type { Database } from "../../db/types";
import { NewVideoSchema, type NewVideo } from "../../core/video.ts";
import { publicProcedure } from "../trpc.ts";

const randomInt = () => Math.floor(Math.random() * 1_000);

export const createVideo = (db: Kysely<Database>, video: NewVideo) => {
  return db
    .insertInto("videos")
    .values({
      ...video,
      duration: randomInt(),
      thumbnail_url: `https://picsum.photos/seed/video${randomInt()}/300/200`,
      views: randomInt(),
    })
    .returningAll()
    .executeTakeFirstOrThrow();
};

export const createVideoMutation = (db: Kysely<Database>) =>
  publicProcedure
    .input(NewVideoSchema)
    .mutation((opts) => createVideo(db, opts.input));

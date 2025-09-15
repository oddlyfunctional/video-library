import type { Kysely } from "kysely";
import { Database } from "../db/types.ts";
import { z } from "zod/mini";
import videosJSON from "../seed.json" with { type: "json" };
import { VideoSchema } from "../core/video.ts";

export async function seed(db: Kysely<Database>): Promise<void> {
  const { videos } = z
    .object({ videos: z.array(z.omit(VideoSchema, { id: true })) })
    .parse(videosJSON);
  await db
    .insertInto("videos")
    .values(videos.map((video) => ({ ...video, id: undefined })))
    .execute();
}

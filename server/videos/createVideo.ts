import { type Insertable, Kysely } from "kysely";
import type { Database } from "../../db/types";

export const createVideo = (
  db: Kysely<Database>,
  video: Insertable<Database["videos"]>,
) =>
  db
    .insertInto("videos")
    .values(video)
    .returningAll()
    .executeTakeFirstOrThrow();

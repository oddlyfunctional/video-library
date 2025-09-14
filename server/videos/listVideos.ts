import { Kysely } from "kysely";
import { type Database } from "../../db/types.ts";

// TODO: add pagination?
export const listVideos = async (db: Kysely<Database>) => {
  return await db.selectFrom("videos").selectAll().execute();
};

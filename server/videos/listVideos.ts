import { Kysely } from "kysely";
import type { Database } from "../../db/types.ts";
import { publicProcedure } from "../trpc.ts";
import { z } from "zod/mini";

const QueryParamsSchema = z.object({
  orderBy: z.object({
    column: z.enum(["created_at"]),
    direction: z.enum(["asc", "desc"]),
  }),
});

type QueryParams = z.infer<typeof QueryParamsSchema>;

// TODO: add pagination?
export const listVideos = async (
  db: Kysely<Database>,
  { orderBy }: QueryParams,
) => {
  return await db
    .selectFrom("videos")
    .orderBy(orderBy.column, orderBy.direction)
    .selectAll()
    .execute();
};

export const listVideosQuery = (db: Kysely<Database>) =>
  publicProcedure.input(QueryParamsSchema).query((opts) =>
    listVideos(db, {
      orderBy: {
        column: opts.input.orderBy.column,
        direction: opts.input.orderBy.direction,
      },
    }),
  );

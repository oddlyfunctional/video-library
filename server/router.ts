import { listVideos } from "./videos/listVideos.ts";
import { makeDb } from "../db/index.ts";
import { type Database } from "../db/types.ts";
import { publicProcedure, router } from "./trpc.ts";

// TODO: close connections when shutting down the server
const db = makeDb<Database>();

export const appRouter = router({
  listVideos: publicProcedure.query(() => listVideos(db)),
});
export type AppRouter = typeof appRouter;

import { listVideos } from "./videos/listVideos.ts";
import { createVideo } from "./videos/createVideo.ts";
import { makeDb } from "../db/index.ts";
import { type Database } from "../db/types.ts";
import { publicProcedure, router } from "./trpc.ts";
import { NewVideoSchema } from "../core/video.ts";

// TODO: close connections when shutting down the server
const db = makeDb<Database>();

export const appRouter = router({
  listVideos: publicProcedure.query(() => listVideos(db)),
  createVideo: publicProcedure
    .input(NewVideoSchema)
    .mutation((opts) => createVideo(db, opts.input)),
});
export type AppRouter = typeof appRouter;

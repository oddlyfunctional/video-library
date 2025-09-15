import { listVideosQuery } from "./videos/listVideos.ts";
import { createVideoMutation } from "./videos/createVideo.ts";
import { makeDb } from "../db/index.ts";
import { type Database } from "../db/types.ts";
import { router } from "./trpc.ts";

// TODO: close connections when shutting down the server
const db = makeDb<Database>();

export const appRouter = router({
  listVideos: listVideosQuery(db),
  createVideo: createVideoMutation(db),
});
export type AppRouter = typeof appRouter;

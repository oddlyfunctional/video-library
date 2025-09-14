import express from "express";
import { PORT } from "./config.ts";
import { listVideos } from "./videos/listVideos.ts";
import { makeDb } from "../db/index.ts";
import { type Database } from "../db/types.ts";

// TODO: close connections when shutting down the server
const db = makeDb<Database>();
const app = express();

app.get("/api/videos", async (_req, res) => {
  try {
    res.json(await listVideos(db));
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

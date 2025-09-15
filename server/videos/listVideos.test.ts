import { afterAll, beforeEach, describe, expect, test } from "vitest";
import { listVideos } from "./listVideos";
import { makeDb } from "../../db/index.ts";
import type { Database } from "../../db/types.ts";
import { Pool } from "pg";
import { DB_CONFIG } from "../config.ts";

describe("listVideos", () => {
  const pg = new Pool({ ...DB_CONFIG, database: "videos_test" });
  const db = makeDb<Database>(pg);
  beforeEach(async () => await pg.query("TRUNCATE videos"));
  afterAll(async () => await db.destroy());

  test("allows choosing sort direction", async () => {
    const baseVideo = {
      tags: [],
      duration: 0,
      thumbnail_url: "http://some.url",
    };
    await db
      .insertInto("videos")
      .values([
        { ...baseVideo, title: "older", created_at: "2025-01-01 00:00:00" },
        { ...baseVideo, title: "newer", created_at: "2025-01-02 00:00:00" },
      ])
      .execute();

    const asc = await listVideos(db, {
      orderBy: { column: "created_at", direction: "asc" },
    });
    const desc = await listVideos(db, {
      orderBy: { column: "created_at", direction: "desc" },
    });

    expect(asc.map((v) => v.title)).toEqual(["older", "newer"]);
    expect(desc.map((v) => v.title)).toEqual(["newer", "older"]);
  });
});

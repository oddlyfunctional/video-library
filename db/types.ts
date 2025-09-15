import type { Generated, ColumnType, Selectable } from "kysely";
import type { Video } from "../core/video.ts";
import { expectType, type Equals } from "../lib/typeAssertions.ts";

export type Database = {
  videos: VideosTable;
};

export type VideosTable = {
  id: Generated<number>;
  title: string;
  thumbnail_url: string;
  created_at: ColumnType<string, string | undefined, never>;
  duration: number;
  views: ColumnType<number, number | undefined, number>;
  tags: string[];
};

expectType<Equals<Selectable<VideosTable>, Video>>(true);

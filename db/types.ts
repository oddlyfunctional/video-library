import { type ColumnType } from "kysely";

export type Database = {
  videos: VideosTable;
};

export type VideosTable = {
  id: string;
  title: string;
  thumbnail_url: string;
  created_at: ColumnType<Date, never, never>;
  duration: number;
  views: ColumnType<number, never, never>;
  tags: string[];
};

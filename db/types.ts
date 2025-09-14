import { type ColumnType } from "kysely";

export type Database = {
  videos: VideosTable;
};

export type VideosTable = {
  id: string;
  title: string;
  thumbnail_url: string;
  created_at: ColumnType<Date, string, never>;
  duration: number;
  views: number;
  tags: string[];
};

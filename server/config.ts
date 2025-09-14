import "dotenv/config";
import { type PoolConfig } from "pg";

export const PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 3000;

export const DB_CONFIG = {
  host: process.env.DB_HOST ?? "localhost",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  database: process.env.DB_NAME ?? "videos_dev",
  user: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASSWORD,
} satisfies PoolConfig;

import { Pool } from "pg";
import { DB_CONFIG } from "../server/config.ts";

export const reset = async () => {
  const pg = new Pool({ ...DB_CONFIG, database: undefined });
  try {
    console.log("Resetting database...");
    await pg.query(`DROP DATABASE IF EXISTS "${DB_CONFIG.database}"`);
    await pg.query(`CREATE DATABASE "${DB_CONFIG.database}"`);
  } finally {
    await pg.end();
  }
};

if (import.meta.main) {
  reset();
}

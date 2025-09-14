import { PostgresDialect } from "kysely";
import { defineConfig } from "kysely-ctl";
import { Pool } from "pg";
import { DB_CONFIG } from "../server/config.ts";

export default defineConfig({
  dialect: new PostgresDialect({
    pool: new Pool(DB_CONFIG),
  }),
});

import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { DB_CONFIG } from "../server/config.ts";

export const makeDb = <T>(pool?: Pool) => {
  const dialect = new PostgresDialect({ pool: pool ?? new Pool(DB_CONFIG) });
  return new Kysely<T>({ dialect });
};

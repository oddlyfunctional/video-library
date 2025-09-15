import { sql, type Kysely } from "kysely";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("videos")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("title", "text")
    .addColumn("thumbnail_url", "varchar")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn("duration", "integer")
    .addColumn("views", "integer", (col) => col.defaultTo(0))
    .addColumn("tags", sql`text[]`)
    .execute();

  await db.schema
    .createIndex("videos_created_at_idx")
    .on("videos")
    .column("created_at asc")
    .execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  db.schema.dropTable("videos");
}

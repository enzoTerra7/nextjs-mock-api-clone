import { KnexMigrationAdapter } from "./adapters/knex.adapter";
import { DrizzleMigrationAdapter } from "./adapters/drizzle.adapter";
import { runMigration } from "./engine";

const MIGRATIONS_TABLE_NAME = "migrations";
const direction = (process.argv[2] || "up") as "up" | "down";
const filename = process.argv[3] || null;
const driver = process.env.BACKEND_RESOLVER || "knex";

const adapter =
  driver === "drizzle"
    ? new DrizzleMigrationAdapter(MIGRATIONS_TABLE_NAME)
    : new KnexMigrationAdapter(MIGRATIONS_TABLE_NAME);

runMigration(adapter, direction, filename).catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});

import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";
import { IMigrationAdapter } from "../adapter.definition";

export class DrizzleMigrationAdapter implements IMigrationAdapter {
  private MIGRATIONS_TABLE_NAME: string;
  private db: ReturnType<typeof drizzle>;

  constructor(migrations_table_name: string) {
    this.MIGRATIONS_TABLE_NAME = migrations_table_name;
    this.db = drizzle({
      connection: process.env.DATABASE_URL as string,
    });
  }

  async ensureTracking() {
    await this.db.execute(sql`
      CREATE TABLE IF NOT EXISTS ${this.MIGRATIONS_TABLE_NAME} (
        id SERIAL PRIMARY KEY,
        filename TEXT UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  async getApplied() {
    const result = await this.db.execute(
      sql`SELECT filename FROM ${this.MIGRATIONS_TABLE_NAME}`
    );
    return new Set(result.rows.map((r) => r.filename as string));
  }

  async executeSQL(sqlText: string) {
    await this.db.execute(sql.raw(sqlText));
  }

  async markAsApplied(filename: string) {
    await this.db.execute(sql`
      INSERT INTO ${this.MIGRATIONS_TABLE_NAME} (filename) VALUES (${filename})
    `);
  }

  async unmarkAsApplied(filename: string) {
    await this.db.execute(sql`
      DELETE FROM ${this.MIGRATIONS_TABLE_NAME} WHERE filename = ${filename}
    `);
  }

  async disconnect() {
    this.db.$client.off;
  }
}

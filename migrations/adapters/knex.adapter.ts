import knex from "knex";
import { IMigrationAdapter } from "../adapter.definition";
import { knex_config } from "@/knexfile";

export class KnexMigrationAdapter implements IMigrationAdapter {
  private db: ReturnType<typeof knex>;
  private MIGRATIONS_TABLE_NAME: string;

  constructor(migrations_table_name: string) {
    this.MIGRATIONS_TABLE_NAME = migrations_table_name;
    this.db = knex(knex_config);
  }

  async ensureTracking() {
    await this.db.schema
      .hasTable(this.MIGRATIONS_TABLE_NAME)
      .then(async (exists) => {
        if (!exists) {
          await this.db.raw(`
            CREATE TABLE IF NOT EXISTS ${this.MIGRATIONS_TABLE_NAME} (
              id SERIAL PRIMARY KEY,
              filename TEXT UNIQUE NOT NULL,
              executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
          `);
        }
      });
  }

  async getApplied() {
    const result = await this.db(this.MIGRATIONS_TABLE_NAME).select("filename");
    return new Set(result.map((r) => r.filename));
  }

  async executeSQL(sql: string) {
    await this.db.raw(sql);
  }

  async markAsApplied(filename: string) {
    await this.db(this.MIGRATIONS_TABLE_NAME).insert({ filename });
  }

  async unmarkAsApplied(filename: string) {
    await this.db(this.MIGRATIONS_TABLE_NAME).where({ filename }).del();
  }

  async disconnect() {
    await this.db.destroy();
  }
}

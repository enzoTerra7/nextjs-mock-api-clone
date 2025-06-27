import type { Knex } from "knex";

export const knex_config = {
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL!,
  },
  pool: {
    min: 2,
    max: 10,
  },
  acquireConnectionTimeout: 60000,
} satisfies Knex.Config;

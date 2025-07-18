import { knex_config } from "@/knexfile";
import knex from "knex";

const globalForKnex = global as unknown as { knex: ReturnType<typeof knex> };

export const knexDb = globalForKnex.knex || knex(knex_config);

if (process.env.NODE_ENV !== "production") globalForKnex.knex = knexDb;

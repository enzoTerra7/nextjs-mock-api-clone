import { config } from "@/knexfile";
import knex from "knex";

const globalForKnex = global as unknown as { knex: ReturnType<typeof knex> };

export const db = globalForKnex.knex || knex(config);

if (process.env.NODE_ENV !== "production") globalForKnex.knex = db;

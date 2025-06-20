import "dotenv/config";
/**
 * @description
 * This is the database connection for the application.
 * It is used to connect to the database and execute queries.
 * It is a singleton and is used in the entire application.
 */
import { drizzle } from "drizzle-orm/node-postgres";
import * as dbSchema from "./schemas";
/**
 * @description
 * In this example, we are using the drizzle library to connect to the database
 * and execute queries.
 * The database is a PostgreSQL database
 *
 * @see https://drizzle.dev/docs/overview
 */

const db = drizzle({
  connection: process.env.DATABASE_URL as string,
  schema: dbSchema,
});

export { db };

export type DrizzleDatabase = typeof db;

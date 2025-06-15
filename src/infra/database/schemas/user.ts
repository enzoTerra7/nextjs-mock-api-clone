import { generateKSUID } from "@/shared/generate_id";
import { text, pgTable, timestamp } from "drizzle-orm/pg-core";

export interface UsersSchema {
  id: string;
  username: string;
  email: string;
  password: string;

  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export const usersTable = pgTable("users", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => generateKSUID()),

  username: text("username").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),

  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  deleted_at: timestamp("deleted_at", { withTimezone: true }),
});

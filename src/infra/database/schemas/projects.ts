import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./user";
import { generateKSUID } from "@/shared/generate_id";

export const projectsTable = pgTable("projects", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => generateKSUID()),

  name: text("name").notNull(),

  user_id: text("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),

  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export interface ProjectsSchema {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
}

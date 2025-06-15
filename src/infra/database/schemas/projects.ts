import { pgTable, text } from "drizzle-orm/pg-core";
import { usersTable } from "./user";
import { generateKSUID } from "@/shared/generate_id";

export const projectsTable = pgTable("projects", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => generateKSUID()),

  name: text("name").notNull(),

  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
});

export interface ProjectsSchema {
  id: string;
  name: string;
  user_id: string;
}

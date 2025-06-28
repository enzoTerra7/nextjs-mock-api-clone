import { pgTable, text, jsonb, timestamp } from "drizzle-orm/pg-core";
import { projectsTable } from "./projects";
import { generateKSUID } from "@/shared/generate_id";

export interface RoutesSchema {
  id: string;
  route_type: string;
  schema: Record<string, string>;
  project_id: string;
  data_builder_id: string;
  created_at: Date;
  route_path: string;
}

export interface RoutesTypeSchema {
  name: string;
}

export const routesTable = pgTable("routes", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => generateKSUID()),

  route_type: text("route_type")
    .notNull()
    .references(() => routesTypesTable.name, {
      onDelete: "restrict",
    }),

  route_path: text("route_name").notNull(),

  schema: jsonb("schema").notNull(),

  project_id: text("project_id")
    .notNull()
    .references(() => projectsTable.id, {
      onDelete: "cascade",
    }),

  data_builder_id: text("data_builder_id")
    .notNull()
    .references(() => projectsTable.id, {
      onDelete: "cascade",
    }),

  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const routesTypesTable = pgTable("routes_types", {
  name: text("name").primaryKey(),
});

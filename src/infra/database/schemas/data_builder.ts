import { generateKSUID } from "@/shared/generate_id";
import { pgTable, text } from "drizzle-orm/pg-core";

export interface DataBuilderTypeSchema {
  name: string;
}

export interface DataBuilderSchema {
  id: string;
  name: string;
  data_builder_type_id: string;
}

export const dataBuilderTypesTable = pgTable("data_builder_types", {
  name: text("name").primaryKey(), // só tem esse campo, usamos como PK
});

export const dataBuildersTable = pgTable("data_builders", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => generateKSUID()),

  name: text("name").notNull(),

  data_builder_type_id: text("data_builder_type_id")
    .notNull()
    .references(() => dataBuilderTypesTable.name, {
      onDelete: "restrict",
    }),
});

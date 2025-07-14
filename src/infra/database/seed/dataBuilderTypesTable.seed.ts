import { DrizzleDb } from "../drizzle";
import { dataBuilderTypesTable } from "../schemas";

export async function dataBuilderTypesTableSeed() {
  console.log(`Running dataBuilderTypesTable seed...`);

  await DrizzleDb.insert(dataBuilderTypesTable).values([
    {
      name: "FAKER",
    },
    {
      name: "AI",
    },
  ]);

  console.log("✅ DataBuilderTypesTable seeder executed!");
}

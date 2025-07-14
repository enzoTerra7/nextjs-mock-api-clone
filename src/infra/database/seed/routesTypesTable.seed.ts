import { DrizzleDb } from "../drizzle";
import { routesTypesTable } from "../schemas";

export async function routesTypesTableSeed() {
  console.log(`Running routesTypesTable seed...`);

  await DrizzleDb.insert(routesTypesTable).values([
    {
      name: "POST",
    },
    {
      name: "GET",
    },
    {
      name: "PATCH",
    },
    {
      name: "PUT",
    },
    {
      name: "DELETE",
    },
  ]);

  console.log("✅ RoutesTypesTableSeed seeder executed!");
}

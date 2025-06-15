import { dataBuilderTypesTableSeed } from "./dataBuilderTypesTable.seed";
import { FakerDataBuilderTableSeed } from "./fakerDataBuilderTAble.seed";
import { usersTableSeed } from "./usersTable.seed";
import { routesTypesTableSeed } from "./routesTypesTable.seed";

async function runAllSeeds() {
  await dataBuilderTypesTableSeed();
  await FakerDataBuilderTableSeed();
  await routesTypesTableSeed();
  await usersTableSeed();
}

runAllSeeds().catch((err) => {
  console.error("❌ Error running seed:", err);
});

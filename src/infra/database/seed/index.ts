import { usersTableSeed } from "./usersTable.seed";

async function runAllSeeds() {
  await usersTableSeed();
}

runAllSeeds().catch((err) => {
  console.error("❌ Error running seed:", err);
});

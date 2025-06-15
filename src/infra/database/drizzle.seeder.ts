// scripts/run-all-seeds.ts
import fs from "node:fs/promises";
import path from "node:path";

const seedsPath = path.resolve(__dirname, "./seed");

async function runSeeds() {
  const files = await fs.readdir(seedsPath);

  const seedFiles = files.filter((file) => file.endsWith(".ts"));

  for (const file of seedFiles) {
    const fullPath = path.join(seedsPath, file);
    console.log(`Running ${file}...`);
    await import(fullPath); // importa e executa o seed
  }

  console.log("✅ All seeds executed!");
}

runSeeds().catch((err) => {
  console.error("❌ Error running seeds:", err);
});

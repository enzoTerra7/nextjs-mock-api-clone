import fs from "fs/promises";
import path from "path";
import { IMigrationAdapter } from "./adapter.definition";

export async function runMigration(
  adapter: IMigrationAdapter,
  direction: "up" | "down",
  targetFile: string | null = null
) {
  const MIGRATIONS_DIR = path.resolve("./migrations");

  await adapter.ensureTracking();
  const applied = await adapter.getApplied();

  const allFiles = (await fs.readdir(MIGRATIONS_DIR))
    .filter((f) => f.endsWith(".sql"))
    .sort();

  const filesToRun = targetFile
    ? [targetFile]
    : direction === "up"
    ? allFiles.filter((f) => !applied.has(f))
    : [allFiles.reverse().find((f) => applied.has(f))].filter(Boolean);

  for (const file of filesToRun) {
    if (!file) continue;
    const content = await fs.readFile(path.join(MIGRATIONS_DIR, file), "utf8");
    const parts = content.split(/^--\s?(UP|DOWN)$/gm);

    const sqlSection = parts
      .find((_, i) => parts[i - 1]?.trim() === direction.toUpperCase())
      ?.trim();

    if (!sqlSection) throw new Error(`❌ No ${direction} section in ${file}`);

    await adapter.executeSQL(sqlSection);

    if (direction === "up") {
      await adapter.markAsApplied(file);
      console.log(`✅ Applied: ${file}`);
    } else {
      await adapter.unmarkAsApplied(file);
      console.log(`⏪ Rolled back: ${file}`);
    }
  }

  if (!filesToRun.length) {
    console.log(`ℹ️ No migrations to ${direction}`);
  }

  await adapter.disconnect();
}

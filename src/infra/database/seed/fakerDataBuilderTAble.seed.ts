import { faker } from "@faker-js/faker";
import { DrizzleDb } from "../drizzle";
import { dataBuildersTable } from "../schemas";

const desiredModules: Array<keyof typeof faker> = [
  "airline",
  "animal",
  "book",
  "color",
  "commerce",
  "company",
  "database",
  "datatype",
  "date",
  "finance",
  "food",
  "git",
  "hacker",
  "helpers",
  "image",
  "internet",
  "location",
  "lorem",
  "music",
  "number",
  "person",
  "phone",
  "science",
  "string",
  "system",
  "vehicle",
  "word",
];

const dataBuilder: Array<{
  name: string;
  data_builder_type_id: "FAKER";
}> = [];

async function mapAllDesiredFakerModules() {
  for (const desiredModule of desiredModules) {
    const workableModule = faker[desiredModule];

    const workableModuleTransformed = Object.entries(workableModule);

    for (const [workableFunctionKey] of workableModuleTransformed) {
      dataBuilder.push({
        name: `${desiredModule}.${workableFunctionKey}`,
        data_builder_type_id: "FAKER",
      });
    }
  }
}

export async function FakerDataBuilderTableSeed() {
  console.log(`Running FakerDataBuilderTableSeed seed...`);
  console.log("Start to map all faker workable modules");
  await mapAllDesiredFakerModules();
  console.log("All modules generated");
  console.log(dataBuilder);
  console.log("Start to up modules to DrizzleDb");
  await DrizzleDb.insert(dataBuildersTable).values(dataBuilder);
  console.log("✅ FakerDataBuilderTableSeed seeder executed!");
}

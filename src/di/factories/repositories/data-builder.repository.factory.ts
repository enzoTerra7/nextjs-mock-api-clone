import { IDataBuilderRepository } from "@/src/application/repositories/data-builder.repository.interface";
import { DrizzleDataBuilderRepository } from "@/src/infra/repositories/data-builder/drizzle.data-builder.repository";
import { KnexDataBuilderRepository } from "@/src/infra/repositories/data-builder/knex.data-builder.repository";

export function createDataBuilderRepositoryFactory(): IDataBuilderRepository {
  const drive = process.env.BACKEND_RESOLVER;
  switch (drive) {
    case "knex":
      return new KnexDataBuilderRepository();
    default:
      return new DrizzleDataBuilderRepository();
  }
}

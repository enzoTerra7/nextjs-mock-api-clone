import { IRoutesRepository } from "@/src/application/repositories/routes.repositories.interface";
import { DrizzleRoutesRepository } from "@/src/infra/repositories/routes/drizzle.routes.repository";
import { KnexRoutesRepository } from "@/src/infra/repositories/routes/knex.routes.repository";
export function createRoutesRepositoryFactory(): IRoutesRepository {
  const drive = process.env.BACKEND_RESOLVER;
  switch (drive) {
    case "knex":
      return new KnexRoutesRepository();
    default:
      return new DrizzleRoutesRepository();
  }
}

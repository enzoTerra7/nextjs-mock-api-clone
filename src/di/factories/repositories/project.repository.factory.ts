import { IProjectsRepository } from "@/src/application/repositories/projects.repository.interface";
import { DrizzleProjectsRepository } from "@/src/infra/repositories/projects/drizzle.projects.repository";
import { KnexProjectsRepository } from "@/src/infra/repositories/projects/knex.projects.repository";
export function createProjectRepositoryFactory(): IProjectsRepository {
  const drive = process.env.BACKEND_RESOLVER;
  switch (drive) {
    case "knex":
      return new KnexProjectsRepository();
    default:
      return new DrizzleProjectsRepository();
  }
}

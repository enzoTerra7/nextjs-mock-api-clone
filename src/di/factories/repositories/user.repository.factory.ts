import { IUsersRepository } from "@application/repositories/users.repository.interface";
import { DrizzleUsersRepository } from "@/src/infra/repositories/users/drizzle.users.repository";
import { KnexUsersRepository } from "@/src/infra/repositories/users/knex.users.repository";
export function createUserRepositoryFactory(): IUsersRepository {
  const drive = process.env.BACKEND_RESOLVER;
  switch (drive) {
    case "knex":
      return new KnexUsersRepository();
    default:
      return new DrizzleUsersRepository();
  }
}

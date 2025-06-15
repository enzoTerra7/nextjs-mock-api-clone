import { IUsersRepository } from "@application/repositories/users.repository.interface";
import { DrizzleUsersRepository } from "@/src/infra/repositories/users/drizzle.users.repository";
export function createUserRepositoryFactory(): IUsersRepository {
  const DrizzleUserRepository = new DrizzleUsersRepository();

  return DrizzleUserRepository;
}

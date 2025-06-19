import { SignUpUseCase } from "./../application/use-cases/auth/sign-up";
import { IUsersRepository } from "../application/repositories/users.repository.interface";
import { SignInUseCase } from "../application/use-cases/auth/sign-in";
import { ICryptoService } from "../infra/services/crypto/crypto.service.definition";

export interface DI_RETURN_TYPES {
  // Repositories
  UserRepository(drive?: "knex" | "drizzle"): IUsersRepository;

  // Use-cases
  SignInUseCase(drive?: "knex" | "drizzle"): SignInUseCase;
  SignUpUseCase(drive?: "knex" | "drizzle"): SignUpUseCase;

  // Services
  CryptoService: ICryptoService;
}

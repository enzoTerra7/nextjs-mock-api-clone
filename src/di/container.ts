import { DI_RETURN_TYPES } from "./types";
import { createUserRepositoryFactory } from "./factories/repositories/user.repository.factory";
import { CryptoService } from "../infra/services/crypto/crypto.service";
import { createSignInUseCaseFactory } from "./factories/use-cases/auth/sign-in.use-case.factory";
import { createSignUpUseCaseFactory } from "./factories/use-cases/auth/sign-up.use-case.factory";

const resolver: {
  [key in keyof DI_RETURN_TYPES]: DI_RETURN_TYPES[key];
} = {
  // services
  CryptoService: new CryptoService(),

  // repositories
  UserRepository(drive: "knex" | "drizzle") {
    return createUserRepositoryFactory(drive);
  },

  // use cases
  SignInUseCase(drive: "knex" | "drizzle") {
    return createSignInUseCaseFactory(
      resolver.UserRepository(drive),
      resolver.CryptoService
    );
  },
  SignUpUseCase(drive: "knex" | "drizzle") {
    return createSignUpUseCaseFactory(
      resolver.UserRepository(drive),
      resolver.CryptoService
    );
  },
};

export class DiContainer {
  static get<T extends keyof DI_RETURN_TYPES>(
    serviceName: T
  ): DI_RETURN_TYPES[T] {
    return resolver[serviceName];
  }
}

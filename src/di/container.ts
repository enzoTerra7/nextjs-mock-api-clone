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
  get UserRepository() {
    return createUserRepositoryFactory();
  },

  // use cases
  get SignInUseCase() {
    return createSignInUseCaseFactory(this.UserRepository, this.CryptoService);
  },
  get SignUpUseCase() {
    return createSignUpUseCaseFactory(this.UserRepository, this.CryptoService);
  },
};

export class DiContainer {
  static get<T extends keyof DI_RETURN_TYPES>(
    serviceName: T
  ): DI_RETURN_TYPES[T] {
    return resolver[serviceName];
  }
}

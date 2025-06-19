import { SignInUseCase } from "@/src/application/use-cases/auth/sign-in";
import { SignUpUseCase } from "@/src/application/use-cases/auth/sign-up";
import { DI_RETURN_TYPES } from "@/src/di/types";
import { MockUsersRepository } from "@/src/infra/repositories/users/mock.users.repository";
import { CryptoService } from "@/src/infra/services/crypto/crypto.service";

const resolver: {
  [key in keyof DI_RETURN_TYPES]: DI_RETURN_TYPES[key];
} = {
  // services
  CryptoService: new CryptoService(),

  // repositories
  UserRepository() {
    return new MockUsersRepository();
  },

  // use cases
  SignInUseCase() {
    return new SignInUseCase(resolver.UserRepository(), resolver.CryptoService);
  },
  SignUpUseCase() {
    return new SignUpUseCase(resolver.UserRepository(), resolver.CryptoService);
  },
};

export class TestingDiContainer {
  static get<T extends keyof DI_RETURN_TYPES>(
    serviceName: T
  ): DI_RETURN_TYPES[T] {
    return resolver[serviceName];
  }
}

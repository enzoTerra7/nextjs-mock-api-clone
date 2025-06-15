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
  get UserRepository() {
    return new MockUsersRepository();
  },

  // use cases
  get SignInUseCase() {
    return new SignInUseCase(this.UserRepository, this.CryptoService);
  },
  get SignUpUseCase() {
    return new SignUpUseCase(this.UserRepository, this.CryptoService);
  },
};

export class TestingDiContainer {
  static get<T extends keyof DI_RETURN_TYPES>(
    serviceName: T
  ): DI_RETURN_TYPES[T] {
    return resolver[serviceName];
  }
}

import { SignInUseCase } from "@/src/application/use-cases/auth/sign-in";
import { SignUpUseCase } from "@/src/application/use-cases/auth/sign-up";
import { DI_RETURN_TYPES } from "@/src/di/types";
import { MockProjectsRepository } from "@/src/infra/repositories/projects/mock.projects.repository";
import { MockUsersRepository } from "@/src/infra/repositories/users/mock.users.repository";
import { CryptoService } from "@/src/infra/services/crypto/crypto.service";
import { signInUserInfo } from "./sign-in";
import { GetAllProjectsUseCase } from "@/src/application/use-cases/projects/get-all";
import { CreateProjectsUseCase } from "@/src/application/use-cases/projects/create";

const resolver: {
  [key in keyof DI_RETURN_TYPES]: DI_RETURN_TYPES[key];
} = {
  // services
  CryptoService: new CryptoService(),

  // repositories
  UserRepository: new MockUsersRepository(),
  ProjectRepository: new MockProjectsRepository(signInUserInfo.id),

  // use cases
  get SignInUseCase() {
    return new SignInUseCase(this.UserRepository, this.CryptoService);
  },
  get SignUpUseCase() {
    return new SignUpUseCase(this.UserRepository, this.CryptoService);
  },
  get GetAllProjectsUseCase() {
    return new GetAllProjectsUseCase(this.ProjectRepository);
  },
  get CreateProjectsUseCase() {
    return new CreateProjectsUseCase(this.ProjectRepository);
  },
};

export class TestingDiContainer {
  static get<T extends keyof DI_RETURN_TYPES>(
    serviceName: T
  ): DI_RETURN_TYPES[T] {
    return resolver[serviceName];
  }
}

import { DI_RETURN_TYPES } from "./types";
import { createUserRepositoryFactory } from "./factories/repositories/user.repository.factory";
import { CryptoService } from "../infra/services/crypto/crypto.service";
import { createSignInUseCaseFactory } from "./factories/use-cases/auth/sign-in.use-case.factory";
import { createSignUpUseCaseFactory } from "./factories/use-cases/auth/sign-up.use-case.factory";
import { createProjectRepositoryFactory } from "./factories/repositories/project.repository.factory";
import { getAllProjectsUseCaseFactory } from "./factories/use-cases/projects/get-all.use-case.factory";
import { createProjectsUseCaseFactory } from "./factories/use-cases/projects/create.use-case.factory";
import { deleteProjectsUseCaseFactory } from "./factories/use-cases/projects/delete.use-case.factory";

const resolver: {
  [key in keyof DI_RETURN_TYPES]: DI_RETURN_TYPES[key];
} = {
  // services
  CryptoService: new CryptoService(),

  // repositories
  UserRepository: createUserRepositoryFactory(),
  ProjectRepository: createProjectRepositoryFactory(),

  // use cases
  get SignInUseCase() {
    return createSignInUseCaseFactory(this.UserRepository, this.CryptoService);
  },
  get SignUpUseCase() {
    return createSignUpUseCaseFactory(this.UserRepository, this.CryptoService);
  },
  get GetAllProjectsUseCase() {
    return getAllProjectsUseCaseFactory(this.ProjectRepository);
  },
  get CreateProjectsUseCase() {
    return createProjectsUseCaseFactory(this.ProjectRepository);
  },
  get DeleteProjectsUseCase() {
    return deleteProjectsUseCaseFactory(this.ProjectRepository);
  },
};

export class DiContainer {
  static get<T extends keyof DI_RETURN_TYPES>(
    serviceName: T
  ): DI_RETURN_TYPES[T] {
    return resolver[serviceName];
  }
}

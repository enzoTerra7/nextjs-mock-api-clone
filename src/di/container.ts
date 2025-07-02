import { DI_RETURN_TYPES } from "./types";
import { createUserRepositoryFactory } from "./factories/repositories/user.repository.factory";
import { CryptoService } from "../infra/services/crypto/crypto.service";
import { createSignInUseCaseFactory } from "./factories/use-cases/auth/sign-in.use-case.factory";
import { createSignUpUseCaseFactory } from "./factories/use-cases/auth/sign-up.use-case.factory";
import { createProjectRepositoryFactory } from "./factories/repositories/project.repository.factory";
import { getAllProjectsUseCaseFactory } from "./factories/use-cases/projects/get-all.use-case.factory";
import { createProjectsUseCaseFactory } from "./factories/use-cases/projects/create.use-case.factory";
import { deleteProjectsUseCaseFactory } from "./factories/use-cases/projects/delete.use-case.factory";
import { createRoutesRepositoryFactory } from "./factories/repositories/routes.repository.factory";
import { createRouteUseCaseFactory } from "./factories/use-cases/routes/create.use-case.factory";
import { deleteRouteUseCaseFactory } from "./factories/use-cases/routes/delete.use-case.factory";
import { getAllRoutesTypeUseCaseFactory } from "./factories/use-cases/routes/get-all-routes-type.use-case.factory";
import { getAllRoutesUseCaseFactory } from "./factories/use-cases/routes/get-all-routes.use-case.factory";
import { getRouteTypeUseCaseFactory } from "./factories/use-cases/routes/get-route-type.use-case.factory";
import { getRouteUseCaseFactory } from "./factories/use-cases/routes/get-route.use-case.factory";
import { getProjectByIdUseCaseFactory } from "./factories/use-cases/projects/get-by-id.use-case.factory";
import { getProjectRoutesUseCaseFactory } from "./factories/use-cases/projects/get-project-routes";

const resolver: {
  [key in keyof DI_RETURN_TYPES]: DI_RETURN_TYPES[key];
} = {
  // services
  CryptoService: new CryptoService(),

  // repositories
  UserRepository: createUserRepositoryFactory(),
  ProjectRepository: createProjectRepositoryFactory(),
  RoutesRepository: createRoutesRepositoryFactory(),

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
  get GetProjectByIdUseCase() {
    return getProjectByIdUseCaseFactory(this.ProjectRepository);
  },
  get GetProjectRoutesUseCase() {
    return getProjectRoutesUseCaseFactory(this.ProjectRepository);
  },
  get CreateProjectsUseCase() {
    return createProjectsUseCaseFactory(this.ProjectRepository);
  },
  get DeleteProjectsUseCase() {
    return deleteProjectsUseCaseFactory(this.ProjectRepository);
  },
  get CreateRouteUseCase() {
    return createRouteUseCaseFactory(this.RoutesRepository);
  },
  get DeleteRouteUseCase() {
    return deleteRouteUseCaseFactory(this.RoutesRepository);
  },
  get GetAllRoutesTypesUseCase() {
    return getAllRoutesTypeUseCaseFactory(this.RoutesRepository);
  },
  get GetAllRoutesUseCase() {
    return getAllRoutesUseCaseFactory(this.RoutesRepository);
  },
  get GetRoutesTypesUseCase() {
    return getRouteTypeUseCaseFactory(this.RoutesRepository);
  },
  get GetRouteUseCase() {
    return getRouteUseCaseFactory(this.RoutesRepository);
  },
};

export class DiContainer {
  static get<T extends keyof DI_RETURN_TYPES>(
    serviceName: T
  ): DI_RETURN_TYPES[T] {
    return resolver[serviceName];
  }
}

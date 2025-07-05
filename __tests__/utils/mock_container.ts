import { SignInUseCase } from "@/src/application/use-cases/auth/sign-in";
import { SignUpUseCase } from "@/src/application/use-cases/auth/sign-up";
import { DI_RETURN_TYPES } from "@/src/di/types";
import { MockProjectsRepository } from "@/src/infra/repositories/projects/mock.projects.repository";
import { MockUsersRepository } from "@/src/infra/repositories/users/mock.users.repository";
import { CryptoService } from "@/src/infra/services/crypto/crypto.service";
import { signInUserInfo } from "./helpers";
import { GetAllProjectsUseCase } from "@/src/application/use-cases/projects/get-all";
import { CreateProjectsUseCase } from "@/src/application/use-cases/projects/create";
import { DeleteProjectsUseCase } from "@/src/application/use-cases/projects/delete";
import { MockRoutesRepository } from "@/src/infra/repositories/routes/mock.routes.repository";
import { CreateRouteUseCase } from "@/src/application/use-cases/routes/create";
import { DeleteRouteUseCase } from "@/src/application/use-cases/routes/delete";
import { GetAllRoutesTypesUseCase } from "@/src/application/use-cases/routes/get-all-routes-types";
import { GetAllRoutesUseCase } from "@/src/application/use-cases/routes/get-all-routes";
import { GetRoutesTypesUseCase } from "@/src/application/use-cases/routes/get-routes-types";
import { GetRouteUseCase } from "@/src/application/use-cases/routes/get-routes";
import { GetProjectByIdUseCase } from "@/src/application/use-cases/projects/get-id";
import { GetProjectRoutesUseCase } from "@/src/application/use-cases/projects/get-project-routes";
import { MockDataBuilderRepository } from "@/src/infra/repositories/data-builder/mock.data-builder.repository";
import { GetAllDataBuilderTypesUseCase } from "@/src/application/use-cases/data-builder/get-all-types";

const resolver: {
  [key in keyof DI_RETURN_TYPES]: DI_RETURN_TYPES[key];
} = {
  // services
  CryptoService: new CryptoService(),

  // repositories
  UserRepository: new MockUsersRepository(),
  ProjectRepository: new MockProjectsRepository(signInUserInfo.id),
  RoutesRepository: new MockRoutesRepository(signInUserInfo.id),
  DataBuilderRepository: new MockDataBuilderRepository(),

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
  get GetProjectByIdUseCase() {
    return new GetProjectByIdUseCase(this.ProjectRepository);
  },
  get GetProjectRoutesUseCase() {
    return new GetProjectRoutesUseCase(this.ProjectRepository);
  },
  get CreateProjectsUseCase() {
    return new CreateProjectsUseCase(this.ProjectRepository);
  },
  get DeleteProjectsUseCase() {
    return new DeleteProjectsUseCase(this.ProjectRepository);
  },
  get CreateRouteUseCase() {
    return new CreateRouteUseCase(this.RoutesRepository);
  },
  get DeleteRouteUseCase() {
    return new DeleteRouteUseCase(this.RoutesRepository);
  },
  get GetAllRoutesTypesUseCase() {
    return new GetAllRoutesTypesUseCase(this.RoutesRepository);
  },
  get GetAllRoutesUseCase() {
    return new GetAllRoutesUseCase(this.RoutesRepository);
  },
  get GetRoutesTypesUseCase() {
    return new GetRoutesTypesUseCase(this.RoutesRepository);
  },
  get GetRouteUseCase() {
    return new GetRouteUseCase(this.RoutesRepository);
  },

  get GetAllBuildersTypeUseCase() {
    return new GetAllDataBuilderTypesUseCase(this.DataBuilderRepository);
  },
};

export class TestingDiContainer {
  static get<T extends keyof DI_RETURN_TYPES>(
    serviceName: T
  ): DI_RETURN_TYPES[T] {
    return resolver[serviceName];
  }
}

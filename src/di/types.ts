import { GetProjectByIdUseCase } from "./../application/use-cases/projects/get-id";
import { SignUpUseCase } from "./../application/use-cases/auth/sign-up";
import { IUsersRepository } from "../application/repositories/users.repository.interface";
import { SignInUseCase } from "../application/use-cases/auth/sign-in";
import { ICryptoService } from "../infra/services/crypto/crypto.service.definition";
import { IProjectsRepository } from "../application/repositories/projects.repository.interface";
import { GetAllProjectsUseCase } from "../application/use-cases/projects/get-all";
import { CreateProjectsUseCase } from "../application/use-cases/projects/create";
import { DeleteProjectsUseCase } from "../application/use-cases/projects/delete";
import { IRoutesRepository } from "../application/repositories/routes.repositories.interface";
import { CreateRouteUseCase } from "../application/use-cases/routes/create";
import { DeleteRouteUseCase } from "../application/use-cases/routes/delete";
import { GetAllRoutesTypesUseCase } from "../application/use-cases/routes/get-all-routes-types";
import { GetAllRoutesUseCase } from "../application/use-cases/routes/get-all-routes";
import { GetRoutesTypesUseCase } from "../application/use-cases/routes/get-routes-types";
import { GetRouteUseCase } from "../application/use-cases/routes/get-routes";
import { GetProjectRoutesUseCase } from "../application/use-cases/projects/get-project-routes";

export interface DI_RETURN_TYPES {
  // Repositories
  UserRepository: IUsersRepository;
  ProjectRepository: IProjectsRepository;
  RoutesRepository: IRoutesRepository;

  // Use-cases
  SignInUseCase: SignInUseCase;
  SignUpUseCase: SignUpUseCase;
  GetAllProjectsUseCase: GetAllProjectsUseCase;
  GetProjectByIdUseCase: GetProjectByIdUseCase;
  GetProjectRoutesUseCase: GetProjectRoutesUseCase;
  CreateProjectsUseCase: CreateProjectsUseCase;
  DeleteProjectsUseCase: DeleteProjectsUseCase;

  CreateRouteUseCase: CreateRouteUseCase;
  DeleteRouteUseCase: DeleteRouteUseCase;
  GetAllRoutesTypesUseCase: GetAllRoutesTypesUseCase;
  GetAllRoutesUseCase: GetAllRoutesUseCase;
  GetRoutesTypesUseCase: GetRoutesTypesUseCase;
  GetRouteUseCase: GetRouteUseCase;

  // Services
  CryptoService: ICryptoService;
}

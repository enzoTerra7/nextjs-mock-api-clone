import { SignUpUseCase } from "./../application/use-cases/auth/sign-up";
import { IUsersRepository } from "../application/repositories/users.repository.interface";
import { SignInUseCase } from "../application/use-cases/auth/sign-in";
import { ICryptoService } from "../infra/services/crypto/crypto.service.definition";
import { IProjectsRepository } from "../application/repositories/projects.repository.interface";
import { GetAllProjectsUseCase } from "../application/use-cases/projects/get-all";
import { CreateProjectsUseCase } from "../application/use-cases/projects/create";
import { DeleteProjectsUseCase } from "../application/use-cases/projects/delete";

export interface DI_RETURN_TYPES {
  // Repositories
  UserRepository: IUsersRepository;
  ProjectRepository: IProjectsRepository;

  // Use-cases
  SignInUseCase: SignInUseCase;
  SignUpUseCase: SignUpUseCase;
  GetAllProjectsUseCase: GetAllProjectsUseCase;
  CreateProjectsUseCase: CreateProjectsUseCase;
  DeleteProjectsUseCase: DeleteProjectsUseCase;

  // Services
  CryptoService: ICryptoService;
}

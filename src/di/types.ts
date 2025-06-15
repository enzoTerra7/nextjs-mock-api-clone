import { SignUpUseCase } from "./../application/use-cases/auth/sign-up";
import { IUsersRepository } from "../application/repositories/users.repository.interface";
import { SignInUseCase } from "../application/use-cases/auth/sign-in";
import { ICryptoService } from "../infra/services/crypto/crypto.service.definition";

export interface DI_RETURN_TYPES {
  // Repositories
  UserRepository: IUsersRepository;

  // Use-cases
  SignInUseCase: SignInUseCase;
  SignUpUseCase: SignUpUseCase;

  // Services
  CryptoService: ICryptoService;
}

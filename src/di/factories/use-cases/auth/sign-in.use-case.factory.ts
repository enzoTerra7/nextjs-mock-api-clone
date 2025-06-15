import { SignInUseCase } from "@/src/application/use-cases/auth/sign-in";
import { IUsersRepository } from "@application/repositories/users.repository.interface";
import { ICryptoService } from "@infra/services/crypto/crypto.service.definition";

export function createSignInUseCaseFactory(
  usersRepository: IUsersRepository,
  cryptoService: ICryptoService
) {
  return new SignInUseCase(usersRepository, cryptoService);
}

import { SignUpUseCase } from "@/src/application/use-cases/auth/sign-up";
import { IUsersRepository } from "@application/repositories/users.repository.interface";
import { ICryptoService } from "@infra/services/crypto/crypto.service.definition";

export function createSignUpUseCaseFactory(
  usersRepository: IUsersRepository,
  cryptoService: ICryptoService
) {
  return new SignUpUseCase(usersRepository, cryptoService);
}

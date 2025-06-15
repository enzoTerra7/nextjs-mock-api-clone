import { ICryptoService } from "@infra/services/crypto/crypto.service.definition";
import { IUsersRepository } from "../../repositories/users.repository.interface";
import { SignInInput, SignInOutput } from "./types";
import { AuthenticationError } from "@domain/entities/errors/auth";

export class SignInUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private cryptoService: ICryptoService
  ) {}

  async execute(input: SignInInput): SignInOutput {
    const user = await this.userRepository.getUserByEmail(input.email);

    if (!user) {
      throw new AuthenticationError("Invalid credentials");
    }

    const isPasswordValid = await this.cryptoService.compare(
      input.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new AuthenticationError("Invalid credentials");
    }

    return {
      user: {
        id: user.id,
        deleted_at: user.deleted_at,
        email: user.email,
        passwordHash: user.passwordHash,
        username: user.username,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    };
  }
}

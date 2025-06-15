import { ICryptoService } from "@infra/services/crypto/crypto.service.definition";
import { IUsersRepository } from "../../repositories/users.repository.interface";
import { SignUpOutput, SignUpInput } from "./types";
import { BadRequestError } from "@/src/domain/entities/errors/payload";

export class SignUpUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private cryptoService: ICryptoService
  ) {}

  async execute(input: SignUpInput): SignUpOutput {
    const existentUser = await this.userRepository.getUserByEmail(input.email);

    if (existentUser) {
      throw new BadRequestError("Invalid payload");
    }

    const passwordHash = await this.cryptoService.encrypt(input.password);

    const user = await this.userRepository.createUser({
      email: input.email,
      password: passwordHash,
      username: input.username,
    });

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

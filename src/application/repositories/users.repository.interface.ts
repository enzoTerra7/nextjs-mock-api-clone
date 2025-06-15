import { User } from "@domain/entities/models/user.entities";
import { IUserInputCreate } from "../validators/user/user.input.create";

export interface IUsersRepository {
  getUserById(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(input: IUserInputCreate): Promise<User>;
}

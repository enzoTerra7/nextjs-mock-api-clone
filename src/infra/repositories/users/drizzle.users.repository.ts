import "server-only";
import { IUsersRepository } from "@application/repositories/users.repository.interface";
import { User } from "@domain/entities/models/user.entities";
import { DrizzleDb } from "../../database/drizzle";
import { usersTable } from "../../database/schemas";
import { IUserInputCreate } from "@application/validators/user/user.input.create";

export class DrizzleUsersRepository implements IUsersRepository {
  constructor() {}
  async getUserById(id: string): Promise<User | undefined> {
    const user = await DrizzleDb.query.usersTable.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });

    if (!user) {
      return undefined;
    }

    const userDTO = new User(
      user.id,
      user.email,
      user.username,
      user.password,
      user.deleted_at,
      user.created_at,
      user.updated_at
    );

    return userDTO;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await DrizzleDb.query.usersTable.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });

    if (!user) {
      return undefined;
    }

    const {
      id,
      email: userMail,
      username,
      password,
      deleted_at,
      created_at,
      updated_at,
    } = user;

    const userDTO = User.create({
      deleted_at,
      email: userMail,
      id,
      passwordHash: password,
      username,
      created_at,
      updated_at,
    });

    return userDTO;
  }

  async createUser(input: IUserInputCreate): Promise<User> {
    const [user] = await DrizzleDb.insert(usersTable)
      .values({
        email: input.email,
        password: input.password,
        username: input.username,
      })
      .returning();

    const {
      id,
      email: userMail,
      username,
      password,
      deleted_at,
      created_at,
      updated_at,
    } = user;

    const userDTO = User.create({
      deleted_at,
      email: userMail,
      id,
      passwordHash: password,
      username,
      created_at,
      updated_at,
    });

    return userDTO;
  }
}

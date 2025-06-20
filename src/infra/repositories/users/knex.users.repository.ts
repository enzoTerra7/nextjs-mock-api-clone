import "server-only";
import { IUsersRepository } from "@application/repositories/users.repository.interface";
import { User } from "@domain/entities/models/user.entities";
import { db } from "../../database/knex/knex";
import { IUserInputCreate } from "@application/validators/user/user.input.create";
import { UsersSchema } from "../../database/schemas";

export class KnexUsersRepository implements IUsersRepository {
  constructor() {}
  async getUserById(id: string): Promise<User | undefined> {
    const user = await db("users")
      .select("*")
      .where({ id })
      .first<UsersSchema>();

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
    const user = await db("users")
      .select("*")
      .where({ email })
      .first<UsersSchema>();

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
    const user = await db("users")
      .insert({
        id: db.raw("gen_random_uuid()"),
        username: input.username,
        email: input.email,
        password: input.password,
      })
      .returning("*")
      .first<UsersSchema>();

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

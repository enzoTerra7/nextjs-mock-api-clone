import { IUsersRepository } from "@application/repositories/users.repository.interface";
import { User } from "@domain/entities/models/user.entities";
import { UsersSchema } from "../../database/schemas";
import { IUserInputCreate } from "@application/validators/user/user.input.create";
import { generateKSUID } from "@/shared/generate_id";

export class MockUsersRepository implements IUsersRepository {
  private _users: UsersSchema[];

  constructor() {
    this._users = [
      {
        id: "aE8aMAE3fCGzvxeSOtaN5UMaPCo",
        email: "user+1@user.com",
        username: "User 1",
        password:
          "$2a$10$54Jpwc2EmwvwkqbNwN9J4.p8a14A08rAKVYFXpEUZFE7XHrUEfyqm", // hash for Test@2025
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: "aE8aML0JyH_PNzTwg8UkQuBT8Lw",
        email: "user+2@user.com",
        username: "User 2",
        password:
          "$2a$10$54Jpwc2EmwvwkqbNwN9J4.p8a14A08rAKVYFXpEUZFE7XHrUEfyqm", // hash for Test@2025
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: "aE8aMNJVHPpYFbNEx6ImihGpaXU",
        email: "user+3@user.com",
        username: "User 3",
        password:
          "$2a$10$54Jpwc2EmwvwkqbNwN9J4.p8a14A08rAKVYFXpEUZFE7XHrUEfyqm", // hash for Test@2025
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ];
  }

  async getUserById(id: string): Promise<User | undefined> {
    const user = this._users.find((user) => user.id === id);

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
    const user = this._users.find((user) => user.email === email);

    if (!user) {
      return undefined;
    }

    const {
      id,
      email: userMail,
      username,
      password: passwordHash,
      deleted_at,
      created_at,
      updated_at,
    } = user;

    const userDTO = User.create({
      deleted_at,
      email: userMail,
      id,
      passwordHash,
      username,
      created_at,
      updated_at,
    });

    return userDTO;
  }

  async createUser(input: IUserInputCreate): Promise<User> {
    const ksuid = generateKSUID();
    const user: UsersSchema = {
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,

      email: input.email,
      id: ksuid,
      password: input.password,
      username: input?.username,
    };

    this._users.push(user);

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

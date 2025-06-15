import { UsersSchema, usersTable } from "./../schemas/user";
import { db } from "../drizzle";
import { CryptoService } from "../../services/crypto/crypto.service";
import { faker } from "@faker-js/faker";

export async function usersTableSeed() {
  const cryptoService = new CryptoService();
  console.log(`Running users seed...`);

  const users: UsersSchema[] = [];

  for (let index = 0; index < 5; index++) {
    const password = faker.internet.password();
    const passwordHash = await cryptoService.encrypt(password);

    const user: UsersSchema = {
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,

      email: faker.internet.email(),
      id: faker.string.alphanumeric(27),
      password: passwordHash,
      username: faker.internet.username(),
    };

    users.push(user);

    console.log("generated user:");
    console.dir({
      ...user,
      password,
    });
  }

  await db.insert(usersTable).values(users);

  console.log("✅ User seeder executed!");
}

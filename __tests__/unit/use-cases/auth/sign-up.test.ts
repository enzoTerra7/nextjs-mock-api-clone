import { faker } from "@faker-js/faker";
import { TestingDiContainer } from "@/__tests__/utils/mock_container";
import { BadRequestError } from "@/src/domain/entities/errors/payload";

const signUpUseCase = TestingDiContainer.get("SignUpUseCase");

it("Register user successfully", async () => {
  const { email, username, password } = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.internet.username(),
  };
  const { user } = await signUpUseCase().execute({
    email,
    password,
    username,
  });
  expect(user).toHaveProperty("email");
  expect(user).toHaveProperty("username");
  expect(user).toHaveProperty("id");
  expect(user.email).toBe(email);
  expect(user.username).toBe(username);
});

it("throws for invalid input", () => {
  expect(
    async () =>
      await signUpUseCase().execute({
        email: "user+1@user.com",
        password: "doesntmatter",
        username: "idontcare",
      })
  ).rejects.toBeInstanceOf(BadRequestError);
});

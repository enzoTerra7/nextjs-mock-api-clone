import { TestingDiContainer } from "@/__tests__/utils/mock_container";
import { AuthenticationError } from "@/src/domain/entities/errors/auth";
import { expect, it } from "vitest";

const signInUseCase = TestingDiContainer.get("SignInUseCase");

it("returns user with email, username and id", async () => {
  console.log("executing test");
  const { user } = await signInUseCase.execute({
    email: `user+1@user.com`,
    password: "Test@2025",
  });
  expect(user).toHaveProperty("email");
  expect(user).toHaveProperty("username");
  expect(user).toHaveProperty("id");
  expect(user.id).toBe("aE8aMAE3fCGzvxeSOtaN5UMaPCo");
});

it("throws for invalid input", () => {
  expect(
    async () =>
      await signInUseCase.execute({
        email: "non-existing@email.com",
        password: "doesntmatter",
      })
  ).rejects.toBeInstanceOf(AuthenticationError);
});

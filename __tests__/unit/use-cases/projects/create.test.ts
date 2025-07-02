import { TestingDiContainer } from "@/__tests__/utils/mock_container";
import { signInUserInfo } from "@/__tests__/utils/helpers";
import { BadRequestError } from "@/src/domain/entities/errors/payload";

const createProjectUseCase = TestingDiContainer.get("CreateProjectsUseCase");

it("returns the created project", async () => {
  const project = await createProjectUseCase.execute({
    name: "My great Project",
    user_id: signInUserInfo.id,
  });

  expect(project).toHaveProperty("id");
  expect(project).toHaveProperty("name");
  expect(project).toHaveProperty("user_id");
  expect(project).toHaveProperty("routes");
  expect(project.name).toBe("My great Project");
  expect(project.user_id).toBe(signInUserInfo.id);
  expect(project.routes).toStrictEqual([]);
});

it("throws for invalid input", () => {
  expect(
    async () =>
      await createProjectUseCase.execute({
        name: "My invalid project",
        user_id: "invalid_user",
      })
  ).rejects.toBeInstanceOf(BadRequestError);
});

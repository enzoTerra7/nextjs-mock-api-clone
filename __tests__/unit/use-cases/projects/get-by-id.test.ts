import { TestingDiContainer } from "@/__tests__/utils/mock_container";
import { projectInfo } from "@/__tests__/utils/helpers";
import { NotFoundError } from "@/src/domain/entities/errors/payload";

const getProjectByIdUseCase = TestingDiContainer.get("GetProjectByIdUseCase");

it("returns all users project", async () => {
  const project = await getProjectByIdUseCase.execute({
    project_id: projectInfo.id,
  });

  expect(project).toHaveProperty("id");
  expect(project).toHaveProperty("user_id");
  expect(project.id).toBe(projectInfo.id);
  expect(project.user_id).toBe(projectInfo.user_id);
});

it("should throw error because is a invalid project", async () => {
  expect(
    async () =>
      await getProjectByIdUseCase.execute({
        project_id: "invalid-id",
      })
  ).rejects.toBeInstanceOf(NotFoundError);
});

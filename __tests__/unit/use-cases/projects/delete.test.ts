import { TestingDiContainer } from "@/__tests__/utils/mock_container";
import { BadRequestError } from "@/src/domain/entities/errors/payload";

const deleteProjectUseCase = TestingDiContainer.get("DeleteProjectsUseCase");

it("successfully delete project", async () => {
  expect(
    async () =>
      await deleteProjectUseCase.execute({
        project_id: "aFWlYv0hs7Y9sAXvu8WydPrHftM",
        user_id: "aE8aMAE3fCGzvxeSOtaN5UMaPCo",
      })
  ).not.toThrow();
});

it("throws for invalid input because is a invalid id", () => {
  expect(
    async () =>
      await deleteProjectUseCase.execute({
        project_id: "invalid_id",
        user_id: "aE8aMAE3fCGzvxeSOtaN5UMaPCo",
      })
  ).rejects.toBeInstanceOf(BadRequestError);
});

it("throws for invalid input because is a invalid user_id", () => {
  expect(
    async () =>
      await deleteProjectUseCase.execute({
        project_id: "aFWlYv0hs7Y9sAXvu8WydPrHftM",
        user_id: "invalid_id",
      })
  ).rejects.toBeInstanceOf(BadRequestError);
});

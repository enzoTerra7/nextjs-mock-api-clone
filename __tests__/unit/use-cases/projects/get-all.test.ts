import { TestingDiContainer } from "@/__tests__/utils/mock_container";
import { signInUserInfo } from "@/__tests__/utils/sign-in";

const getAllProjectsUseCase = TestingDiContainer.get("GetAllProjectsUseCase");

it("returns all users project", async () => {
  const projects = await getAllProjectsUseCase.execute({
    user_id: signInUserInfo.id,
  });

  expect(projects.length).toBe(4);
});

it("return an empty projects list", async () => {
  const projects = await getAllProjectsUseCase.execute({
    user_id: "aE8aML0JyH_PNzTwg8UkQuBT8Lw",
  });

  expect(projects.length).toBe(0);
});

import { TestingDiContainer } from "@/__tests__/utils/mock_container";

const getAllBuildersTypeUseCase = TestingDiContainer.get(
  "GetAllBuildersTypeUseCase"
);

it("returns all builders types", async () => {
  const builders = await getAllBuildersTypeUseCase.execute();

  expect(builders.length).toBe(2);
  expect(builders[0].name === "FAKER");
  expect(builders[1].name === "AI");
});

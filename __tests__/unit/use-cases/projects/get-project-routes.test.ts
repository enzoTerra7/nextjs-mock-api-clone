import { TestingDiContainer } from "@/__tests__/utils/mock_container";
import { projectInfo } from "@/__tests__/utils/helpers";

const getProjectRoutesUseCase = TestingDiContainer.get(
  "GetProjectRoutesUseCase"
);

it("returns the project routes grouped by route_type", async () => {
  const routes = await getProjectRoutesUseCase.execute({
    project_id: projectInfo.id,
  });

  expect(routes).toHaveProperty("GET");
  expect(routes).toHaveProperty("PUT");
  expect(routes).toHaveProperty("PATCH");
  expect(routes).toHaveProperty("POST");
  expect(routes).toHaveProperty("DELETE");

  expect(routes.GET.length).toBe(1);
  expect(routes.PUT.length).toBe(1);
  expect(routes.PATCH.length).toBe(1);
  expect(routes.POST.length).toBe(1);
  expect(routes.DELETE.length).toBe(1);
});

it("should return all types with empty array", async () => {
  const routes = await getProjectRoutesUseCase.execute({
    project_id: "invalid-id",
  });

  expect(routes).toHaveProperty("GET");
  expect(routes).toHaveProperty("PUT");
  expect(routes).toHaveProperty("PATCH");
  expect(routes).toHaveProperty("POST");
  expect(routes).toHaveProperty("DELETE");

  expect(routes.GET.length).toBe(0);
  expect(routes.PUT.length).toBe(0);
  expect(routes.PATCH.length).toBe(0);
  expect(routes.POST.length).toBe(0);
  expect(routes.DELETE.length).toBe(0);
});

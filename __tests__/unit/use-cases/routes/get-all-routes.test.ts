import { routesInfo } from "@/__tests__/utils/helpers";
import { TestingDiContainer } from "@/__tests__/utils/mock_container";

const getAllRoutesUseCase = TestingDiContainer.get("GetAllRoutesUseCase");

it("successfully get all route for a project", async () => {
  const routes = await getAllRoutesUseCase.execute({
    project_id: routesInfo.project_id,
  });

  expect(routes).toBeDefined();
  expect(routes.length).toBe(1);
  expect(routes[0].route_type).toBe("GET");
});

it("Expect to return an empty array if the project_id is invalid", async () => {
  const routes = await getAllRoutesUseCase.execute({
    project_id: "invalid_id",
  });

  expect(routes).toBeDefined();
  expect(routes.length).toBe(0);
});

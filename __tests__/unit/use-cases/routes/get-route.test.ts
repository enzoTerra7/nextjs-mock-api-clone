import { routesInfo } from "@/__tests__/utils/helpers";
import { TestingDiContainer } from "@/__tests__/utils/mock_container";
import { NotFoundError } from "@/src/domain/entities/errors/payload";

const getRouteUseCase = TestingDiContainer.get("GetRouteUseCase");

it("successfully get a route", async () => {
  const routes = await getRouteUseCase.execute({
    route_id: routesInfo.id,
  });

  expect(routes).toBeDefined();
  expect(routes.project_id).toBe(routesInfo.project_id);
  expect(routes.route_path).toBe(routesInfo.route_path);
  expect(routes.route_type).toBe("GET");
});

it("Expect to thrown an error because the route is invalid", async () => {
  expect(
    async () =>
      await getRouteUseCase.execute({
        route_id: "invalid_route_id",
      })
  ).rejects.toBeInstanceOf(NotFoundError);
});

import { TestingDiContainer } from "@/__tests__/utils/mock_container";
import { routesInfo } from "@/__tests__/utils/helpers";
import { BadRequestError } from "@/src/domain/entities/errors/payload";

const deleteRouteUseCase = TestingDiContainer.get("DeleteRouteUseCase");

it("successfully delete route", async () => {
  expect(
    async () =>
      await deleteRouteUseCase.execute({
        project_id: routesInfo.project_id,
        route_id: routesInfo.id,
        user_id: routesInfo.user_id,
      })
  ).not.toThrow();
});

it("throws for invalid input because of invalid user_id", () => {
  expect(
    async () =>
      await deleteRouteUseCase.execute({
        project_id: routesInfo.project_id,
        route_id: routesInfo.id,
        user_id: "invalid_user",
      })
  ).rejects.toBeInstanceOf(BadRequestError);
});

it("throws for invalid input because of invalid project_id", () => {
  expect(
    async () =>
      await deleteRouteUseCase.execute({
        project_id: "invalid_id",
        route_id: routesInfo.id,
        user_id: routesInfo.user_id,
      })
  ).rejects.toBeInstanceOf(BadRequestError);
});

it("throws for invalid input because of invalid id", () => {
  expect(
    async () =>
      await deleteRouteUseCase.execute({
        project_id: routesInfo.project_id,
        route_id: "invalid_id",
        user_id: routesInfo.user_id,
      })
  ).rejects.toBeInstanceOf(BadRequestError);
});

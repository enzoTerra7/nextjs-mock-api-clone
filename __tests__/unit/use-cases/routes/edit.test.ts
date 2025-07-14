import { TestingDiContainer } from "@/__tests__/utils/mock_container";
import { routesInfo, signInUserInfo } from "@/__tests__/utils/helpers";
import { BadRequestError } from "@/src/domain/entities/errors/payload";

const editRouteUseCase = TestingDiContainer.get("EditRouteUseCase");

it("returns the edited Route", async () => {
  const route = await editRouteUseCase.execute({
    data_builder_types: "AI",
    project_id: "aFWlYv0hs7Y9sAXvu8WydPrHftM",
    route_path: "my-route/1",
    route_type: "GET",
    user_id: signInUserInfo.id,
    schema: {
      content: "",
    },
    route_id: routesInfo.id,
  });

  expect(route).toHaveProperty("id");
  expect(route).toHaveProperty("route_type");
  expect(route).toHaveProperty("route_path");
  expect(route).toHaveProperty("schema");
  expect(route).toHaveProperty("project_id");
  expect(route).toHaveProperty("data_builder_types");
  expect(route.project_id).toBe("aFWlYv0hs7Y9sAXvu8WydPrHftM");
  expect(route.route_path).toBe("my-route/1");
  expect(route.route_type).toBe("GET");
  expect(route.data_builder_types).toBe("AI");
});

it("throws for invalid input because of invalid user_id", () => {
  expect(
    async () =>
      await editRouteUseCase.execute({
        data_builder_types: "FAKER",
        project_id: "aFWlYv0hs7Y9sAXvu8WydPrHftM",
        route_path: "my-route/1",
        route_type: "GET",
        user_id: "invalid_user",
        schema: {
          content: "",
        },
        route_id: routesInfo.id,
      })
  ).rejects.toBeInstanceOf(BadRequestError);
});

it("throws for invalid input because of invalid project_id", () => {
  expect(
    async () =>
      await editRouteUseCase.execute({
        data_builder_types: "AI",
        project_id: "invalid_id",
        route_path: "my-route/1",
        route_type: "GET",
        user_id: signInUserInfo.id,
        schema: {
          content: "",
        },
        route_id: routesInfo.id,
      })
  ).rejects.toBeInstanceOf(BadRequestError);
});

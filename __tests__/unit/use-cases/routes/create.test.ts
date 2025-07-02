import { TestingDiContainer } from "@/__tests__/utils/mock_container";
import { signInUserInfo } from "@/__tests__/utils/helpers";
import { BadRequestError } from "@/src/domain/entities/errors/payload";

const createRouteUseCase = TestingDiContainer.get("CreateRouteUseCase");

it("returns the created Route", async () => {
  const route = await createRouteUseCase.execute({
    data_builder_id: "aE8w6-00FunCDP-uy_uHGUn2zqs",
    project_id: "aFWlYv0hs7Y9sAXvu8WydPrHftM",
    route_path: "my-route/1",
    route_type: "GET",
    user_id: signInUserInfo.id,
  });

  expect(route).toHaveProperty("id");
  expect(route).toHaveProperty("route_type");
  expect(route).toHaveProperty("route_path");
  expect(route).toHaveProperty("schema");
  expect(route).toHaveProperty("project_id");
  expect(route).toHaveProperty("data_builder_id");
  expect(route.project_id).toBe("aFWlYv0hs7Y9sAXvu8WydPrHftM");
  expect(route.route_path).toBe("my-route/1");
  expect(route.route_type).toBe("GET");
  expect(route.data_builder_id).toBe("aE8w6-00FunCDP-uy_uHGUn2zqs");
});

it("throws for invalid input because of invalid user_id", () => {
  expect(
    async () =>
      await createRouteUseCase.execute({
        data_builder_id: "aE8w6-00FunCDP-uy_uHGUn2zqs",
        project_id: "aFWlYv0hs7Y9sAXvu8WydPrHftM",
        route_path: "my-route/1",
        route_type: "GET",
        user_id: "invalid_user",
      })
  ).rejects.toBeInstanceOf(BadRequestError);
});

it("throws for invalid input because of invalid project_id", () => {
  expect(
    async () =>
      await createRouteUseCase.execute({
        data_builder_id: "aE8w6-00FunCDP-uy_uHGUn2zqs",
        project_id: "invalid_id",
        route_path: "my-route/1",
        route_type: "GET",
        user_id: signInUserInfo.id,
      })
  ).rejects.toBeInstanceOf(BadRequestError);
});

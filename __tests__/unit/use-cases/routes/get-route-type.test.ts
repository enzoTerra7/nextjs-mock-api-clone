import { TestingDiContainer } from "@/__tests__/utils/mock_container";
import { NotFoundError } from "@/src/domain/entities/errors/payload";

const getRoutesTypeUseCase = TestingDiContainer.get("GetRoutesTypesUseCase");

it("successfully get a route-type by name GET", async () => {
  const routes = await getRoutesTypeUseCase.execute({
    type: "GET",
  });

  expect(routes).toBeDefined();
  expect(routes.name).toBe("GET");
});

it("successfully get a route-type by name POST", async () => {
  const routes = await getRoutesTypeUseCase.execute({
    type: "POST",
  });

  expect(routes).toBeDefined();
  expect(routes.name).toBe("POST");
});

it("successfully get a route-type by name PUT", async () => {
  const routes = await getRoutesTypeUseCase.execute({
    type: "PUT",
  });

  expect(routes).toBeDefined();
  expect(routes.name).toBe("PUT");
});

it("successfully get a route-type by name PATCH", async () => {
  const routes = await getRoutesTypeUseCase.execute({
    type: "PATCH",
  });

  expect(routes).toBeDefined();
  expect(routes.name).toBe("PATCH");
});

it("successfully get a route-type by name DELETE", async () => {
  const routes = await getRoutesTypeUseCase.execute({
    type: "DELETE",
  });

  expect(routes).toBeDefined();
  expect(routes.name).toBe("DELETE");
});

it("Expect to thrown an error because the route-type is invalid", async () => {
  expect(
    async () =>
      await getRoutesTypeUseCase.execute({
        type: "invalid_route_type",
      })
  ).rejects.toBeInstanceOf(NotFoundError);
});

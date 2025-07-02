import { TestingDiContainer } from "@/__tests__/utils/mock_container";

const getAllRoutesTypesUseCase = TestingDiContainer.get(
  "GetAllRoutesTypesUseCase"
);

it("successfully get all routes types", async () => {
  const routes_types = await getAllRoutesTypesUseCase.execute();

  expect(routes_types).toBeDefined();
  expect(routes_types.length).toBe(5);
  expect(routes_types[0].name).toBe("GET");
  expect(routes_types[1].name).toBe("POST");
  expect(routes_types[2].name).toBe("PUT");
  expect(routes_types[3].name).toBe("PATCH");
  expect(routes_types[4].name).toBe("DELETE");
});

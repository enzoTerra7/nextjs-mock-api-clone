import { DiContainer } from "@/src/di/container";
import { AIBuilderService } from "@/src/infra/services/data_builder/ai/ai.builder.service";
import { FakerBuilderService } from "@/src/infra/services/data_builder/faker/faker.builder.service";
import { cache } from "react";

export const getRoute = cache(async (route_id: string) => {
  const getRoute = DiContainer.get("GetRouteUseCase");

  const route = await getRoute.execute({
    route_id,
  });

  return {
    schema: route.schema.content,
    builder_generator: route.data_builder_types
  };
});

export const generateRouteResponse = cache(async ({
  schema,
  builder
}: {
  schema: string;
  builder: string
}) => {
  let result: unknown = {}
  if (builder === "AI") {
    result = await new AIBuilderService().construct(schema)
  }

  if (builder === "FAKER") {
    result = await new FakerBuilderService().construct(schema)
  }

  return result
})
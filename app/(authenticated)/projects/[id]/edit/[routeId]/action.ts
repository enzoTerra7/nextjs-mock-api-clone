"use server";

import { DiContainer } from "@/src/di/container";
import { cache } from "react";
import { createServerAction } from "zsa";
import { editRouteSchema } from "./definitions";
import { verifySession } from "@/app/_lib/auth/dal";
import z from "zod";
import { revalidatePath } from "next/cache";

export const getAllBuildersType = cache(async () => {
  const getAllBuildersUseCase = DiContainer.get("GetAllBuildersTypeUseCase");

  const buildersType = await getAllBuildersUseCase.execute();

  return buildersType;
});

export const getBuildersByType = cache(async (builder_type: string) => {
  const getAllBuildersByTypeUseCase = DiContainer.get(
    "GetAllBuildersByTypeUseCase"
  );

  const builders = await getAllBuildersByTypeUseCase.execute({
    data_builder_id: builder_type,
  });

  return builders;
});

export const editRoute = createServerAction()
  .input(
    editRouteSchema.and(
      z.object({
        project_id: z.string(),
        route_id: z.string(),
      })
    )
  )
  .handler(async ({ input }) => {
    const session = await verifySession();
    const editRouteUseCase = DiContainer.get("EditRouteUseCase");

    const schema = { content: "" };

    if (input.data_builder_id === "AI") {
      schema.content = input.schema;
    }

    if (input.data_builder_id === "FAKER") {
      schema.content = JSON.stringify(input.schema);
    }

    await editRouteUseCase.execute({
      data_builder_types: input.data_builder_id,
      project_id: input.project_id,
      route_path: input.route_path,
      route_type: input.route_type,
      route_id: input.route_id,
      user_id: session.userId,
      schema,
    });
    revalidatePath(`/projects/${input.project_id}`, "page")
  });

export const getRoute = cache(async (route_id: string) => {
  const getRoute = DiContainer.get("GetRouteUseCase");

  const route = await getRoute.execute({
    route_id,
  });

  const parsedSchema =
    route.data_builder_types !== "AI"
      ? (JSON.parse(route.schema.content) as {
        key: string;
        value: string;
      }[])
      : (route.schema.content as string);

  return {
    id: route.id,
    route_type: route.route_type,
    schema: parsedSchema,
    project_id: route.project_id,
    data_builder_types: route.data_builder_types,
    created_at: route.created_at,
    route_path: route.route_path,
  };
});

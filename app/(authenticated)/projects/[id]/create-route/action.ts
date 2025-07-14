"use server";

import { DiContainer } from "@/src/di/container";
import { cache } from "react";
import { createServerAction } from "zsa";
import { createRouteSchema } from "./definitions";
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

export const createRoute = createServerAction()
  .input(
    createRouteSchema.and(
      z.object({
        project_id: z.string(),
      })
    )
  )
  .handler(async ({ input }) => {
    const session = await verifySession();
    const createRouteUseCase = DiContainer.get("CreateRouteUseCase");

    const schema = { content: "" };

    if (input.data_builder_id === "AI") {
      schema.content = input.schema;
    }

    if (input.data_builder_id === "FAKER") {
      schema.content = JSON.stringify(input.schema);
    }

    await createRouteUseCase.execute({
      data_builder_types: input.data_builder_id,
      project_id: input.project_id,
      route_path: input.route_path,
      route_type: input.route_type,
      user_id: session.userId,
      schema,
    });

    revalidatePath(`/projects/${input.project_id}`, "page")
  });

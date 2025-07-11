"use server";
import { verifySession } from "@/app/_lib/auth/dal";
import { DiContainer } from "@/src/di/container";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import z from "zod";
import { createServerAction } from "zsa";

export const getProjectId = cache(async (id: string) => {
  const getProjectByIdUseCase = DiContainer.get("GetProjectByIdUseCase");

  const project = await getProjectByIdUseCase.execute({
    project_id: id,
  });

  return project;
});

export const getProjectRoutes = cache(async (id: string) => {
  const getProjectRoutes = DiContainer.get("GetProjectRoutesUseCase");

  const routes = await getProjectRoutes.execute({
    project_id: id,
  });

  return routes;
});

export const deleteProjectRoute = createServerAction()
  .input(
    z.object({
      project_id: z.string(),
      route_id: z.string(),
    })
  )
  .handler(async ({ input: { project_id, route_id } }) => {
    const session = await verifySession();
    const deleteRouteUseCase = DiContainer.get("DeleteRouteUseCase");

    await deleteRouteUseCase.execute({
      project_id,
      route_id,
      user_id: session.userId,
    });

    revalidatePath(`/projects/${project_id}`);
  });

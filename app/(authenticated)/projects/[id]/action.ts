"use server";
import { DiContainer } from "@/src/di/container";
import { cache } from "react";

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

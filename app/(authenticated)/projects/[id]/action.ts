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

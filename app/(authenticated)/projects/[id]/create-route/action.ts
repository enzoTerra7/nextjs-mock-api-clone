"use server";

import { DiContainer } from "@/src/di/container";
import { cache } from "react";

export const getAllBuildersType = cache(async () => {
  const getAllBuildersUseCase = DiContainer.get("GetAllBuildersTypeUseCase");

  const buildersType = await getAllBuildersUseCase.execute();

  return buildersType;
});

"use server";

import { DiContainer } from "@/src/di/container";
import { cache } from "react";

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

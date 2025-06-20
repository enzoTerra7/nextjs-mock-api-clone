"use server";

import { verifySession } from "@/app/_lib/auth/dal";
import { DiContainer } from "@/src/di/container";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import { z } from "zod";
import { createServerAction } from "zsa";

export const getAllProjects = cache(async () => {
  const session = await verifySession();

  const getAllProjectsUseCase = DiContainer.get("GetAllProjectsUseCase");

  const projects = await getAllProjectsUseCase.execute({
    user_id: session.userId,
  });

  return projects;
});

const createProjectSchema = z.object({
  name: z.string(),
});

export const createProjectAction = createServerAction()
  .input(createProjectSchema)
  .handler(async ({ input }) => {
    const session = await verifySession();
    const createProjectsUseCase = DiContainer.get("CreateProjectsUseCase");

    await createProjectsUseCase.execute({
      name: input.name,
      user_id: session.userId,
    });

    revalidatePath("/projects");

    return;
  });

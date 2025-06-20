"use server";
import { createSession } from "@/app/_lib/auth/session";
import { DiContainer } from "@/src/di/container";
import { z } from "zod";
import { createServerAction } from "zsa";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signInAction = createServerAction()
  .input(signInSchema)
  .handler(async ({ input }) => {
    const signInUseCase = DiContainer.get("SignInUseCase")("knex");

    const { user } = await signInUseCase.execute({
      ...input,
    });

    await createSession({
      email: user.email,
      userId: user.id,
      username: user.username,
      deleted_at: user.deleted_at,
    });

    return {
      user,
    };
  });

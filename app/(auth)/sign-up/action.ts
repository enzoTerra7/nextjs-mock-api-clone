"use server";
import { createSession } from "@/app/_lib/auth/session";
import { DiContainer } from "@/src/di/container";
import { z } from "zod";
import { createServerAction } from "zsa";

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    confirm_password: z.string(),
    username: z.string(),
  })
  .superRefine((args, context) => {
    if (args.password !== args.confirm_password) {
      context.addIssue({
        path: ["confirm_password"],
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match. ",
      });
    }
  });

export const signUpAction = createServerAction()
  .input(signUpSchema)
  .handler(async ({ input }) => {
    const signUpUseCase = DiContainer.get("SignUpUseCase")("knex");

    const { user } = await signUpUseCase.execute({
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

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

const fakerSchema = z.object({
  data_builder_id: z.literal("FAKER"),
  route_type: z.string().min(1, "Please, select a route type"),
  route_path: z.string().min(1, "Please, inform the path from this route"),
  schema: z
    .array(
      z.object({
        key: z.string(),
        value: z.string(),
      })
    )
    .min(1, "Please, set at least one line of type"),
});

const aiSchema = z.object({
  data_builder_id: z.literal("AI"),
  route_type: z.string().min(1, "Please, select a route type"),
  route_path: z.string().min(1, "Please, inform the path from this route"),
  schema: z
    .string()
    .refine(
      (schema) => schema.includes("type Response ="),
      "Please, add a type called Response"
    ),
});

export const createRouteSchema = z.discriminatedUnion("data_builder_id", [
  fakerSchema,
  aiSchema,
]);

type CreateRouteSchemaType = z.infer<typeof createRouteSchema>;

export type CreateRouteSchemaFormType = UseFormReturn<
  CreateRouteSchemaType,
  unknown,
  CreateRouteSchemaType
>;

export const aiSchemaDefault = `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
}

type Response = {
  data: Array<User>;
  total: number;
  pages: number;
  size: number;
}
`;

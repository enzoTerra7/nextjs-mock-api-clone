import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

const fakerSchema = z.object({
  data_builder_id: z.literal("FAKER"),
  route_type: z.string(),
  route_path: z.string(),
  schema: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    })
  ),
});

const aiSchema = z.object({
  data_builder_id: z.literal("AI"),
  route_type: z.string(),
  route_path: z.string(),
  schema: z.string(), // texto livre
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

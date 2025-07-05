import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const createRouteSchema = z.object({
  route_type: z.string(),
  route_path: z.string(),
  data_builder_id: z.string(),
  schema: z.record(z.string(), z.string()),
});

type CreateRouteSchemaType = z.infer<typeof createRouteSchema>;

export const createRouteInitialState: CreateRouteSchemaType = {
  data_builder_id: "",
  route_path: "",
  route_type: "",
  schema: {},
};

export type CreateRouteSchemaFormType = UseFormReturn<
  CreateRouteSchemaType,
  unknown,
  CreateRouteSchemaType
>;

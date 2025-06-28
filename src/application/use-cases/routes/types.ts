import { RoutesType } from "@/src/domain/entities/models/routes-type.entities";
import { Routes } from "@/src/domain/entities/models/routes.entities";

export type GetRoutesTypesInput = {
  type: string;
};
export type GetAllRoutesInput = {
  project_id: string;
};
export type GetRoutesInput = {
  route_id: string;
};

export type CreateRouteInput = {
  route_path: string;
  project_id: string;
  user_id: string;
  data_builder_id: string;
  route_type: string;
};

export type DeleteRouteInput = {
  route_id: string;
  project_id: string;
  user_id: string;
};

export type GetAllRoutesTypeOutput = Promise<RoutesType[]>;
export type GetRoutesTypeOutput = Promise<RoutesType>;
export type GetAllRoutesOutput = Promise<Routes[]>;
export type GetRouteOutput = Promise<Routes>;
export type CreateRouteOutput = Promise<Routes>;
export type DeleteRouteOutput = Promise<void>;

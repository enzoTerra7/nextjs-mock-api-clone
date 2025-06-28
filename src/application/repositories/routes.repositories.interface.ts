import { RoutesType } from "@/src/domain/entities/models/routes-type.entities";
import { Routes } from "@/src/domain/entities/models/routes.entities";
import { IRoutesInputCreate } from "../validators/routes/route.input.create";
import { IRoutesInputDelete } from "../validators/routes/route.input.delete";
import { IRoutesInputValidateProject } from "../validators/routes/route.input.validate-project";

export interface IRoutesRepository {
  getAllRoutesTypes(): Promise<RoutesType[]>;
  getRouteType(type: string): Promise<RoutesType>;

  getAllRoutes(project_id: string): Promise<Routes[]>;
  getRoute(route_id: string): Promise<Routes>;

  createRoute(input: IRoutesInputCreate): Promise<Routes>;
  deleteRoute(input: IRoutesInputDelete): Promise<void>;

  validateProject(input: IRoutesInputValidateProject): Promise<boolean>;
}

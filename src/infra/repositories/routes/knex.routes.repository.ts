import { IRoutesRepository } from "@/src/application/repositories/routes.repositories.interface";
import { RoutesType } from "@/src/domain/entities/models/routes-type.entities";
import { knexDb } from "../../database/knex/knex";
import {
  BadRequestError,
  NotFoundError,
} from "@/src/domain/entities/errors/payload";
import { Routes } from "@/src/domain/entities/models/routes.entities";
import { IRoutesInputCreate } from "@/src/application/validators/routes/route.input.create";
import { IRoutesInputDelete } from "@/src/application/validators/routes/route.input.delete";
import { IRoutesInputValidateProject } from "@/src/application/validators/routes/route.input.validate-project";

export class KnexRoutesRepository implements IRoutesRepository {
  constructor() {}

  async validateProject(input: IRoutesInputValidateProject): Promise<boolean> {
    const project = await knexDb("projects")
      .select("user_id")
      .where("id", input.project_id)
      .first();

    if (!project) {
      return false;
    }

    if (project.user_id !== input.user_id) {
      return false;
    }

    return true;
  }

  async getRouteType(type: string): Promise<RoutesType> {
    const routeType = await knexDb("routes_types")
      .select("*")
      .where("name", type)
      .first();

    if (!routeType) {
      throw new NotFoundError("Invalid route type");
    }

    return routeType;
  }

  async getAllRoutesTypes(): Promise<RoutesType[]> {
    const routesType = await knexDb("routes_types").select("*");

    return routesType;
  }

  async getRoute(route_id: string): Promise<Routes> {
    const route = await knexDb("routes")
      .select("*")
      .where("id", route_id)
      .first();

    if (!route) {
      throw new NotFoundError("Route not found");
    }

    return route;
  }

  async getAllRoutes(project_id: string): Promise<Routes[]> {
    const routes = await knexDb("routes")
      .select("*")
      .where("project_id", project_id);

    return routes;
  }

  async createRoute(input: IRoutesInputCreate): Promise<Routes> {
    const isAValidProject = await this.validateProject({
      project_id: input.project_id,
      user_id: input.user_id,
    });

    if (!isAValidProject) {
      throw new BadRequestError("Invalid body");
    }

    const route = await knexDb("routes")
      .insert({
        project_id: input.project_id,
        data_builder_id: input.data_builder_id,
        route_path: input.route_path,
        route_type: input.route_type,
        schema: {},
      })
      .returning("*")
      .first();

    return route!;
  }

  async deleteRoute(input: IRoutesInputDelete): Promise<void> {
    const isAValidProject = await this.validateProject({
      project_id: input.project_id,
      user_id: input.user_id,
    });

    if (!isAValidProject) {
      throw new BadRequestError("Invalid body");
    }

    await knexDb("routes")
      .delete()
      .where("id", input.route_id)
      .andWhere("project_id", input.project_id);

    return;
  }
}

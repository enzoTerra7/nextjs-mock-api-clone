import "server-only";
import { IRoutesRepository } from "@/src/application/repositories/routes.repositories.interface";
import { RoutesType } from "@/src/domain/entities/models/routes-type.entities";
import { DrizzleDb } from "../../database/drizzle";
import {
  BadRequestError,
  NotFoundError,
} from "@/src/domain/entities/errors/payload";
import { Routes } from "@/src/domain/entities/models/routes.entities";
import {
  IRoutesInputCreate,
  IRoutesInputEdit,
} from "@/src/application/validators/routes/route.input.create";
import { IRoutesInputDelete } from "@/src/application/validators/routes/route.input.delete";
import { IRoutesInputValidateProject } from "@/src/application/validators/routes/route.input.validate-project";
import { routesTable } from "../../database/schemas";
import { eq } from "drizzle-orm";

export class DrizzleRoutesRepository implements IRoutesRepository {
  constructor() {}

  async validateProject(input: IRoutesInputValidateProject): Promise<boolean> {
    const project = await DrizzleDb.query.projectsTable.findFirst({
      where(fields, operators) {
        return (
          operators.eq(fields.id, input.project_id) &&
          operators.eq(fields.user_id, input.user_id)
        );
      },
    });

    if (!project) {
      return false;
    }

    if (project.user_id !== input.user_id) {
      return false;
    }

    return true;
  }

  async getRouteType(type: string): Promise<RoutesType> {
    const routeType = await DrizzleDb.query.routesTypesTable.findFirst({
      where(fields, operators) {
        return operators.eq(fields.name, type);
      },
    });

    if (!routeType) {
      throw new NotFoundError("Invalid route type");
    }

    return routeType;
  }

  async getAllRoutesTypes(): Promise<RoutesType[]> {
    const routesType = await DrizzleDb.query.routesTypesTable.findMany();

    return routesType;
  }

  async getRoute(route_id: string): Promise<Routes> {
    const route = await DrizzleDb.query.routesTable.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, route_id);
      },
    });

    if (!route) {
      throw new NotFoundError("Route not found");
    }

    return route as Routes;
  }

  async getAllRoutes(project_id: string): Promise<Routes[]> {
    const routes = await DrizzleDb.query.routesTable.findMany({
      where(fields, operators) {
        return operators.eq(fields.project_id, project_id);
      },
    });

    return routes as Routes[];
  }

  async createRoute(input: IRoutesInputCreate): Promise<Routes> {
    const isAValidProject = await this.validateProject({
      project_id: input.project_id,
      user_id: input.user_id,
    });

    if (!isAValidProject) {
      throw new BadRequestError("Invalid body");
    }

    const [route] = await DrizzleDb.insert(routesTable)
      .values({
        project_id: input.project_id,
        data_builder_types: input.data_builder_types,
        route_path: input.route_path,
        route_type: input.route_type,
        schema: {},
      })
      .returning();

    return route as Routes;
  }
  async editRoute(input: IRoutesInputEdit): Promise<Routes> {
    const isAValidProject = await this.validateProject({
      project_id: input.project_id,
      user_id: input.user_id,
    });

    if (!isAValidProject) {
      throw new BadRequestError("Invalid body");
    }

    const [route] = await DrizzleDb.update(routesTable)
      .set({
        project_id: input.project_id,
        data_builder_types: input.data_builder_types,
        route_path: input.route_path,
        route_type: input.route_type,
        schema: {},
      })
      .where(eq(routesTable.id, input.route_id))
      .returning();

    return route as Routes;
  }

  async deleteRoute(input: IRoutesInputDelete): Promise<void> {
    const isAValidProject = await this.validateProject({
      project_id: input.project_id,
      user_id: input.user_id,
    });

    if (!isAValidProject) {
      throw new BadRequestError("Invalid body");
    }

    await DrizzleDb.delete(routesTable).where(
      eq(routesTable.id, input.route_id)
    );
    return;
  }
}

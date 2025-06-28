import { generateKSUID } from "@/shared/generate_id";
import {
  ProjectsSchema,
  RoutesSchema,
  RoutesTypeSchema,
} from "../../database/schemas";
import {
  BadRequestError,
  NotFoundError,
} from "@/src/domain/entities/errors/payload";
import { IRoutesRepository } from "@/src/application/repositories/routes.repositories.interface";
import { IRoutesInputValidateProject } from "@/src/application/validators/routes/route.input.validate-project";
import { RoutesType } from "@/src/domain/entities/models/routes-type.entities";
import { Routes } from "@/src/domain/entities/models/routes.entities";
import { IRoutesInputCreate } from "@/src/application/validators/routes/route.input.create";
import { IRoutesInputDelete } from "@/src/application/validators/routes/route.input.delete";

export class MockProjectsRepository implements IRoutesRepository {
  private _projects: ProjectsSchema[];
  private _routes: RoutesSchema[];
  private _routes_types: RoutesTypeSchema[];

  constructor(user_id: string) {
    this._projects = [
      {
        id: "aFWlYv0hs7Y9sAXvu8WydPrHftM",
        name: "Project 1",
        user_id,
        created_at: new Date().toISOString(),
      },
      {
        id: "aFWlYmwmuKuCbejOpYrZrWV_GcU",
        name: "Project 2",
        user_id,
        created_at: new Date().toISOString(),
      },
      {
        id: "aFWlYnVYqANPg8zJsluWKMcii2U",
        name: "Project 3",
        user_id,
        created_at: new Date().toISOString(),
      },
      {
        id: "aFWlYuLjrLi8KT41AkBODLvsSc8",
        name: "Project 4",
        user_id,
        created_at: new Date().toISOString(),
      },
    ];

    this._routes_types = [
      {
        name: "GET",
      },
      {
        name: "POST",
      },
      {
        name: "PUT",
      },
      {
        name: "PATCH",
      },
      {
        name: "DELETE",
      },
    ];

    this._routes = [
      {
        created_at: new Date().toISOString(),
        data_builder_id: "aE8w6-00FunCDP-uy_uHGUn2zqs",
        id: "aGADdPdr769Gph7MFESVqSGo-d0",
        project_id: "aFWlYv0hs7Y9sAXvu8WydPrHftM",
        route_path: "my-route/1",
        route_type: "GET",
        schema: {},
      },
      {
        created_at: new Date().toISOString(),
        data_builder_id: "aE8w6-00FunCDP-uy_uHGUn2zqs",
        id: "aGADdObVVNNJU1Yzew-9uMb5RNM",
        project_id: "aFWlYmwmuKuCbejOpYrZrWV_GcU",
        route_path: "my-route/2",
        route_type: "POST",
        schema: {},
      },
      {
        created_at: new Date().toISOString(),
        data_builder_id: "aE8w6-00FunCDP-uy_uHGUn2zqs",
        id: "aGADdGyfRaXI0Cv9crGa04qguW4",
        project_id: "aFWlYnVYqANPg8zJsluWKMcii2U",
        route_path: "my-route/1",
        route_type: "DELETE",
        schema: {},
      },
      {
        created_at: new Date().toISOString(),
        data_builder_id: "aE8w6-00FunCDP-uy_uHGUn2zqs",
        id: "aGADdIFk6Qe7zaelDkT2ooUDQ-k",
        project_id: "aFWlYuLjrLi8KT41AkBODLvsSc8",
        route_path: "my-route/4",
        route_type: "PUT",
        schema: {},
      },
    ];
  }

  async validateProject(input: IRoutesInputValidateProject): Promise<boolean> {
    const project = this._projects.find(
      (project) => project.id === input.project_id
    );

    if (!project) {
      return false;
    }

    if (project.user_id !== input.user_id) {
      return false;
    }

    return true;
  }

  async getRouteType(type: string): Promise<RoutesType> {
    const routeType = this._routes_types.find(
      (route_type) => route_type.name === type
    );

    if (!routeType) {
      throw new NotFoundError("Invalid route type");
    }

    return routeType;
  }

  async getAllRoutesTypes(): Promise<RoutesType[]> {
    const routesType = this._routes_types;

    return routesType;
  }

  async getRoute(route_id: string): Promise<Routes> {
    const route = this._routes.find((route) => route.id === route_id);

    if (!route) {
      throw new NotFoundError("Route not found");
    }

    return route;
  }

  async getAllRoutes(project_id: string): Promise<Routes[]> {
    const routes = this._routes.filter(
      (route) => route.project_id === project_id
    );

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

    const route: RoutesSchema = {
      project_id: input.project_id,
      data_builder_id: input.data_builder_id,
      route_path: input.route_path,
      route_type: input.route_type,
      id: generateKSUID(),
      created_at: new Date().toISOString(),
      schema: {},
    };

    this._routes.push(route);

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

    const route_index = this._routes.findIndex(
      (route) => route.id === input.route_id
    );

    if (route_index < 0) {
      throw new BadRequestError("Route not found");
    }

    this._routes.splice(route_index, 1);

    return;
  }
}

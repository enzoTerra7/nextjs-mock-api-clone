import { GetProjectRoutesInput, GetProjectRoutesOutput } from "./types";
import { IProjectsRepository } from "../../repositories/projects.repository.interface";

export class GetProjectRoutesUseCase {
  constructor(private projectsRepository: IProjectsRepository) {}

  async execute(input: GetProjectRoutesInput): GetProjectRoutesOutput {
    const routes = await this.projectsRepository.getProjectRoutes(
      input.project_id
    );

    const grouped_routes = routes.reduce(
      (acc, route) => {
        if (!acc[route.route_type]) {
          acc[route.route_type] = [];
        }
        acc[route.route_type].push(route);
        return acc;
      },
      {
        GET: [],
        PUT: [],
        POST: [],
        PATCH: [],
        DELETE: [],
      } as Record<string, typeof routes>
    );

    return grouped_routes;
  }
}

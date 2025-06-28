"use server";
import { GetAllRoutesInput, GetAllRoutesOutput } from "./types";
import { IRoutesRepository } from "../../repositories/routes.repositories.interface";

export class GetAllRoutesUseCase {
  constructor(private routesRepository: IRoutesRepository) {}

  async execute({ project_id }: GetAllRoutesInput): GetAllRoutesOutput {
    const routes = await this.routesRepository.getAllRoutes(project_id);

    return routes;
  }
}

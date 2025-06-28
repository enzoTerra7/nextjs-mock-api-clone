"use server";
import { GetRoutesInput, GetRouteOutput } from "./types";
import { IRoutesRepository } from "../../repositories/routes.repositories.interface";

export class GetRouteUseCase {
  constructor(private routesRepository: IRoutesRepository) {}

  async execute({ route_id }: GetRoutesInput): GetRouteOutput {
    const routes = await this.routesRepository.getRoute(route_id);

    return routes;
  }
}

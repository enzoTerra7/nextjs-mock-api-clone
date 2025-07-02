import { IRoutesRepository } from "@application/repositories/routes.repositories.interface";
import { CreateRouteInput, CreateRouteOutput } from "./types";

export class CreateRouteUseCase {
  constructor(private routesRepository: IRoutesRepository) {}

  async execute(input: CreateRouteInput): CreateRouteOutput {
    try {
      const route = await this.routesRepository.createRoute(input);

      return route;
    } catch (e) {
      console.error("Something went wrong:", e);
      throw e;
    }
  }
}

"use server";
import { CreateRouteInput, CreateRouteOutput } from "./types";
import { IRoutesRepository } from "../../repositories/routes.repositories.interface";

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

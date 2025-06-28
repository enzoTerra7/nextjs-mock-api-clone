"use server";
import { GetRoutesTypesInput, GetRoutesTypeOutput } from "./types";
import { IRoutesRepository } from "../../repositories/routes.repositories.interface";

export class GetRoutesTypesUseCase {
  constructor(private routesRepository: IRoutesRepository) {}

  async execute({ type }: GetRoutesTypesInput): GetRoutesTypeOutput {
    const route_type = await this.routesRepository.getRouteType(type);

    return route_type;
  }
}

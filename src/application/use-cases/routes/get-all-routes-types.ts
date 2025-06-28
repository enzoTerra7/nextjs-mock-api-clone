"use server";
import { GetAllRoutesTypeOutput } from "./types";
import { IRoutesRepository } from "../../repositories/routes.repositories.interface";

export class GetAllRoutesTypesUseCase {
  constructor(private routesRepository: IRoutesRepository) {}

  async execute(): GetAllRoutesTypeOutput {
    const route_types = await this.routesRepository.getAllRoutesTypes();

    return route_types;
  }
}

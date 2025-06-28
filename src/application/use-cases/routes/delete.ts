"use server";
import { DeleteRouteInput, DeleteRouteOutput } from "./types";
import { IRoutesRepository } from "../../repositories/routes.repositories.interface";

export class DeleteRouteUseCase {
  constructor(private routesRepository: IRoutesRepository) {}

  async execute(input: DeleteRouteInput): DeleteRouteOutput {
    await this.routesRepository.deleteRoute(input);

    return;
  }
}

import { IRoutesRepository } from "@application/repositories/routes.repositories.interface";
import { EditRouteOutput, EditRouteInput } from "./types";

export class EditRouteUseCase {
  constructor(private routesRepository: IRoutesRepository) {}

  async execute(input: EditRouteInput): EditRouteOutput {
    try {
      const route = await this.routesRepository.editRoute(input);

      return route;
    } catch (e) {
      console.error("Something went wrong:", e);
      throw e;
    }
  }
}

import { IRoutesRepository } from "@application/repositories/routes.repositories.interface";
import { EditRouteUseCase } from "@application/use-cases/routes/edit";

export function editRouteUseCaseFactory(routesRepository: IRoutesRepository) {
  return new EditRouteUseCase(routesRepository);
}

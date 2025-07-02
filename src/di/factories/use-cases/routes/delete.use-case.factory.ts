import { IRoutesRepository } from "@application/repositories/routes.repositories.interface";
import { DeleteRouteUseCase } from "@application/use-cases/routes/delete";

export function deleteRouteUseCaseFactory(routesRepository: IRoutesRepository) {
  return new DeleteRouteUseCase(routesRepository);
}

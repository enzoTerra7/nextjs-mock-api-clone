import { IRoutesRepository } from "@application/repositories/routes.repositories.interface";
import { GetRouteUseCase } from "@application/use-cases/routes/get-routes";

export function getRouteUseCaseFactory(routesRepository: IRoutesRepository) {
  return new GetRouteUseCase(routesRepository);
}

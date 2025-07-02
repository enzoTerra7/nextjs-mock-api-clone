import { IRoutesRepository } from "@application/repositories/routes.repositories.interface";
import { GetRoutesTypesUseCase } from "@application/use-cases/routes/get-routes-types";

export function getRouteTypeUseCaseFactory(
  routesRepository: IRoutesRepository
) {
  return new GetRoutesTypesUseCase(routesRepository);
}

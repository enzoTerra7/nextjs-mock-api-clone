import { IRoutesRepository } from "@/src/application/repositories/routes.repositories.interface";
import { GetRoutesTypesUseCase } from "@/src/application/use-cases/routes/get-routes-types";

export function getRouteTypeUseCaseFactory(
  routesRepository: IRoutesRepository
) {
  return new GetRoutesTypesUseCase(routesRepository);
}

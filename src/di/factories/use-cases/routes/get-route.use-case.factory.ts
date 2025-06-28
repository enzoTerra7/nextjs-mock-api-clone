import { IRoutesRepository } from "@/src/application/repositories/routes.repositories.interface";
import { GetRouteUseCase } from "@/src/application/use-cases/routes/get-routes";

export function getRouteUseCaseFactory(routesRepository: IRoutesRepository) {
  return new GetRouteUseCase(routesRepository);
}

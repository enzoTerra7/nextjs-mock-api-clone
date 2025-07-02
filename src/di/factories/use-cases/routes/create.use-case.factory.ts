import { IRoutesRepository } from "@application/repositories/routes.repositories.interface";
import { CreateRouteUseCase } from "@application/use-cases/routes/create";

export function createRouteUseCaseFactory(routesRepository: IRoutesRepository) {
  return new CreateRouteUseCase(routesRepository);
}

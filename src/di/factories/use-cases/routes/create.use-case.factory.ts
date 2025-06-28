import { IRoutesRepository } from "@/src/application/repositories/routes.repositories.interface";
import { CreateRouteUseCase } from "@/src/application/use-cases/routes/create";

export function createRouteUseCaseFactory(routesRepository: IRoutesRepository) {
  return new CreateRouteUseCase(routesRepository);
}

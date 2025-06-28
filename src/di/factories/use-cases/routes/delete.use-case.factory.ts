import { IRoutesRepository } from "@/src/application/repositories/routes.repositories.interface";
import { DeleteRouteUseCase } from "@/src/application/use-cases/routes/delete";

export function deleteRouteUseCaseFactory(routesRepository: IRoutesRepository) {
  return new DeleteRouteUseCase(routesRepository);
}

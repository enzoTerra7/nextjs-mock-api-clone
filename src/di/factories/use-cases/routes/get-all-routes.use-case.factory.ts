import { IRoutesRepository } from "@application/repositories/routes.repositories.interface";
import { GetAllRoutesUseCase } from "@application/use-cases/routes/get-all-routes";

export function getAllRoutesUseCaseFactory(
  routesRepository: IRoutesRepository
) {
  return new GetAllRoutesUseCase(routesRepository);
}

import { IRoutesRepository } from "@application/repositories/routes.repositories.interface";
import { GetAllRoutesTypesUseCase } from "@application/use-cases/routes/get-all-routes-types";

export function getAllRoutesTypeUseCaseFactory(
  routesRepository: IRoutesRepository
) {
  return new GetAllRoutesTypesUseCase(routesRepository);
}

import { IRoutesRepository } from "@/src/application/repositories/routes.repositories.interface";
import { GetAllRoutesTypesUseCase } from "@/src/application/use-cases/routes/get-all-routes-types";

export function getAllRoutesTypeUseCaseFactory(
  routesRepository: IRoutesRepository
) {
  return new GetAllRoutesTypesUseCase(routesRepository);
}

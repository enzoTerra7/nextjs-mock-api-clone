import { IRoutesRepository } from "@/src/application/repositories/routes.repositories.interface";
import { GetAllRoutesUseCase } from "@/src/application/use-cases/routes/get-all-routes";

export function getAllRoutesUseCaseFactory(
  routesRepository: IRoutesRepository
) {
  return new GetAllRoutesUseCase(routesRepository);
}

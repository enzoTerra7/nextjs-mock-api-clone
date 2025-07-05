import { IDataBuilderRepository } from "@/src/application/repositories/data-builder.repository.interface";
import { GetAllBuildersByTypeUseCase } from "@/src/application/use-cases/data-builder/get-all-builders-by-type";

export function getAllBuildersByTypeUseCase(
  dataBuilderRepository: IDataBuilderRepository
) {
  return new GetAllBuildersByTypeUseCase(dataBuilderRepository);
}

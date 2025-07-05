import { IDataBuilderRepository } from "@/src/application/repositories/data-builder.repository.interface";
import { GetAllDataBuilderTypesUseCase } from "@/src/application/use-cases/data-builder/get-all-types";

export function getAllBuildersTypeUseCase(
  dataBuilderRepository: IDataBuilderRepository
) {
  return new GetAllDataBuilderTypesUseCase(dataBuilderRepository);
}

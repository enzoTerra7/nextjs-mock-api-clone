import { IDataBuilderRepository } from "../../repositories/data-builder.repository.interface";
import { GetAllDataTypesOutput } from "./types";

export class GetAllDataBuilderTypesUseCase {
  constructor(private dataBuilderRepository: IDataBuilderRepository) {}

  async execute(): GetAllDataTypesOutput {
    const buildersType =
      await this.dataBuilderRepository.getAllDataBuilderTypes();

    return buildersType;
  }
}

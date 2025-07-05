import { IDataBuilderRepository } from "../../repositories/data-builder.repository.interface";
import { GetAllBuildersByTypeInput, GetAllBuildersByTypeOutput } from "./types";

export class GetAllBuildersByTypeUseCase {
  constructor(private dataBuilderRepository: IDataBuilderRepository) {}

  async execute({
    data_builder_id,
  }: GetAllBuildersByTypeInput): GetAllBuildersByTypeOutput {
    const buildersType =
      await this.dataBuilderRepository.getAllDataBuildersByType(
        data_builder_id
      );

    return buildersType;
  }
}

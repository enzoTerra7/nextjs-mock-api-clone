import { DataBuilderType } from "@/src/domain/entities/models/data-builder-type.entities";
import { DataBuilder } from "@/src/domain/entities/models/data-builder.entities";

export interface IDataBuilderRepository {
  getAllDataBuilders(): Promise<DataBuilder[]>;
  getAllDataBuildersByType(
    data_builder_type_id: string
  ): Promise<DataBuilder[]>;
  getOneDataBuilder(id: string): Promise<DataBuilder>;
  getAllDataBuilderTypes(): Promise<DataBuilderType[]>;
  getOneDataBuilderTypes(name: string): Promise<DataBuilderType>;
}

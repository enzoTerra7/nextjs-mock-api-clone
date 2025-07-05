import { DataBuilderType } from "@/src/domain/entities/models/data-builder-type.entities";
import { DataBuilder } from "@/src/domain/entities/models/data-builder.entities";

export type GetAllDataTypesOutput = Promise<DataBuilderType[]>;

export type GetAllBuildersByTypeInput = {
  data_builder_id: string;
};

export type GetAllBuildersByTypeOutput = Promise<DataBuilder[]>;

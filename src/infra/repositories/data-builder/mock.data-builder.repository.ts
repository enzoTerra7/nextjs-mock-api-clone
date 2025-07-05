import { NotFoundError } from "@/src/domain/entities/errors/payload";
import { IDataBuilderRepository } from "@/src/application/repositories/data-builder.repository.interface";
import { DataBuilderType } from "@/src/domain/entities/models/data-builder-type.entities";
import { DataBuilder } from "@/src/domain/entities/models/data-builder.entities";

export class MockDataBuilderRepository implements IDataBuilderRepository {
  private _data_builder_types: DataBuilderType[] = [];
  private _data_builders: DataBuilder[] = [];

  constructor() {
    this._data_builders = [
      {
        data_builder_type_id: "FAKER",
        id: "aGlurjS6u8KylbMKIsAtcmfFPU8",
        name: "internet.name",
      },
      {
        data_builder_type_id: "FAKER",
        id: "aGluru6ULx1MkCGSU6_dyC-w_f0",
        name: "internet.email",
      },
      {
        data_builder_type_id: "FAKER",
        id: "aGlurpAFNoIOBGsqJWKsURYaBjM",
        name: "internet.password",
      },
    ];
    this._data_builder_types = [
      {
        name: "FAKER",
      },
      {
        name: "AI",
      },
    ];
  }

  async getAllDataBuilderTypes(): Promise<DataBuilderType[]> {
    return this._data_builder_types;
  }

  async getAllDataBuilders(): Promise<DataBuilder[]> {
    return this._data_builders;
  }

  async getAllDataBuildersByType(
    data_builder_type_id: string
  ): Promise<DataBuilder[]> {
    const dataBuilder = this._data_builders.filter(
      (dataBuilder) => dataBuilder.data_builder_type_id === data_builder_type_id
    );

    return dataBuilder;
  }

  async getOneDataBuilder(id: string): Promise<DataBuilder> {
    const dataBuilder = this._data_builders.find(
      (dataBuilder) => dataBuilder.id === id
    );

    if (!dataBuilder) {
      throw new NotFoundError("Data builder not exist");
    }

    return dataBuilder;
  }

  async getOneDataBuilderTypes(name: string): Promise<DataBuilderType> {
    const dataBuilderType = this._data_builder_types.find(
      (builderType) => builderType.name === name
    );

    if (!dataBuilderType) {
      throw new NotFoundError("Data builder type not exist");
    }

    return dataBuilderType;
  }
}

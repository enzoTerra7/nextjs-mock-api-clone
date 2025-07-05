import "server-only";
import { NotFoundError } from "@/src/domain/entities/errors/payload";
import { IDataBuilderRepository } from "@/src/application/repositories/data-builder.repository.interface";
import { DataBuilderType } from "@/src/domain/entities/models/data-builder-type.entities";
import { DataBuilder } from "@/src/domain/entities/models/data-builder.entities";
import { knexDb } from "../../database/knex/knex";

export class KnexDataBuilderRepository implements IDataBuilderRepository {
  constructor() {}

  async getAllDataBuilderTypes(): Promise<DataBuilderType[]> {
    const dataBuildersType = await knexDb("data_builder_types").select("*");

    return dataBuildersType;
  }

  async getAllDataBuilders(): Promise<DataBuilder[]> {
    const dataBuilders = await knexDb("data_builders").select("*");

    return dataBuilders;
  }

  async getAllDataBuildersByType(
    data_builder_type_id: string
  ): Promise<DataBuilder[]> {
    const dataBuildersType = await knexDb("data_builders")
      .select("*")
      .where("data_builder_type_id", data_builder_type_id);

    return dataBuildersType;
  }

  async getOneDataBuilder(id: string): Promise<DataBuilder> {
    const dataBuilder = await knexDb("data_builders")
      .select("*")
      .where("id", id)
      .first();

    if (!dataBuilder) {
      throw new NotFoundError("Data builder not exist");
    }

    return dataBuilder;
  }

  async getOneDataBuilderTypes(name: string): Promise<DataBuilderType> {
    const dataBuilderType = await knexDb("data_builder_types")
      .select("*")
      .where("name", name)
      .first();

    if (!dataBuilderType) {
      throw new NotFoundError("Data builder type not exist");
    }

    return dataBuilderType;
  }
}

import "server-only";
import { NotFoundError } from "@/src/domain/entities/errors/payload";
import { IDataBuilderRepository } from "@/src/application/repositories/data-builder.repository.interface";
import { DataBuilderType } from "@/src/domain/entities/models/data-builder-type.entities";
import { DataBuilder } from "@/src/domain/entities/models/data-builder.entities";
import { DrizzleDb } from "../../database/drizzle";

export class DrizzleDataBuilderRepository implements IDataBuilderRepository {
  constructor() {}

  async getAllDataBuilderTypes(): Promise<DataBuilderType[]> {
    const dataBuildersType =
      await DrizzleDb.query.dataBuilderTypesTable.findMany();

    return dataBuildersType;
  }

  async getAllDataBuilders(): Promise<DataBuilder[]> {
    const dataBuilders = await DrizzleDb.query.dataBuildersTable.findMany();

    return dataBuilders;
  }

  async getAllDataBuildersByType(
    data_builder_type_id: string
  ): Promise<DataBuilder[]> {
    const dataBuildersType = await DrizzleDb.query.dataBuildersTable.findMany({
      where(fields, operators) {
        return operators.eq(fields.data_builder_type_id, data_builder_type_id);
      },
    });

    return dataBuildersType;
  }

  async getOneDataBuilder(id: string): Promise<DataBuilder> {
    const dataBuilder = await DrizzleDb.query.dataBuildersTable.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, id);
      },
    });

    if (!dataBuilder) {
      throw new NotFoundError("Data builder not exist");
    }

    return dataBuilder;
  }

  async getOneDataBuilderTypes(name: string): Promise<DataBuilderType> {
    const dataBuilderType =
      await DrizzleDb.query.dataBuilderTypesTable.findFirst({
        where(fields, operators) {
          return operators.eq(fields.name, name);
        },
      });

    if (!dataBuilderType) {
      throw new NotFoundError("Data builder type not exist");
    }

    return dataBuilderType;
  }
}

import {
  DataBuilderSchema,
  DataBuilderTypeSchema,
} from "./src/infra/database/schemas/data_builder";
import { ProjectsSchema } from "./src/infra/database/schemas/projects";
import {
  RoutesSchema,
  RoutesTypeSchema,
} from "./src/infra/database/schemas/routes";
import { UsersSchema } from "./src/infra/database/schemas/user";
declare module "knex/types/tables" {
  interface Tables {
    users: UsersSchema;
    routes_types: RoutesTypeSchema;
    routes: RoutesSchema;
    projects: ProjectsSchema;
    data_builders: DataBuilderSchema;
    data_builder_types: DataBuilderTypeSchema;
  }
}

import "server-only";
import { DrizzleDb } from "../../database/drizzle";
import { IProjectsRepository } from "@/src/application/repositories/projects.repository.interface";
import { Project } from "@/src/domain/entities/models/project.entities";
import { projectsTable } from "../../database/schemas";
import { IProjectInputCreate } from "@/src/application/validators/project/project.input.create";
import { eq } from "drizzle-orm";
import { IProjectInputDelete } from "@/src/application/validators/project/project.input.delete";

export class DrizzleProjectsRepository implements IProjectsRepository {
  constructor() {}

  async getAllProjects(user_id: string): Promise<Project[]> {
    const projects = await DrizzleDb.query.projectsTable.findMany({
      where: (project, { eq }) => eq(project.user_id, user_id),
      orderBy(fields, operators) {
        return [operators.desc(fields.created_at)];
      },
    });

    const projectsDto = projects.map((project) =>
      Project.create({
        id: project.id,
        name: project.name,
        user_id: project.user_id,
      })
    );

    return projectsDto;
  }

  async createProject(input: IProjectInputCreate): Promise<Project> {
    const [project] = await DrizzleDb.insert(projectsTable)
      .values({
        name: input.name,
        user_id: input.user_id,
      })
      .returning();

    const projectDto = Project.create({
      id: project.id,
      name: project.name,
      user_id: project.user_id,
    });

    return projectDto;
  }

  async deleteProject(input: IProjectInputDelete): Promise<void> {
    await DrizzleDb.delete(projectsTable).where(
      eq(projectsTable.id, input.project_id)
    );

    return;
  }
}

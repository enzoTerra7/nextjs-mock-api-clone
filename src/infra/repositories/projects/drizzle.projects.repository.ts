import "server-only";
import { db } from "../../database/drizzle";
import { IProjectsRepository } from "@/src/application/repositories/projects.repository.interface";
import { Project } from "@/src/domain/entities/models/project.entities";
import { projectsTable } from "../../database/schemas";
import { IProjectInputCreate } from "@/src/application/validators/project/project.input.create";

export class DrizzleProjectsRepository implements IProjectsRepository {
  constructor() {}

  async getAllProjects(user_id: string): Promise<Project[]> {
    const projects = await db.query.projectsTable.findMany({
      where: (project, { eq }) => eq(project.user_id, user_id),
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
    const [project] = await db
      .insert(projectsTable)
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
}

import "server-only";
import { db } from "../../database/knex/knex";
import { IProjectsRepository } from "@/src/application/repositories/projects.repository.interface";
import { IProjectInputCreate } from "@/src/application/validators/project/project.input.create";
import { Project } from "@/src/domain/entities/models/project.entities";
import { generateKSUID } from "@/shared/generate_id";

export class KnexProjectsRepository implements IProjectsRepository {
  constructor() {}

  async createProject(input: IProjectInputCreate): Promise<Project> {
    const project = await db("projects")
      .insert({
        name: input.name,
        user_id: input.user_id,
        id: generateKSUID(),
      })
      .returning("*");

    const projectDto = Project.create({
      id: project.id,
      name: project.name,
      user_id: project.user_id,
    });

    return projectDto;
  }

  async getAllProjects(user_id: string): Promise<Project[]> {
    const projects = await db("projects").select("*").where("user_id", user_id);

    const projectsDto = projects.map((project) =>
      Project.create({
        id: project.id,
        name: project.name,
        user_id: project.user_id,
      })
    );

    return projectsDto;
  }
}

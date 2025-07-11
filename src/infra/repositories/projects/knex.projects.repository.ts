import "server-only";
import { knexDb } from "../../database/knex/knex";
import { IProjectsRepository } from "@/src/application/repositories/projects.repository.interface";
import { IProjectInputCreate } from "@/src/application/validators/project/project.input.create";
import { Project } from "@/src/domain/entities/models/project.entities";
import { generateKSUID } from "@/shared/generate_id";
import { IProjectInputDelete } from "@/src/application/validators/project/project.input.delete";
import { NotFoundError } from "@/src/domain/entities/errors/payload";
import { Routes } from "@/src/domain/entities/models/routes.entities";

export class KnexProjectsRepository implements IProjectsRepository {
  constructor() {}

  async createProject(input: IProjectInputCreate): Promise<Project> {
    const [project] = await knexDb("projects")
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
    const projects = await knexDb("projects")
      .select("*")
      .where("user_id", user_id)
      .orderBy("created_at", "desc");

    const projectsDto = projects.map((project) =>
      Project.create({
        id: project.id,
        name: project.name,
        user_id: project.user_id,
      })
    );

    return projectsDto;
  }

  async deleteProject(input: IProjectInputDelete): Promise<void> {
    await knexDb("projects")
      .delete()
      .where("id", input.project_id)
      .andWhere("user_id", input.user_id);
    return;
  }

  async getProjectById(id: string): Promise<Omit<Project, "routes">> {
    const project = await knexDb("projects")
      .select("*")
      .where("id", id)
      .first();

    if (!project) {
      throw new NotFoundError("Project not exist");
    }

    return project;
  }

  async getProjectRoutes(id: string): Promise<Routes[]> {
    const project_routes = await knexDb("routes")
      .select("*")
      .orderBy("route_path", "asc")
      .where("project_id", id);

    return project_routes;
  }
}

import { generateKSUID } from "@/shared/generate_id";
import { ProjectsSchema } from "../../database/schemas";
import { IProjectsRepository } from "@/src/application/repositories/projects.repository.interface";
import { IProjectInputCreate } from "@/src/application/validators/project/project.input.create";
import { Project } from "@/src/domain/entities/models/project.entities";
import {
  BadRequestError,
  NotFoundError,
} from "@/src/domain/entities/errors/payload";
import { IProjectInputDelete } from "@/src/application/validators/project/project.input.delete";
import { Routes } from "@/src/domain/entities/models/routes.entities";

export class MockProjectsRepository implements IProjectsRepository {
  private _projects: ProjectsSchema[];

  constructor(user_id: string) {
    this._projects = [
      {
        id: "aFWlYv0hs7Y9sAXvu8WydPrHftM",
        name: "Project 1",
        user_id,
        created_at: new Date().toISOString(),
      },
      {
        id: "aFWlYmwmuKuCbejOpYrZrWV_GcU",
        name: "Project 2",
        user_id,
        created_at: new Date().toISOString(),
      },
      {
        id: "aFWlYnVYqANPg8zJsluWKMcii2U",
        name: "Project 3",
        user_id,
        created_at: new Date().toISOString(),
      },
      {
        id: "aFWlYuLjrLi8KT41AkBODLvsSc8",
        name: "Project 4",
        user_id,
        created_at: new Date().toISOString(),
      },
    ];
  }

  async getAllProjects(user_id: string): Promise<Project[]> {
    const projects = this._projects.filter(
      (project) => project.user_id === user_id
    );

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
    if (input.user_id !== "aE8aMAE3fCGzvxeSOtaN5UMaPCo") {
      throw new Error("Invalid user_id");
    }
    const project: ProjectsSchema = {
      id: generateKSUID(),
      name: input.name,
      user_id: input.user_id,
      created_at: new Date().toISOString(),
    };

    const projectDto = Project.create({
      id: project.id,
      name: project.name,
      user_id: project.user_id,
      routes: [],
    });

    return projectDto;
  }

  async deleteProject(input: IProjectInputDelete): Promise<void> {
    const index = this._projects.findIndex(
      (project) =>
        project.user_id === input.user_id && project.id === input.project_id
    );

    if (index < 0) {
      throw new BadRequestError("Project not found");
    }

    this._projects.slice(index, 1);

    return;
  }

  async getProjectById(id: string): Promise<Omit<Project, "routes">> {
    const project = this._projects.find((project) => project.id === id);

    if (!project) {
      throw new NotFoundError("Project not exist");
    }

    return project;
  }

  async getProjectRoutes(id: string): Promise<Routes[]> {
    const project = this._projects.find((project) => project.id === id);

    if (!project) {
      return [];
    }

    const routes: Routes[] = [
      {
        created_at: new Date().toISOString(),
        data_builder_types: generateKSUID(),
        id: generateKSUID(),
        project_id: id,
        route_path: generateKSUID(),
        route_type: "GET",
        schema: {},
      },
      {
        created_at: new Date().toISOString(),
        data_builder_types: generateKSUID(),
        id: generateKSUID(),
        project_id: id,
        route_path: generateKSUID(),
        route_type: "POST",
        schema: {},
      },
      {
        created_at: new Date().toISOString(),
        data_builder_types: generateKSUID(),
        id: generateKSUID(),
        project_id: id,
        route_path: generateKSUID(),
        route_type: "PUT",
        schema: {},
      },
      {
        created_at: new Date().toISOString(),
        data_builder_types: generateKSUID(),
        id: generateKSUID(),
        project_id: id,
        route_path: generateKSUID(),
        route_type: "PATCH",
        schema: {},
      },
      {
        created_at: new Date().toISOString(),
        data_builder_types: generateKSUID(),
        id: generateKSUID(),
        project_id: id,
        route_path: generateKSUID(),
        route_type: "DELETE",
        schema: {},
      },
    ];

    return routes;
  }
}

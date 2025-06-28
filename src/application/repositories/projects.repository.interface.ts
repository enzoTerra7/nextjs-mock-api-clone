import { Project } from "@/src/domain/entities/models/project.entities";
import { IProjectInputCreate } from "../validators/project/project.input.create";
import { IProjectInputDelete } from "../validators/project/project.input.delete";

export interface IProjectsRepository {
  getAllProjects(user_id: string): Promise<Project[]>;
  // getProjectById(id: string): Promise<Project | undefined>;
  createProject(input: IProjectInputCreate): Promise<Project>;
  deleteProject(input: IProjectInputDelete): Promise<void>;
}

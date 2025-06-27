import { Project } from "@/src/domain/entities/models/project.entities";
import {
  IProjectDelete,
  IProjectInputCreate,
} from "../validators/project/project.input.create";

export interface IProjectsRepository {
  getAllProjects(user_id: string): Promise<Project[]>;
  // getProjectById(id: string): Promise<Project | undefined>;
  createProject(input: IProjectInputCreate): Promise<Project>;
  deleteProject(input: IProjectDelete): Promise<void>;
}

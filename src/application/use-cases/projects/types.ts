import { Routes } from "@/src/domain/entities/models/routes.entities";

type Project = {
  id: string;
  name: string;
  user_id: string;
  routes: unknown[];
};

export type GetAllProjectsInput = {
  user_id: string;
};

export type GetAllProjectsOutput = Promise<Project[]>;

export type GetProjectByIdInput = {
  project_id: string;
};

export type GetProjectByIdOutput = Promise<Omit<Project, "routes">>;

export type CreateProjectInput = {
  name: string;
  user_id: string;
};

export type CreateProjectOutput = Promise<Project>;

export type DeleteProjectInput = {
  project_id: string;
  user_id: string;
};

export type GetProjectRoutesInput = {
  project_id: string;
};

export type GetProjectRoutesOutput = Promise<{
  [x: string]: Routes[];
}>;

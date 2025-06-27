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

export type CreateProjectInput = {
  name: string;
  user_id: string;
};

export type CreateProjectOutput = Promise<Project>;

export type DeleteProjectInput = {
  project_id: string;
  user_id: string;
};

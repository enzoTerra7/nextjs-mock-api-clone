import { GetProjectByIdInput, GetProjectByIdOutput } from "./types";
import { IProjectsRepository } from "../../repositories/projects.repository.interface";

export class GetProjectByIdUseCase {
  constructor(private projectsRepository: IProjectsRepository) {}

  async execute(input: GetProjectByIdInput): GetProjectByIdOutput {
    const project = await this.projectsRepository.getProjectById(
      input.project_id
    );

    return project;
  }
}

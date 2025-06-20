import { GetAllProjectsInput, GetAllProjectsOutput } from "./types";
import { IProjectsRepository } from "../../repositories/projects.repository.interface";

export class GetAllProjectsUseCase {
  constructor(private projectsRepository: IProjectsRepository) {}

  async execute(input: GetAllProjectsInput): GetAllProjectsOutput {
    const projects = await this.projectsRepository.getAllProjects(
      input.user_id
    );

    return projects;
  }
}

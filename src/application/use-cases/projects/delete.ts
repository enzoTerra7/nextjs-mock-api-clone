import { DeleteProjectInput } from "./types";
import { IProjectsRepository } from "../../repositories/projects.repository.interface";
import { BadRequestError } from "@/src/domain/entities/errors/payload";

export class DeleteProjectsUseCase {
  constructor(private projectsRepository: IProjectsRepository) {}

  async execute(input: DeleteProjectInput) {
    try {
      await this.projectsRepository.deleteProject({
        ...input,
      });

      return;
    } catch (e) {
      console.error("Something went wrong:", e);
      throw new BadRequestError("Invalid user_id or project_id");
    }
  }
}

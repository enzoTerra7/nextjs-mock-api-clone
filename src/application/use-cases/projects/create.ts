import { CreateProjectInput, CreateProjectOutput } from "./types";
import { IProjectsRepository } from "../../repositories/projects.repository.interface";
import { BadRequestError } from "@/src/domain/entities/errors/payload";

export class CreateProjectsUseCase {
  constructor(private projectsRepository: IProjectsRepository) {}

  async execute(input: CreateProjectInput): CreateProjectOutput {
    try {
      const { id, name, user_id, routes } =
        await this.projectsRepository.createProject({
          name: input.name,
          user_id: input.user_id,
        });

      return {
        id,
        name,
        routes,
        user_id,
      };
    } catch (e) {
      console.error("Something went wrong:", e);
      throw new BadRequestError("Invalid user_id");
    }
  }
}

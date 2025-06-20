import { IProjectsRepository } from "@/src/application/repositories/projects.repository.interface";
import { GetAllProjectsUseCase } from "@/src/application/use-cases/projects/get-all";

export function getAllProjectsUseCaseFactory(
  projectsRepository: IProjectsRepository
) {
  return new GetAllProjectsUseCase(projectsRepository);
}

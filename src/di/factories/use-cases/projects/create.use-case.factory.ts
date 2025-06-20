import { IProjectsRepository } from "@/src/application/repositories/projects.repository.interface";
import { CreateProjectsUseCase } from "@/src/application/use-cases/projects/create";

export function createProjectsUseCaseFactory(
  projectsRepository: IProjectsRepository
) {
  return new CreateProjectsUseCase(projectsRepository);
}

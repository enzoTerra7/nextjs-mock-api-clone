import { IProjectsRepository } from "@/src/application/repositories/projects.repository.interface";
import { DeleteProjectsUseCase } from "@/src/application/use-cases/projects/delete";

export function deleteProjectsUseCaseFactory(
  projectsRepository: IProjectsRepository
) {
  return new DeleteProjectsUseCase(projectsRepository);
}

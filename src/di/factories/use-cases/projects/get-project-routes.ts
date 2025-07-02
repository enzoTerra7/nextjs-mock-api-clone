import { IProjectsRepository } from "@/src/application/repositories/projects.repository.interface";
import { GetProjectRoutesUseCase } from "@/src/application/use-cases/projects/get-project-routes";

export function getProjectRoutesUseCaseFactory(
  projectsRepository: IProjectsRepository
) {
  return new GetProjectRoutesUseCase(projectsRepository);
}

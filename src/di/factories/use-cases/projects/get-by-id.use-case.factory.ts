import { IProjectsRepository } from "@/src/application/repositories/projects.repository.interface";
import { GetProjectByIdUseCase } from "@/src/application/use-cases/projects/get-id";

export function getProjectByIdUseCaseFactory(
  projectsRepository: IProjectsRepository
) {
  return new GetProjectByIdUseCase(projectsRepository);
}

import { Button } from "@/app/_components/ui/button";
import { PageTitle } from "@/app/_components/ui/page-title";
import { getAllProjects } from "./actions";
import { Suspense } from "react";
import { ProjectsList } from "./_components/projects.list";
import { ProjectsListPlaceholder } from "./_components/projects.list.placeholder";
import { ProjectModalCreation } from "./_components/project.modal.creation";

export default async function Projects() {
  const getProjects = getAllProjects();
  return (
    <>
      <PageTitle
        title="Project Pages"
        description="Manage all your projects here"
      >
        <ProjectModalCreation>
          <Button>Create Project</Button>
        </ProjectModalCreation>
      </PageTitle>
      <Suspense fallback={<ProjectsListPlaceholder />}>
        <ProjectsList getProjects={getProjects} />
      </Suspense>
    </>
  );
}

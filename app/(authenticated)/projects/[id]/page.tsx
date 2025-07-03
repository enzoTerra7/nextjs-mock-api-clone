import { PageProps } from "@/types";
import { getProjectId, getProjectRoutes } from "./action";
import { PageTitle } from "@/app/_components/ui/page-title";
import Link from "next/link";
import { buttonVariants } from "@/app/_components/ui/button";
import { Suspense } from "react";
import { ProjectRoutesContainer } from "./_components/projectId.routes.container";
import { PlusCircle } from "lucide-react";

export default async function ProjectIdPage({
  params,
}: PageProps<{
  id: string;
}>) {
  const { id } = await params;
  const project = await getProjectId(id);

  const getRoutes = getProjectRoutes(id);

  return (
    <>
      <PageTitle
        title={`Project - ${project.name}`}
        description="See all the details of your project"
      >
        <Link
          className={buttonVariants({
            variant: "outline",
          })}
          href="/projects"
        >
          Go back
        </Link>
        <Link
          className={buttonVariants({})}
          href={`/projects/${id}/create-route`}
        >
          <PlusCircle />
          Create Route
        </Link>
      </PageTitle>
      <Suspense>
        <ProjectRoutesContainer getRoutes={getRoutes} />
      </Suspense>
    </>
  );
}

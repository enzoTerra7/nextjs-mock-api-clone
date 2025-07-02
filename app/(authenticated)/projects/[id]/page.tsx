import { PageProps } from "@/types";
import { getProjectId } from "./action";
import { PageTitle } from "@/app/_components/ui/page-title";
import Link from "next/link";
import { buttonVariants } from "@/app/_components/ui/button";

export default async function ProjectIdPage({
  params,
}: PageProps<{
  id: string;
}>) {
  const { id } = await params;
  const project = await getProjectId(id);

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
          Voltar
        </Link>
      </PageTitle>
    </>
  );
}

import { Button } from "@/app/_components/ui/button";
import { PageTitle } from "@/app/_components/ui/page-title";

export default async function Projects() {
  return (
    <>
      <PageTitle title="Project Pages" description="Manage all your projects here">
        <Button>Create Project</Button>
      </PageTitle>
    </>
  );
}

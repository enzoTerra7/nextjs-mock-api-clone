import { Button } from "@/app/_components/ui/button";
import { ProjectModalCreation } from "./project.modal.creation";
import { PlusCircleIcon } from "lucide-react";

export function ProjectsListEmpty() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="w-full text-center text-sm font-semibold text-muted-foreground">
        You don&apos;t have any project yet
      </p>
      <ProjectModalCreation>
        <Button
          variant={"link"}
          className="text-sm font-semibold text-muted-foreground"
        >
          <PlusCircleIcon />
          Create one now
        </Button>
      </ProjectModalCreation>
    </div>
  );
}

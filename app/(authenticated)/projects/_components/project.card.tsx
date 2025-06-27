"use client";

import Image from "next/image";
import { ProjectModalDelete } from "./project.modal.delete";
import { Button } from "@/app/_components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProjectCard({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  return (
    <div className="flex flex-col border border-border rounded overflow-hidden h-full w-full">
      <Image
        src={"/projects_cover.svg"}
        alt="Projects Cover image"
        className="flex-1 w-full object-cover object-center"
        width={3000}
        height={2000}
      />
      <div className="p-4 border-t bg-accent transition-colors flex items-center justify-between gap-4 duration-300">
        <p className="text-base font-semibold">{name}</p>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              router.push(`/projects/${id}`);
            }}
            variant={"outline"}
            size="icon"
          >
            <Eye />
          </Button>
          <ProjectModalDelete project_id={id}>
            <Button
              variant={"outline"}
              size="icon"
              className="!text-destructive"
            >
              <Trash2 />
            </Button>
          </ProjectModalDelete>
        </div>
      </div>
    </div>
  );
}

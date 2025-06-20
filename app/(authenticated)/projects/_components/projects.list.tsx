"use client";

import { Project } from "@/src/domain/entities/models/project.entities";
import { use } from "react";
import { ProjectCard } from "./project.card";
import { ProjectsListEmpty } from "./projects.list.empty";

export function ProjectsList({
  getProjects,
}: {
  getProjects: Promise<Project[]>;
}) {
  const projects = use(getProjects);

  console.log("result of projects:", projects);

  if (projects.length === 0) {
    return <ProjectsListEmpty />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {projects.map((project) => (
          <ProjectCard
            id={project.id}
            name={project.name}
            key={`project-${project.id}`}
          />
        ))}
      </div>
    </>
  );
}

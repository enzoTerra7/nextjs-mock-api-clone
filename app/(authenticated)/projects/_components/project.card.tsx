"use client";

import Image from "next/image";
import Link from "next/link";

export function ProjectCard({ id, name }: { id: string; name: string }) {
  return (
    <Link
      href={`/projects/${id}`}
      className="flex flex-col border group border-border rounded overflow-hidden h-full w-full"
    >
      <Image
        src={"/projects_cover.svg"}
        alt="Projects Cover image"
        className="flex-1 w-full object-cover object-center"
        width={3000}
        height={2000}
      />
      <div className="p-4 border-t bg-accent group-hover:bg-primary/15 transition-colors duration-300">
        <p className="text-center text-base font-semibold">{name}</p>
      </div>
    </Link>
  );
}

"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import { Button, buttonVariants } from "@/app/_components/ui/button";
import { cn } from "@/app/_lib/utils";
import { Routes } from "@/src/domain/entities/models/routes.entities";
import { Eye, Trash } from "lucide-react";
import { use } from "react";
import { ProjectIdRouteModalDelete } from "./projectId.routes.delete";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { toast } from "sonner";

const routesTypeColor = {
  GET: "bg-emerald-100 dark:bg-emerald-900",
  PUT: "bg-amber-100 dark:bg-amber-900",
  POST: "bg-sky-100 dark:bg-sky-900",
  PATCH: "bg-zinc-100 dark:bg-zinc-900",
  DELETE: "bg-rose-100 dark:bg-rose-900",
};

export function ProjectRoutesContainer({
  getRoutes,
}: {
  getRoutes: Promise<{
    [x: string]: Routes[];
  }>;
}) {
  const routes = use(getRoutes);
  return (
    <section className="flex flex-col gap-4 p-2">
      <Accordion className="space-y-4" type="single">
        {Object.entries(routes).map(([route_type, routes]) => (
          <ProjectRoutes
            route_type={route_type}
            routes={routes}
            key={route_type}
          />
        ))}
      </Accordion>
    </section>
  );
}

function ProjectRoutes({
  routes,
  route_type,
}: {
  routes: Routes[];
  route_type: string;
}) {
  function generateUrl(route: Routes) {
    const normalizeRoutePath = route.route_path.split("/");

    const urlPath =
      normalizeRoutePath[0].length > 1
        ? normalizeRoutePath[0]
        : normalizeRoutePath[1];
    const path = `/api/${route.project_id}/${route.id}/${urlPath}`;

    navigator.clipboard.writeText(path);

    toast.success("Successfully copied url");
  }
  return (
    <>
      <AccordionItem
        className={cn(
          "border p-2 rounded-md",
          routesTypeColor[route_type as keyof typeof routesTypeColor]
        )}
        value={route_type}
      >
        <AccordionTrigger>{route_type}</AccordionTrigger>
        <AccordionContent className="border-t pt-2">
          {routes.map((route) => (
            <div
              className={cn(
                "flex items-center border-b p-2 border-accent/95 last:border-none justify-between w-full gap-4 rounded-md"
              )}
              key={route.id}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    onClick={() => generateUrl(route)}
                    className="p-1.5 w-full text-start rounded-md hover:bg-card/45"
                  >
                    <p className="text-lg font-medium">{route.route_path}</p>
                  </TooltipTrigger>
                  <TooltipContent>
                    Click to copy the url from this route
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex items-center gap-2">
                <Link
                  href={`/projects/${route.project_id}/edit/${route.id}`}
                  className={buttonVariants({
                    variant: "outline",
                    size: "icon",
                  })}
                >
                  <Eye />
                </Link>
                <ProjectIdRouteModalDelete
                  project_id={route.project_id}
                  route_id={route.id}
                >
                  <Button variant={"outline"} size={"icon"}>
                    <Trash />
                  </Button>
                </ProjectIdRouteModalDelete>
              </div>
            </div>
          ))}
          {routes.length === 0 && (
            <p className="w-full text-center font-semibold">
              No one {route_type} route founded
            </p>
          )}
        </AccordionContent>
      </AccordionItem>
    </>
  );
}

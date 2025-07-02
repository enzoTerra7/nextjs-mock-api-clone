"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/app/_lib/utils";
import { Routes } from "@/src/domain/entities/models/routes.entities";
import { Eye, Trash } from "lucide-react";
import { use } from "react";

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
                "flex items-center justify-between w-full px-2 py-3.5 hover:bg-card/45 rounded-md"
              )}
              key={route.id}
            >
              <p className="text-lg font-medium">{route.route_path}</p>
              <div className="flex items-center gap-2">
                <Button variant={"outline"} size={"icon"}>
                  <Eye />
                </Button>
                <Button variant={"outline"} size={"icon"}>
                  <Trash />
                </Button>
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

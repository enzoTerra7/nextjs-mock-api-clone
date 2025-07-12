import { buttonVariants } from "@/app/_components/ui/button";
import { PageTitle } from "@/app/_components/ui/page-title";
import { PageProps } from "@/types";
import Link from "next/link";
import { Suspense } from "react";
import { EditRouteForm } from "./_components/edit-route.form";
import { EditRouteFormLoader } from "./_components/edit-route.loader-form";
import { getAllBuildersType, getBuildersByType, getRoute } from "./action";

export default async function EditRoutePage({
  params,
}: PageProps<{
  id: string;
  routeId: string;
}>) {
  const { id, routeId } = await params;
  const router = await getRoute(routeId);
  const buildersTypePromise = getAllBuildersType();
  const fakerBuilders = getBuildersByType("FAKER");
  return (
    <>
      <PageTitle
        title="Editing route"
        description="Here you'll edit a route for your project"
      >
        <Link
          className={buttonVariants({
            variant: "outline",
          })}
          href={`/projects/${id}`}
        >
          Go back
        </Link>
      </PageTitle>
      <Suspense fallback={<EditRouteFormLoader />}>
        <EditRouteForm
          defaultRoute={router}
          projectId={id}
          routeId={routeId}
          getFakerBuilders={fakerBuilders}
          buildersTypePromise={buildersTypePromise}
        />
      </Suspense>
    </>
  );
}

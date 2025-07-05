import { buttonVariants } from "@/app/_components/ui/button";
import { PageTitle } from "@/app/_components/ui/page-title";
import { PageProps } from "@/types";
import Link from "next/link";
import { Suspense } from "react";
import { CreateRouteForm } from "./_components/create-route.form";

export default async function CreateRoutePage({
  params,
}: PageProps<{
  id: string;
}>) {
  const { id } = await params;
  return (
    <>
      <PageTitle
        title="Creating new route"
        description="Here you'll create a route for your project"
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
      <Suspense>
        <CreateRouteForm />
      </Suspense>
    </>
  );
}


"use client";
import { buttonVariants } from "@/app/_components/ui/button";
import { PageTitle } from "@/app/_components/ui/page-title";
import { PageProps } from "@/types";
import Link from "next/link";
import { use } from "react";

export default function CreateRoutePage({
  params,
}: PageProps<{
  id: string;
}>) {
  const { id } = use(params);
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
    </>
  );
}

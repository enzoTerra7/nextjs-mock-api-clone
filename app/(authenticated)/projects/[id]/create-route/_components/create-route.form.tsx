"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRouteInitialState, createRouteSchema } from "../definitions";
import { Form } from "@/app/_components/ui/form";
import { CreateRouteMainInformation } from "./create-route.main-information";
import { DataBuilderType } from "@/src/domain/entities/models/data-builder-type.entities";
import dynamic from "next/dynamic";

const CreateRouteFakerSchemaBuilder = dynamic(
  () => import("./create-route.faker-schema"),
  {
    ssr: false,
  }
);

const builderComponent = {
  FAKER: <CreateRouteFakerSchemaBuilder />,
};

export function CreateRouteForm({
  buildersTypePromise,
}: {
  buildersTypePromise: Promise<DataBuilderType[]>;
}) {
  const form = useForm({
    resolver: zodResolver(createRouteSchema),
    defaultValues: createRouteInitialState,
  });

  const builderType = form.watch("data_builder_id");
  return (
    <>
      <Form {...form}>
        <form className="w-full space-y-4">
          <CreateRouteMainInformation
            buildersTypePromise={buildersTypePromise}
          />
        </form>

        {builderComponent[builderType as keyof typeof builderComponent]}
      </Form>
    </>
  );
}

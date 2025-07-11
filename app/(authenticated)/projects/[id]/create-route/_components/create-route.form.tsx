"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { aiSchemaDefault, createRouteSchema } from "../definitions";
import { Form } from "@/app/_components/ui/form";
import { CreateRouteMainInformation } from "./create-route.main-information";
import { DataBuilderType } from "@/src/domain/entities/models/data-builder-type.entities";
import dynamic from "next/dynamic";
import { DataBuilder } from "@/src/domain/entities/models/data-builder.entities";
import { Suspense } from "react";
import { Button } from "@/app/_components/ui/button";
import { CreateRouterAiSchemaBuilder } from "./create-router.ai-schema";
import { useServerAction } from "zsa-react";
import { createRoute } from "../action";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const CreateRouteFakerSchemaBuilder = dynamic(
  () => import("./create-route.faker-schema"),
  {
    ssr: false,
  }
);

export function CreateRouteForm({
  buildersTypePromise,
  getFakerBuilders,
  projectId,
}: {
  buildersTypePromise: Promise<DataBuilderType[]>;
  getFakerBuilders: Promise<DataBuilder[]>;
  projectId: string;
}) {
  const builderComponent = {
    FAKER: (
      <CreateRouteFakerSchemaBuilder getFakerBuilders={getFakerBuilders} />
    ),
    AI: <CreateRouterAiSchemaBuilder />,
  };

  const form = useForm({
    resolver: zodResolver(createRouteSchema),
    defaultValues: {
      route_type: "",
      route_path: "",
    },
  });

  const { execute: executeCreateRoute, isPending: isCreatingRoute } =
    useServerAction(createRoute, {
      onSuccess() {
        toast.success("Create route successfully!");
        redirect(`/projects/${projectId}`);
      },
      onError(error) {
        toast.error(error.err.message);
      },
    });

  const builderType = form.watch("data_builder_id");

  function onFormReset() {
    form.resetField("route_path");
    form.resetField("route_type");

    if (builderType === "AI") {
      form.setValue("schema", aiSchemaDefault);
    }

    if (builderType === "FAKER") {
      form.setValue("schema", []);
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) =>
            executeCreateRoute({
              ...values,
              project_id: projectId,
            })
          )}
          onReset={onFormReset}
          className="w-full space-y-4"
        >
          <CreateRouteMainInformation
            buildersTypePromise={buildersTypePromise}
          />
          <Suspense fallback={<div>Carregando</div>}>
            {builderComponent[builderType as keyof typeof builderComponent]}
          </Suspense>
          {builderType && (
            <div className="flex flex-col items-center lg:flex-row lg:justify-end gap-4">
              <Button
                disabled={isCreatingRoute}
                variant={"outline"}
                type="reset"
              >
                Reset form
              </Button>
              <Button isLoading={isCreatingRoute} type="submit">
                Save
              </Button>
            </div>
          )}
        </form>
      </Form>
    </>
  );
}

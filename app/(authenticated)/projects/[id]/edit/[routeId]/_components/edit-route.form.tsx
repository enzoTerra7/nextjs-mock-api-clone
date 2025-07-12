"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { aiSchemaDefault, editRouteSchema } from "../definitions";
import { Form } from "@/app/_components/ui/form";
import { EditRouteMainInformation } from "./edit-route.main-information";
import { DataBuilderType } from "@/src/domain/entities/models/data-builder-type.entities";
import dynamic from "next/dynamic";
import { DataBuilder } from "@/src/domain/entities/models/data-builder.entities";
import { Suspense } from "react";
import { Button } from "@/app/_components/ui/button";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { editRoute } from "../action";

const EditRouteFakerSchemaBuilder = dynamic(
  () => import("./edit-route.faker-schema"),
  {
    ssr: false,
  }
);

const EditRouterAiSchemaBuilder = dynamic(
  () => import("./edit-router.ai-schema"),
  {
    ssr: false,
  }
);

export function EditRouteForm({
  buildersTypePromise,
  getFakerBuilders,
  projectId,
  routeId,
  defaultRoute,
}: {
  buildersTypePromise: Promise<DataBuilderType[]>;
  getFakerBuilders: Promise<DataBuilder[]>;
  projectId: string;
  routeId: string;
  defaultRoute: {
    id: string;
    route_type: string;
    schema:
      | string
      | {
          key: string;
          value: string;
        }[];
    project_id: string;
    data_builder_types: string;
    created_at: string;
    route_path: string;
  };
}) {
  const builderComponent = {
    FAKER: <EditRouteFakerSchemaBuilder getFakerBuilders={getFakerBuilders} />,
    AI: <EditRouterAiSchemaBuilder />,
  };

  const form = useForm({
    // @ts-expect-error zod could parse this right, but the type is correct
    resolver: zodResolver(editRouteSchema),
    defaultValues: {
      data_builder_id: defaultRoute.data_builder_types as "AI" | "FAKER",
      route_type: defaultRoute.route_type,
      route_path: defaultRoute.route_path,
      schema: defaultRoute.schema,
    },
  });

  const { execute: executeEditRoute, isPending: isCreatingRoute } =
    useServerAction(editRoute, {
      onSuccess() {
        toast.success("Edit route successfully!");
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
            executeEditRoute({
              ...values,
              project_id: projectId,
              route_id: routeId,
            })
          )}
          onReset={onFormReset}
          className="w-full space-y-4"
        >
          <EditRouteMainInformation buildersTypePromise={buildersTypePromise} />
          <Suspense fallback={<div>Carregando</div>}>
            {builderComponent[builderType as keyof typeof builderComponent]}
          </Suspense>
          {builderType && (
            <div className="flex flex-col items-center lg:flex-row lg:justify-end gap-4">
              <Button
                disabled={isCreatingRoute}
                variant={"outline"}
                onClick={() => form.reset()}
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

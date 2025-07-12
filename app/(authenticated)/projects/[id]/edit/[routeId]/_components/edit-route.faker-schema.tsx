"use client";

import { useFormContext } from "react-hook-form";
import { EditRouteSchemaFormType } from "../definitions";
import { PageTitle } from "@/app/_components/ui/page-title";
import { PropsWithChildren, use, useMemo } from "react";
import { Input } from "@/app/_components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import { Button } from "@/app/_components/ui/button";
import { Plus } from "lucide-react";
import { DataBuilder } from "@/src/domain/entities/models/data-builder.entities";
import { Combobox } from "@/app/_components/ui/combobox";

export default function EditRouteFakerSchemaBuilder({
  getFakerBuilders,
}: {
  getFakerBuilders: Promise<DataBuilder[]>;
}) {
  const form: EditRouteSchemaFormType = useFormContext();
  const builders = use(getFakerBuilders);

  const schema = form.watch("schema") as { key: string; value: string }[];

  function onUpdateKeyInput(value: string, index: number) {
    const workableItem = schema[index];
    workableItem.key = value;
    const newSchemaArray = [...schema];
    newSchemaArray[index] = workableItem;
    form.setValue("schema", newSchemaArray);
  }

  function onUpdateValueInput(value: string, index: number) {
    const workableItem = schema[index];
    workableItem.value = value;
    const newSchemaArray = [...schema];
    newSchemaArray[index] = workableItem;
    form.setValue("schema", newSchemaArray);
  }

  function onAddNewField() {
    const newSchemaArray = [...schema];
    newSchemaArray.push({
      key: "",
      value: "",
    });
    form.setValue("schema", newSchemaArray);
  }

  function onRemoveRow(index: number) {
    const newSchemaArray = [...schema];
    newSchemaArray.splice(index, 1);
    form.setValue("schema", newSchemaArray);
  }

  const buildersOptions = useMemo(
    () =>
      builders.map((builder) => ({
        label: builder.name,
        value: builder.name.trim(),
      })),
    [builders]
  );

  return (
    <>
      <PageTitle
        title="Let's define your schema"
        description="Here u'll set the object u want receive and how it'll be generated"
        className="border-none pb-0 pt-4"
      />
      <div className="w-full flex flex-col gap-4">
        <DataRow>
          <div className="col-span-2">
            <Input value={"id"} disabled readOnly />
          </div>
          <div className="col-span-2">
            <Input value={"generateKSUID()"} disabled readOnly />
          </div>
        </DataRow>
        {schema.map((_, index) => (
          <DataRow key={`faker-schema-row-${index}`}>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name={`schema`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Ex: name"
                        onChange={(e) =>
                          onUpdateKeyInput(e.target.value, index)
                        }
                        // @ts-expect-error this always will be rendered in the FAKER scenario
                        value={field.value[index].key}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="schema"
                render={({ field }) => (
                  <FormItem>
                    <Combobox
                      items={buildersOptions}
                      onChange={(value) => onUpdateValueInput(value, index)}
                      // @ts-expect-error this always will be rendered in the FAKER scenario
                      value={field.value[index].value}
                      placeholder="Select a builder"
                      searchPlaceholder="Search a builder"
                      emptyText="No builder found"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              onClick={() => onRemoveRow(index)}
              className="w-fit"
              variant={"destructive"}
            >
              Remove
            </Button>
          </DataRow>
        ))}
      </div>
      <Button size={"icon"} onClick={onAddNewField}>
        <Plus />
      </Button>
    </>
  );
}

function DataRow({ children }: PropsWithChildren) {
  return <div className="grid grid-cols-5 gap-x-2">{children}</div>;
}

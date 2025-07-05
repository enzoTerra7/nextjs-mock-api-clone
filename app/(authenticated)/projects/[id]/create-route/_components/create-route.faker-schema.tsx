"use client";

import { useFormContext } from "react-hook-form";
import { CreateRouteSchemaFormType } from "../definitions";
import { PageTitle } from "@/app/_components/ui/page-title";
import { PropsWithChildren, useEffect, useState } from "react";
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
import { getBuildersByType } from "../action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

export default function CreateRouteFakerSchemaBuilder() {
  const form: CreateRouteSchemaFormType = useFormContext();
  const [builders, setBuilders] = useState<DataBuilder[]>([]);

  const schema = form.watch("schema");

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

  useEffect(() => {
    async function getAllFakerBuilders() {
      const builders = await getBuildersByType("FAKER");
      setBuilders(builders);
    }

    getAllFakerBuilders();
  });

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
                    <Select
                      onValueChange={(value) =>
                        onUpdateValueInput(value, index)
                      }
                      defaultValue={field.value[index].key}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a HTTP method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {builders.map((builder) => (
                          <SelectItem key={builder.name} value={builder.name}>
                            {builder.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

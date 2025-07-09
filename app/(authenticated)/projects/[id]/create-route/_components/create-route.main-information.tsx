"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import { useFormContext } from "react-hook-form";
import { CreateRouteSchemaFormType } from "../definitions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Input } from "@/app/_components/ui/input";
import { use } from "react";
import { DataBuilderType } from "@/src/domain/entities/models/data-builder-type.entities";

export function CreateRouteMainInformation({
  buildersTypePromise,
}: {
  buildersTypePromise: Promise<DataBuilderType[]>;
}) {
  const form: CreateRouteSchemaFormType = useFormContext();
  const builderTypes = use(buildersTypePromise);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="route_type"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a HTTP method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PATCH">PATCH</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="route_path"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Your route path: /auth/sign-in"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="data_builder_id"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value) => {
                  if (value === "FAKER") {
                    form.setValue("schema", []);
                  }
                  if (value === "AI") {
                    form.setValue("schema", "");
                  }
                  field.onChange(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select the builder method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {builderTypes.map((builderType) => (
                    <SelectItem key={builderType.name} value={builderType.name}>
                      {builderType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}

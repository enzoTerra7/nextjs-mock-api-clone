"use client";

import { PageTitle } from "@/app/_components/ui/page-title";
import { useFormContext } from "react-hook-form";
import { aiSchemaDefault, CreateRouteSchemaFormType } from "../definitions";
import { Button } from "@/app/_components/ui/button";
import { toast } from "sonner";
import TypeScriptEditor from "@/app/_components/ui/typescript-editor";
import { FormField, FormItem, FormMessage } from "@/app/_components/ui/form";

export function CreateRouterAiSchemaBuilder() {
  const form: CreateRouteSchemaFormType = useFormContext();

  const schema = form.watch("schema") as string;

  function onResetCode() {
    form.setValue("schema", aiSchemaDefault);
  }

  async function onCopyCode() {
    try {
      await navigator.clipboard.writeText(schema);
      toast.success("Code successfully copied");
    } catch {
      toast.error("Something went wrong", {
        description: "Try copy the code again",
      });
    }
  }

  return (
    <>
      <PageTitle
        title="Let's define your schema"
        description="Here u'll set the type u want receive"
        className="border-none pb-0 pt-4"
      >
        <Button variant={"outline"} onClick={onResetCode}>
          Reset schema
        </Button>
        <Button variant={"outline"} onClick={onCopyCode}>
          Copy code
        </Button>
      </PageTitle>
      <div className="bg-destructive/25 border border-destructive rounded-md text-destructive p-4 text-center">
        <p>
          Please write the name of the type you expect to receive as{" "}
          <strong>&apos;Response&apos;</strong>
        </p>
      </div>
      <FormField
        control={form.control}
        name="schema"
        render={({ field }) => (
          <FormItem>
            <TypeScriptEditor
              code={field.value as string}
              setCode={field.onChange}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

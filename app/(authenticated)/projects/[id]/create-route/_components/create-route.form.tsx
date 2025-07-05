"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRouteInitialState, createRouteSchema } from "../definitions";
import { Form } from "@/app/_components/ui/form";
import { CreateRouteMainInformation } from "./create-route.main-information";

export function CreateRouteForm() {
  const form = useForm({
    resolver: zodResolver(createRouteSchema),
    defaultValues: createRouteInitialState,
  });
  return (
    <>
      <Form {...form}>
        <form className="w-full space-y-4">
          <CreateRouteMainInformation />
        </form>
      </Form>
    </>
  );
}

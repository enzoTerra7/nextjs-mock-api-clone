"use client";

import { Button, buttonVariants } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Separator } from "@/app/_components/ui/separator";
import { PropsWithChildren, useState } from "react";
import { useServerAction } from "zsa-react";
import { createProjectAction } from "../actions";
import { toast } from "sonner";

export function ProjectModalCreation({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  const { execute, isPending } = useServerAction(createProjectAction, {
    onSuccess() {
      setIsOpen(false);
      toast.success("Successfully created project");
    },
    onError(error) {
      toast.error(error.err.message);
    },
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            This project will be added to your project list
          </DialogDescription>
        </DialogHeader>
        <form
          action={(form) => {
            execute({
              name: form.get("project_name") as string,
            });
          }}
          className="w-full flex flex-col gap-4"
        >
          <Input
            type="text"
            name="project_name"
            placeholder="Type the project name..."
            required
            disabled={isPending}
          />
          <Separator />
          <DialogFooter>
            <DialogClose
              disabled={isPending}
              className={buttonVariants({
                variant: "outline",
              })}
            >
              Cancel
            </DialogClose>
            <Button type="submit" isLoading={isPending}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

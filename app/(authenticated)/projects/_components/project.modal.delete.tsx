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
import { PropsWithChildren, useState } from "react";
import { useServerAction } from "zsa-react";
import { deleteProjectAction } from "../actions";
import { toast } from "sonner";

export function ProjectModalDelete({
  children,
  project_id,
}: PropsWithChildren & {
  project_id: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { execute, isPending } = useServerAction(deleteProjectAction, {
    onSuccess() {
      setIsOpen(false);
      toast.success("Successfully deleted project");
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
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            This project will be deleted forever for your project list
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose
            disabled={isPending}
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Cancel
          </DialogClose>
          <Button
            isLoading={isPending}
            onClick={() =>
              execute({
                project_id,
              })
            }
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

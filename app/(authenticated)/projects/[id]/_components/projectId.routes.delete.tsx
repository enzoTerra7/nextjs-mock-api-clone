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
import { toast } from "sonner";
import { deleteProjectRoute } from "../action";

export function ProjectIdRouteModalDelete({
  children,
  project_id,
  route_id,
}: PropsWithChildren & {
  project_id: string;
  route_id: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { execute, isPending } = useServerAction(deleteProjectRoute, {
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
          <DialogTitle>Delete Route</DialogTitle>
          <DialogDescription>
            This route will be deleted forever from your project
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
                route_id,
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

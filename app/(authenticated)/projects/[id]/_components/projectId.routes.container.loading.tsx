import { Card } from "@/app/_components/ui/card";
import { Skeleton } from "@/app/_components/ui/skeleton";

export function ProjectRoutesContainerLoading() {
  return (
    <>
      <Card className="w-full flex items-center justify-between gap-4">
        <Skeleton className="w-36 h-4" />
        <Skeleton className="size-4" />
      </Card>
      <Card className="w-full flex items-center justify-between gap-4">
        <Skeleton className="w-36 h-4" />
        <Skeleton className="size-4" />
      </Card>
      <Card className="w-full flex items-center justify-between gap-4">
        <Skeleton className="w-36 h-4" />
        <Skeleton className="size-4" />
      </Card>
      <Card className="w-full flex items-center justify-between gap-4">
        <Skeleton className="w-36 h-4" />
        <Skeleton className="size-4" />
      </Card>
      <Card className="w-full flex items-center justify-between gap-4">
        <Skeleton className="w-36 h-4" />
        <Skeleton className="size-4" />
      </Card>
    </>
  );
}

import { Card } from "@/app/_components/ui/card";
import { Skeleton } from "@/app/_components/ui/skeleton";

export default function ProjectIdLoading() {
  return (
    <>
      <div className="flex lg:flex-row lg:items-center lg:justify-between flex-col items-start gap-4 border-b border-border pb-4">
        <div className="flex flex-col gap-2 items-start">
          <Skeleton className="w-28 h-5" />
          <Skeleton className="w-40 h-3" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>
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

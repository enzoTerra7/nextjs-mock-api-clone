import { Skeleton } from "@/app/_components/ui/skeleton";

export function CreateRouteFormLoader() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
      </div>
    </>
  );
}

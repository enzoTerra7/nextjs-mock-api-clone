import { Skeleton } from "@/app/_components/ui/skeleton";

export function ProjectsListPlaceholder() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[350px]">
        <Skeleton className="w-full h-full rounded" />
        <Skeleton className="w-full h-full rounded" />
        <Skeleton className="w-full h-full rounded" />
        <Skeleton className="w-full h-full rounded" />
      </div>
    </>
  );
}

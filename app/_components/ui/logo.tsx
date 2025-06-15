import { cn } from "@/app/_lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <h2
      className={cn(
        "text-2xl font-medium lg:text-4xl text-secondary-foreground",
        className
      )}
    >
      Mock
      <strong className="text-primary font-bold tracking-tight">Clone</strong>
    </h2>
  );
}

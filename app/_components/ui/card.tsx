import { cn } from "@/app/_lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("bg-card text-card-foreground p-4 rounded-md border", className)}
      {...props}
    />
  );
}

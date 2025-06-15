import { cn } from "@/app/_lib/utils";

export function ContentWrapper({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("px-4 xl:px-0 w-full max-w-7xl mx-auto", className)}
      {...props}
    />
  );
}

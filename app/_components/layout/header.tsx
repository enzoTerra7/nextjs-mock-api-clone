import { Suspense } from "react";
import { ContentWrapper } from "../ui/content-wrapper";
import { Logo } from "../ui/logo";
import { UserHeaderItem } from "./user";
import { Skeleton } from "../ui/skeleton";

export function Header() {
  return (
    <header className="w-full flex items-center fixed backdrop-blur-2xl bg-sidebar/85 border-b border-sidebar-border h-20">
      <ContentWrapper className="flex items-center justify-between gap-4">
        <Logo />
        <Suspense fallback={<Skeleton className="h-14 w-20" />}>
          <UserHeaderItem />
        </Suspense>
      </ContentWrapper>
    </header>
  );
}

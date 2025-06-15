import { ContentWrapper } from "../ui/content-wrapper";
import { Logo } from "../ui/logo";
import { User2Icon } from "lucide-react";

export function Header() {
  return (
    <header className="w-full flex items-center fixed backdrop-blur-2xl bg-sidebar/85 border-b border-sidebar-border h-20">
      <ContentWrapper className="flex items-center justify-between gap-4">
        <Logo />
        <User2Icon />
      </ContentWrapper>
    </header>
  );
}

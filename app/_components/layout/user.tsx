import { verifySession } from "@/app/_lib/auth/dal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User2Icon, LogOut } from "lucide-react";
import { SignoutItem } from "./sign-out.item";

export async function UserHeaderItem() {
  const session = await verifySession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group p-2 rounded hover:bg-muted flex items-center gap-4 transition-colors duration-300 outline-0">
        <div className="size-6 rounded shrink-0 flex items-center justify-center bg-muted group-hover:bg-muted-foreground/55 group-hover:text-muted transition-colors duration-300">
          <User2Icon className="size-4" />
        </div>
        <div className="flex flex-col items-start w-32 flex-1">
          <p className="text-base">{session.username}</p>
          <p className="text-xs font-medium text-muted-foreground truncate w-full">
            {session.email}
          </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 mt-2.5">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <SignoutItem>
            <DropdownMenuItem variant="destructive">
              <LogOut />
              Sign out
            </DropdownMenuItem>
          </SignoutItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

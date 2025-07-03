"use client";

import { signOut } from "@/app/_lib/auth/dal";
import { PropsWithChildren } from "react";

export function SignoutItem({ children }: PropsWithChildren) {
  return <div onClick={signOut}>{children}</div>;
}

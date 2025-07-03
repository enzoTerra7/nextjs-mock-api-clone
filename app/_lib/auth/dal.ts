"use server";
import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";
import { decrypt } from "./session";

export const verifySession = cache(async () => {
  const cookie = await getSession();
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/sign-in");
  }

  return {
    ...session,
    isAuth: true,
  };
});

export const getSession = cache(async () => {
  const session = (await cookies()).get("session")?.value;

  if (!session) {
    return undefined;
  }

  return session;
});

export const signOut = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("session");
  redirect("/");
};

import { redirect } from "next/navigation";
import { verifySession } from "./_lib/auth/dal";

export default async function Home() {
  await verifySession();

  redirect("/projects");
}

"use client";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import Link from "next/link";
import { useServerAction } from "zsa-react";
import { signInAction } from "./action";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function SignIn() {
  const { execute, isPending } = useServerAction(signInAction, {
    onSuccess() {
      toast.success("Sign in successfully!");
      redirect("/projects");
    },
    onError(error) {
      toast.error(error.err.message);
    },
  });
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Sign in</h1>
      <form
        action={(form) => {
          execute({
            email: form.get("email") as string,
            password: form.get("password") as string,
          });
        }}
        className="space-y-4"
      >
        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          required
          disabled={isPending}
        />
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          required
          disabled={isPending}
        />
        <div className="flex justify-between text-sm">
          <Link
            href="/forgot-password"
            className="text-primary hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
        <Button isLoading={isPending} type="submit" className="w-full">
          Sign in
        </Button>
      </form>
      <p className="text-sm text-center mt-6">
        Does&apos;nt have an account?{" "}
        <Link href="/sign-up" className="text-primary hover:underline">
          Sign up now
        </Link>
      </p>
    </div>
  );
}

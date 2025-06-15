"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import Link from "next/link";
import { useServerAction } from "zsa-react";
import { signUpAction } from "./action";

export default function SignUp() {
  const { execute } = useServerAction(signUpAction, {
    onSuccess(data) {
      alert("success");
      console.log("user", data);
    },
    onError(error) {
      alert("error");
      console.log(error);
    },
  });
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Create an account</h1>
      <form
        action={(form) => {
          execute({
            email: form.get("email") as string,
            password: form.get("password") as string,
            confirm_password: form.get("confirm_password") as string,
            username: form.get("username") as string,
          });
        }}
        className="space-y-4"
      >
        <Input type="email" name="email" placeholder="Email" required />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Input
          type="password"
          name="confirm_password"
          placeholder="Confirm your password"
          required
        />
        <Input type="text" name="username" placeholder="Username" required />

        <div className="flex flex-col w-full justify-center items-center gap-2 space-y-0">
          <Button className="w-full">Sign up</Button>
          <p className="text-xs text-center text-muted-foreground">
            On continue, you agree with our&apos;s terms.
          </p>
        </div>
      </form>
      <p className="text-sm text-center mt-6">
        Have an account?{" "}
        <Link href="/sign-in" className="text-primary hover:underline">
          Sign in now
        </Link>
      </p>
    </div>
  );
}

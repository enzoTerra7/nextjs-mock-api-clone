import { Logo } from "../_components/ui/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex items-center justify-center bg-muted p-8">
        <div className="max-w-md text-center">
          <Logo />
          <h2 className="text-2xl font-bold mt-6">Welcome back!</h2>
          <p className="text-muted-foreground mt-2">
            Access your account and use ours services right now!
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">{children}</div>
      </div>
    </div>
  );
}

import { Header } from "../_components/layout/header";
import { ContentWrapper } from "../_components/ui/content-wrapper";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh">
      <Header />
      <main className="pt-28">
        <ContentWrapper className="space-y-4">{children}</ContentWrapper>
      </main>
    </div>
  );
}

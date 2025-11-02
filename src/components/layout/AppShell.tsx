import type { ReactNode } from "react";

import { Header } from "./Header";
import { PageContainer } from "./PageContainer";

type AppShellProps = {
  readonly children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen w-full bg-slate-100 text-slate-900">
      <Header />
      <PageContainer>{children}</PageContainer>
    </div>
  );
}

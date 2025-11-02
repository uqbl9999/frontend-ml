import type { ReactNode } from "react";

import { PageContainer } from "./PageContainer";
import { Footer } from "./Footer";
import { Header } from "./Header";

type AppShellProps = {
  readonly children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen w-full bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(147,51,234,0.15),_transparent_45%)] dark:bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.25),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(14,116,144,0.18),_transparent_45%)]" />
      <Header />
      <PageContainer>{children}</PageContainer>
      <Footer />
    </div>
  );
}

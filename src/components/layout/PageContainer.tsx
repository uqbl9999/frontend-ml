import type { ReactNode } from "react";

type PageContainerProps = {
  readonly children: ReactNode;
};

export function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
  );
}

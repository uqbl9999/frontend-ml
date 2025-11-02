import type { ReactNode } from "react";

type UIProviderProps = {
  readonly children: ReactNode;
};

/**
 * UIProvider centraliza configuraciones globales de interfaz, como temas,
 * tipografías o proveedores de estado (por ejemplo, React Query).
 */
export function UIProvider({ children }: UIProviderProps) {
  return <>{children}</>;
}

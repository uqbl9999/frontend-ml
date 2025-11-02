import {
  ComponentPropsWithoutRef,
  Context,
  createContext,
  forwardRef,
  useContext,
} from "react";

import { cn } from "../../lib/utils";

type TabsContextValue = {
  readonly value: string;
  readonly onValueChange?: (value: string) => void;
};

const TabsContext: Context<TabsContextValue | null> = createContext<TabsContextValue | null>(null);

type TabsProps = ComponentPropsWithoutRef<"div"> & {
  readonly value: string;
  readonly onValueChange?: (value: string) => void;
};

export function Tabs({
  className,
  value,
  onValueChange,
  ...props
}: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={cn("flex flex-col gap-4", className)} {...props} />
    </TabsContext.Provider>
  );
}

function useTabsContext(component: string) {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error(`<${component}> must be used within <Tabs>`);
  }

  return context;
}

export const TabsList = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex w-full flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900",
          className,
        )}
        {...props}
      />
    );
  },
);

TabsList.displayName = "TabsList";

type TabsTriggerProps = ComponentPropsWithoutRef<"button"> & {
  readonly value: string;
};

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const context = useTabsContext("TabsTrigger");
    const isActive = context.value === value;

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => context.onValueChange?.(value)}
        className={cn(
          "flex flex-1 min-w-[180px] flex-col gap-1 rounded-xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
          isActive
            ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-inner dark:border-indigo-400 dark:bg-indigo-500/10 dark:text-indigo-200"
            : "border-transparent bg-transparent text-slate-600 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-600 dark:text-slate-300 dark:hover:border-indigo-500/40 dark:hover:text-indigo-200",
          className,
        )}
        aria-pressed={isActive}
        {...props}
      />
    );
  },
);

TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div"> & { readonly value: string }
>(({ className, value, ...props }, ref) => {
  const context = useTabsContext("TabsContent");

  if (context.value !== value) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border border-transparent bg-transparent",
        className,
      )}
      {...props}
    />
  );
});

TabsContent.displayName = "TabsContent";

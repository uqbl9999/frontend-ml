import { forwardRef, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../lib/utils";

type SwitchProps = ComponentPropsWithoutRef<"button"> & {
  readonly checked?: boolean;
  readonly onCheckedChange?: (checked: boolean) => void;
};

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked: controlledChecked, onCheckedChange, ...props }, ref) => {
    const [uncontrolledChecked, setUncontrolledChecked] = useState(false);
    const checked =
      typeof controlledChecked === "boolean"
        ? controlledChecked
        : uncontrolledChecked;

    const handleClick = () => {
      const next = !checked;

      if (typeof controlledChecked !== "boolean") {
        setUncontrolledChecked(next);
      }

      onCheckedChange?.(next);
    };

    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        ref={ref}
        onClick={handleClick}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
          checked ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700",
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-5" : "translate-x-0.5",
          )}
        />
      </button>
    );
  },
);

Switch.displayName = "Switch";

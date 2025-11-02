import { Moon, Sun } from "lucide-react";

import { Switch } from "../ui/switch";
import { useTheme } from "../../providers/theme-context";
import { Button } from "../ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
      <Sun className="h-4 w-4 text-amber-500 dark:text-slate-500" />
      <span>Modo</span>
      <Switch checked={isDark} onCheckedChange={toggleTheme} />
      <Button
        variant="ghost"
        size="icon"
        aria-label="Cambiar tema"
        onClick={toggleTheme}
        className="text-slate-500 hover:text-indigo-500 dark:text-slate-400 dark:hover:text-indigo-300"
      >
        <Moon className="h-4 w-4" />
      </Button>
    </div>
  );
}

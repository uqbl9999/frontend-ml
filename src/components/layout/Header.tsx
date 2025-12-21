import { Sparkles, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import { ThemeToggle } from "../navigation/ThemeToggle";
import { Button } from "../ui/button";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white shadow-lg dark:border-slate-800">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 shadow-inner backdrop-blur transition-all hover:bg-white/20 hover:scale-105 dark:border-white/10 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 cursor-pointer"
        >
          <Sparkles className="h-5 w-5 text-indigo-200" />
          <div className="flex flex-col">

            <span className="text-xs font-medium text-indigo-50">
              MedAI Perú
            </span>
          </div>
        </button>
        <div className="flex items-center gap-3">
          {!isHomePage && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="border-white/20 bg-white/10 text-white hover:bg-white/20 dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20"
            >
              <Home className="mr-2 h-4 w-4" />
              Inicio
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

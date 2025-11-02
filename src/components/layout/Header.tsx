import { BrainCircuit } from "lucide-react";

import { ThemeToggle } from "../navigation/ThemeToggle";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white shadow-lg dark:border-slate-800">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 shadow-inner backdrop-blur dark:border-white/10 dark:bg-indigo-500/10">
            <BrainCircuit className="h-6 w-6 text-indigo-200" />
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-[0.3em] text-indigo-100">
                Ministerio de Salud del Perú
              </span>
              <span className="text-sm font-medium text-indigo-50">
                Modelo Predictivo de Tamizajes
              </span>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Sistema de Predicción de Salud Mental
          </h1>
          <p className="max-w-2xl text-base text-indigo-100/90">
            Plataforma analítica para estimar la tasa de positividad en tamizajes
            de salud mental y orientar decisiones estratégicas de prevención.
          </p>
        </div>
      </div>
    </header>
  );
}

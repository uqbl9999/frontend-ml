import { Activity, BarChart3, LineChart, Sparkles } from "lucide-react";
import { useState } from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { MetricsPanel } from "../../features/model-metrics";
import { ExploratoryPanel } from "../../features/exploratory-analysis";
import { PredictionPanel } from "../../features/prediction";

const TABS = [
  {
    id: "prediction",
    label: "Predicción",
    description: "Configura los filtros y genera una predicción",
    icon: Activity,
  },
  {
    id: "exploratory",
    label: "Análisis Exploratorio",
    description: "Descubre tendencias relevantes en los datos históricos",
    icon: LineChart,
  },
  {
    id: "metrics",
    label: "Métricas del Modelo",
    description: "Evalúa el rendimiento del modelo predictivo",
    icon: BarChart3,
  },
] as const;

export function PredictionDashboard() {
  const [activeTab, setActiveTab] = useState<string>("prediction");

  return (
    <>
      <section className="relative mb-8 overflow-hidden rounded-3xl border border-indigo-200/60 bg-gradient-to-br from-indigo-700 via-indigo-600 to-sky-600 p-8 text-white shadow-lg dark:from-indigo-600 dark:via-indigo-500 dark:to-sky-500">
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.35),_transparent_60%)]" />
        </div>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex-1 min-w-[260px]">
            <Badge variant="secondary" className="bg-white/10 text-white">
              <Sparkles className="h-4 w-4" />
              Modelo Predictivo de Tamizajes
            </Badge>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Sistema de Predicción de Salud Mental
            </h1>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-white/90">
              Plataforma analítica para estimar la tasa de positividad en tamizajes de salud mental y orientar decisiones estratégicas de prevención.
            </p>
          </div>
        </div>
      </section>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="mb-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/90 backdrop-blur dark:bg-slate-900/90">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className={`group relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all cursor-pointer ${
                    isActive 
                      ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-950/30" 
                      : "border-transparent hover:border-indigo-200 hover:bg-indigo-50/50 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/20"
                  }`}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg transition-all ${
                    isActive 
                      ? "bg-indigo-600 text-white shadow-lg dark:bg-indigo-500" 
                      : "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400"
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className={`text-sm font-semibold transition-colors ${
                      isActive 
                        ? "text-indigo-700 dark:text-indigo-300" 
                        : "text-slate-700 dark:text-slate-300"
                    }`}>
                      {tab.label}
                    </span>
                    <span className={`mt-1 text-xs transition-colors ${
                      isActive 
                        ? "text-indigo-600 dark:text-indigo-400" 
                        : "text-slate-500 dark:text-slate-400"
                    }`}>
                      {tab.description}
                    </span>
                  </div>
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 h-1 w-1/2 -translate-x-1/2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

      <TabsContent value="prediction">
        <PredictionPanel />
      </TabsContent>

      <TabsContent value="exploratory">
        <ExploratoryPanel />
      </TabsContent>

      <TabsContent value="metrics">
        <MetricsPanel />
      </TabsContent>

    </Tabs>
    </>
  );
}

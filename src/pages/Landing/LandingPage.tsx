import { Activity, BarChart3, LineChart } from "lucide-react";
import { useState } from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
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

export function LandingPage() {
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]["id"]>("prediction");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        {TABS.map((tab) => {
          const Icon = tab.icon;

          return (
            <TabsTrigger key={tab.id} value={tab.id}>
              <span className="inline-flex items-center gap-3">
                <Icon className="h-5 w-5 text-indigo-500" />
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {tab.label}
                  </span>
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                    {tab.description}
                  </span>
                </span>
              </span>
            </TabsTrigger>
          );
        })}
      </TabsList>

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
  );
}

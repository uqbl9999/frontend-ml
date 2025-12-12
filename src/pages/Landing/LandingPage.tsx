import { Activity, BarChart3, LineChart, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

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
  {
    id: "tamizajes",
    label: "Rayos X",
    description: "Detección por rayos X y estado del modelo",
    icon: ImageIcon,
  },
] as const;

export function LandingPage() {
  const [activeTab, setActiveTab] = useState<string>("prediction");

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

      <TabsContent value="tamizajes">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center gap-3">
              <ImageIcon className="h-6 w-6 text-indigo-500" />
              <h3 className="text-base font-semibold">Análisis de imágenes</h3>
            </div>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
              Sube una radiografía torácica, visualiza el preview y ejecuta la
              predicción con loader y botones deshabilitados durante el proceso.
            </p>
            <Link
              to="/tamizajes-imagenes"
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Ir a Tamizajes
            </Link>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-indigo-500" />
              <h3 className="text-base font-semibold">Información del modelo</h3>
            </div>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
              Consulta clases, arquitectura y estadísticas del modelo de
              clasificación por imágenes.
            </p>
            <Link
              to="/tamizajes-imagenes/modelo-info"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-slate-200"
            >
              Ver información
            </Link>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

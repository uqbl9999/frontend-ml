import { AreaChart, BarChart3, TrendingUp } from "lucide-react";

import { Badge } from "../../../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { useExploratoryData } from "../hooks/useExploratoryData";

export function ExploratoryPanel() {
  const { insights } = useExploratoryData();

  return (
    <div className="space-y-6">
      <Card className="border-slate-200/80 bg-slate-50/60 shadow-lg dark:border-slate-800/60 dark:bg-slate-900/60">
        <CardHeader className="gap-3">
          <Badge variant="default" className="w-fit">
            <TrendingUp className="h-4 w-4" />
            Análisis Exploratorio
          </Badge>
          <CardTitle className="text-2xl">
            Descubre patrones clave en las series históricas
          </CardTitle>
          <CardDescription>
            Exploración preliminar de las métricas de positividad para detectar
            cambios de tendencia, alertas tempranas y segmentos con mayor
            variabilidad.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex items-center gap-3">
              <AreaChart className="h-5 w-5 text-indigo-500" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Evolución por departamento
              </p>
            </div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Inserta aquí un gráfico de líneas que contraste la evolución de la
              tasa por región con intervalos de confianza móviles.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-indigo-500" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Segmentación demográfica
              </p>
            </div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Representa comparativos por sexo y etapa de vida mediante barras
              apiladas para identificar los grupos con mayor incidencia.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900">
        <CardHeader className="pb-2">
          <Badge variant="secondary" className="w-fit">
            Indicadores resumidos
          </Badge>
          <CardDescription>
            Hallazgos destacados al último corte semanal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/40"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {insight.title}
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {insight.value}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {insight.change}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
        <Separator className="mt-2" />
        <CardContent className="pt-4 text-xs text-slate-500 dark:text-slate-400">
          En esta sección puedes integrar dashboards embebidos (ej. Superset,
          Metabase) o componentes de visualización de librerías como Recharts o
          ECharts.
        </CardContent>
      </Card>
    </div>
  );
}

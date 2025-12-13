import { Flame } from "lucide-react";

import { Badge } from "../../../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { DescriptiveStats } from "./DescriptiveStats";
import { DistributionBarChart } from "./DistributionBarChart";
import { HeatmapMatrix } from "./HeatmapMatrix";
import { useExploratoryData } from "../hooks/useExploratoryData";
import { LoadingSpinner } from "../../../components/tamizajes/LoadingSpinner";

export function ExploratoryPanel() {
  const {
    groupDistribution,
    groupTotals,
    typeHeatmap,
    deptHeatmap,
    stats,
    isLoading,
  } = useExploratoryData();

  return (
    <div className="space-y-6">
      {isLoading ? (
        <Card className="border-slate-200/80 bg-slate-50/60 shadow-lg dark:border-slate-800/60 dark:bg-slate-900/60">
          <CardHeader>
            <Badge variant="default" className="w-fit">
              <Flame className="h-4 w-4" />
              Cargando análisis exploratorio
            </Badge>
            <CardDescription>Obteniendo datos agregados desde la API</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <LoadingSpinner message="Cargando datos..." submessage="Por favor espera" />
          </CardContent>
        </Card>
      ) : null}

      {/* <Card className="border-slate-200/80 bg-slate-50/60 shadow-lg dark:border-slate-800/60 dark:bg-slate-900/60">
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
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-indigo-500" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {insight.title}
                </p>
              </div>
              <p className="mt-4 text-3xl font-semibold text-indigo-600 dark:text-indigo-300">
                {insight.value}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {insight.change}
              </p>
            </div>
          ))}
        </CardContent>
      </Card> */}

      {!isLoading && (
        <>
          <Card className="border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900">
            <CardHeader className="gap-3">
              <Badge variant="secondary" className="w-fit">
                <Flame className="h-4 w-4" />
                Distribución por grupos
              </Badge>
              <CardDescription>
                Comparación de registros y total de casos por grupo de tamizaje.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-700 dark:bg-slate-800/40">
                <p className="mb-2 text-sm font-semibold text-slate-600 dark:text-slate-200">
                  Distribución de registros
                </p>
                <DistributionBarChart
                  data={groupDistribution}
                  valueKey="registros"
                />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-700 dark:bg-slate-800/40">
                <p className="mb-2 text-sm font-semibold text-slate-600 dark:text-slate-200">
                  Suma total de casos
                </p>
                <DistributionBarChart
                  data={groupTotals}
                  valueKey="casos"
                  color="#6366F1"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900">
            <CardHeader className="gap-2">
              <Badge variant="secondary" className="w-fit">
                Heatmap por tipo de tamizaje
              </Badge>
              <CardDescription>
                Casos agregados por grupo de tamizaje y tipo específico de evaluación.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HeatmapMatrix
                data={typeHeatmap}
                axisKey="type"
                title="Casos por tipo de tamizaje y grupo"
              />
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900">
            <CardHeader className="gap-2">
              <Badge variant="secondary" className="w-fit">
                Heatmap por departamento
              </Badge>
              <CardDescription>
                Volumen de casos por departamento y grupo de tamizaje.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HeatmapMatrix
                data={deptHeatmap}
                axisKey="department"
                title="Casos por departamento y grupo"
              />
            </CardContent>
            <Separator className="mt-4" />
            <CardContent className="pt-4 text-xs text-slate-500 dark:text-slate-400">
              Los mapas de calor destacan los segmentos con mayor relevancia para
              focalizar intervenciones y recursos.
            </CardContent>
          </Card>

          <DescriptiveStats stats={stats} />
        </>
      )}
    </div>
  );
}

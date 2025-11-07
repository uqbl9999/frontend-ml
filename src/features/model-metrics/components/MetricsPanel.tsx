import { BrainCog, CheckCircle2, Gauge, Info } from "lucide-react";

import { Badge } from "../../../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { FeatureImportanceChart } from "./FeatureImportanceChart";
import { useMetricsData } from "../hooks/useMetricsData";

export function MetricsPanel() {
  const { metrics, featureImportance, interpretation, modelInfo, topN, setTopN } = useMetricsData();

  return (
    <div className="space-y-6">
      <Card className="border-slate-200/80 bg-slate-50/60 shadow-lg dark:border-slate-800/60 dark:bg-slate-900/60">
        <CardHeader className="gap-3">
          <Badge variant="default" className="w-fit">
            <Gauge className="h-4 w-4" />
            Métricas del modelo
          </Badge>
          <CardTitle className="text-2xl">
            Evalúa el desempeño y estabilidad del modelo predictivo
          </CardTitle>
          <CardDescription>
            Monitorea métricas clave y define acciones de mejora continua para
            mantener la precisión de las estimaciones.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <Card
            key={metric.id}
            className="border-slate-200 bg-white shadow-md hover:border-indigo-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <CardHeader className="pb-2">
              <Badge variant="outline" className="w-fit text-xs">
                {metric.label}
              </Badge>
              <CardTitle className="text-3xl font-semibold text-indigo-600 dark:text-indigo-300">
                {metric.format ? metric.format(metric.value) : metric.value}
              </CardTitle>
              <CardDescription>{metric.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400">
                Clasificación:{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {metric.quality}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900">
        <CardHeader className="flex flex-col gap-3">
          <Badge variant="secondary" className="w-fit">
            <BrainCog className="h-4 w-4" />
            Importancia de características
          </Badge>
          <CardDescription>
            Peso relativo de las variables dentro del modelo Random Forest.
          </CardDescription>
          <div className="mt-2 inline-flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
              Top N
            </span>
            <select
              value={topN}
              onChange={(e) => setTopN(Number(e.target.value))}
              className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 shadow-inner outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/40"
            >
              {[5, 10, 15].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </CardHeader>
        <CardContent className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-700 dark:bg-slate-800/40">
          <FeatureImportanceChart data={featureImportance} />
        </CardContent>
      </Card>

      {modelInfo ? (
        <Card className="border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900">
          <CardHeader className="gap-3">
            <Badge variant="outline" className="w-fit">
              Información del modelo
            </Badge>
            <CardDescription>
              Metadatos principales reportados por el servicio.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-800/40">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                MODEL_TYPE
              </span>
              <p className="mt-1 font-medium text-slate-900 dark:text-slate-50">
                {(modelInfo as any)?.model_type ?? "—"}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-800/40">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                N_FEATURES
              </span>
              <p className="mt-1 font-medium text-slate-900 dark:text-slate-50">
                {(modelInfo as any)?.n_features ?? "—"}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <Card className="border-indigo-200 bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent shadow-md dark:border-indigo-500/40 dark:from-indigo-500/10 dark:via-slate-900 dark:to-slate-900">
        <CardHeader className="gap-3">
          <Badge
            variant="default"
            className="bg-indigo-600 text-white dark:bg-indigo-500"
          >
            <CheckCircle2 className="h-4 w-4" />
            Interpretación de resultados
          </Badge>
          <CardDescription className="text-sm text-slate-600 dark:text-slate-300">
            Conclusiones clave sobre el rendimiento del modelo y su capacidad de
            generalización.
          </CardDescription>
        </CardHeader>
        <Separator className="mx-6" />
        <CardContent className="space-y-3 pt-4 text-sm text-slate-700 dark:text-slate-200">
          {interpretation.map((item) => (
            <p
              key={item.title}
              className={[
                "leading-relaxed",
                "highlight" in item && item.highlight ? "font-semibold text-emerald-600 dark:text-emerald-300" : "",
              ].join(" ")}
            >
              <span className="inline-flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-300">
                <Info className="h-4 w-4" />
                {item.title}:
              </span>{" "}
              {item.content}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

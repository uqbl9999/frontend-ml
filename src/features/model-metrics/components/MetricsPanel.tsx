import { Gauge, Sparkles } from "lucide-react";

import { Badge } from "../../../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { useMetricsData } from "../hooks/useMetricsData";

export function MetricsPanel() {
  const { metrics } = useMetricsData();

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
              <CardTitle className="text-3xl font-semibold">
                {metric.value}
              </CardTitle>
              <CardDescription>{metric.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400">
                Evolución estable en los últimos 90 días · Variación &lt; 2%.
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-indigo-200 bg-gradient-to-r from-indigo-500/10 via-indigo-500/5 to-transparent shadow-md dark:border-indigo-500/40 dark:from-indigo-500/10 dark:via-slate-900 dark:to-slate-900">
        <CardHeader className="flex flex-col items-start gap-3 pb-3">
          <Badge
            variant="default"
            className="bg-indigo-600 text-white dark:bg-indigo-500"
          >
            <Sparkles className="h-4 w-4" />
            Oportunidades de mejora
          </Badge>
          <CardDescription className="text-sm text-slate-600 dark:text-slate-300">
            Considera incrementar la cobertura de datos rurales y evaluar
            modelos híbridos con componentes de explainable AI para justificar
            las decisiones.
          </CardDescription>
        </CardHeader>
        <Separator className="mx-6" />
        <CardContent className="pt-4 text-xs text-slate-500 dark:text-slate-400">
          Próxima evaluación programada: 15 de marzo · Dataset de validación
          2024-Q4 en proceso de limpieza.
        </CardContent>
      </Card>
    </div>
  );
}

import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  ClipboardCheck,
  Info,
  MapPin,
  ShieldHalf,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { usePredictionForm } from "../hooks/usePredictionForm";

type PredictionResult = {
  readonly value: number;
  readonly classification: "Riesgo Bajo" | "Riesgo Moderado" | "Riesgo Alto";
  readonly summary: string;
  readonly recommendations: string[];
};

const MOCK_RESULT: PredictionResult = {
  value: 0.2363,
  classification: "Riesgo Moderado",
  summary:
    "Basado en percentiles históricos del MINSA. Mantener vigilancia y reforzar acciones preventivas.",
  recommendations: [
    "Mantener programas preventivos regulares en la región.",
    "Monitorear indicadores críticos cada dos semanas.",
    "Activar seguimiento personalizado a población adolescente.",
  ],
};

export function PredictionPanel() {
  const { fields, onSubmit } = usePredictionForm();
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const formattedAttributes = useMemo(
    () =>
      fields.map((field) => {
        const selectedOption = field.options.find(
          (option) => option.value === field.value,
        );

        return {
          id: field.id,
          label: field.label,
          value: selectedOption?.label ?? "Sin selección",
          Icon: field.icon,
        };
      }),
    [fields],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    onSubmit(event);
    setPrediction(MOCK_RESULT);
    setShowDetails(false);
  };

  return (
    <div className="space-y-8">
      <Card className="border-slate-200/80 bg-slate-50/60 shadow-lg backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/60">
        <CardHeader className="gap-3">
          <Badge variant="default" className="w-fit">
            <Activity className="h-4 w-4" />
            Predicción de Tasa de Positividad
          </Badge>
          <CardTitle className="text-2xl">
            Configure los filtros para generar una proyección actualizada
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            La predicción se alimenta de series históricas de tamizajes de salud
            mental y aplica un modelo RandomForest optimizado. Ajusta los
            parámetros y obtén un estimado para el siguiente periodo.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            className="space-y-8"
            onSubmit={handleSubmit}
            aria-label="Formulario para generar predicción"
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {fields.map((field) => {
                const Icon = field.icon;
                return (
                  <label
                    key={field.id}
                    className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm transition hover:border-indigo-200 hover:shadow dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-indigo-500/50"
                  >
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                      <Icon className="h-4 w-4 text-indigo-500 dark:text-indigo-300" />
                      {field.label}
                    </span>
                    <select
                      value={field.value}
                      onChange={(event) => field.onChange(event.target.value)}
                      className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 shadow-inner outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/40"
                    >
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/80 px-6 py-4 dark:border-indigo-500/50 dark:bg-indigo-500/10">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-300">
                  Motor Analítico
                </span>
                <p className="text-sm text-indigo-700 dark:text-indigo-200">
                  Modelo entrenado con datos 2018-2024 · Última actualización hace
                  3 días.
                </p>
              </div>
              <Button type="submit" className="gap-2 px-6">
                Predecir tasa de positividad
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {prediction ? (
        <Card
          role="button"
          tabIndex={0}
          onClick={() => setShowDetails((value) => !value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setShowDetails((value) => !value);
            }
          }}
          className="cursor-pointer border-indigo-300/80 bg-gradient-to-br from-indigo-100 via-white to-indigo-50 shadow-lg transition hover:scale-[1.01] hover:border-indigo-400 dark:border-indigo-500/60 dark:from-indigo-500/10 dark:via-slate-900 dark:to-slate-900"
        >
          <CardHeader className="gap-2">
            <Badge variant="default" className="w-fit">
              <ShieldHalf className="h-4 w-4" />
              Resultado de la Predicción
            </Badge>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <CardTitle className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-200">
                  Tasa de Positividad Estimada
                </CardTitle>
                <p className="text-5xl font-black text-indigo-700 dark:text-indigo-300">
                  {(prediction.value * 100).toFixed(2)}%
                </p>
              </div>
              <Badge
                variant="secondary"
                className="bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200"
              >
                <AlertTriangle className="h-4 w-4" />
                {prediction.classification}
              </Badge>
            </div>
            <CardDescription className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
              <Info className="mt-0.5 h-4 w-4 text-indigo-500 dark:text-indigo-300" />
              {prediction.summary}
            </CardDescription>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Haz clic para ver el desglose detallado de la predicción.
            </p>
          </CardHeader>
        </Card>
      ) : null}

      {prediction && showDetails ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900">
            <CardHeader>
              <Badge variant="secondary" className="w-fit">
                <ShieldHalf className="h-4 w-4 text-indigo-500" />
                Perfil de riesgo
              </Badge>
              <CardTitle>{prediction.classification}</CardTitle>
              <CardDescription>{prediction.summary}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/80 px-4 py-4 text-sm text-indigo-700 shadow-sm dark:border-indigo-500/40 dark:bg-indigo-500/5 dark:text-indigo-200">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Contexto situacional
                </div>
                <p className="mt-2 text-xs leading-relaxed text-indigo-600 dark:text-indigo-200/80">
                  La tasa se encuentra en un rango moderado respecto a la media
                  histórica. Se recomienda fortalecer la detección temprana y
                  reforzar los protocolos de derivación.
                </p>
              </div>
              <ul className="space-y-3">
                {prediction.recommendations.map((recommendation) => (
                  <li
                    key={recommendation}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    <ClipboardCheck className="mt-0.5 h-4 w-4 text-indigo-500" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900">
            <CardHeader>
              <Badge variant="secondary" className="w-fit">
                <MapPin className="h-4 w-4 text-indigo-500" />
                Parámetros considerados
              </Badge>
              <CardDescription>
                Resumen de los criterios seleccionados para generar la
                proyección.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {formattedAttributes.map(({ id, label, value, Icon }) => (
                  <div
                    key={id}
                    className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/40"
                  >
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                      <Icon className="h-4 w-4 text-indigo-500 dark:text-indigo-300" />
                      {label}
                    </span>
                    <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-50">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-100 to-white p-4 text-sm text-slate-600 dark:border-slate-700 dark:from-slate-800/80 dark:to-slate-900">
                <p>
                  Proyección generada con un horizonte de{" "}
                  <strong>4 semanas</strong> y sensibilidad ajustada para
                  priorizar la detección en población adolescente.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

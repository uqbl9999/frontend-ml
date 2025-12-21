import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  ClipboardCheck,
  Info,
  MapPin,
  ShieldHalf,
  HelpCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { api } from "../../../lib/api";

import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { usePredictionForm } from "../hooks/usePredictionForm";

type PredictionResult = {
  readonly value: number; // porcentaje directo (ej: 33.54)
  readonly classification: string; // tomado de interpretacion (ej: "Riesgo Alto")
  readonly summary: string; // detalle de interpretacion
  readonly recommendations: string[]; // acciones sugeridas desde la API
  readonly context?: string; // contexto situacional desde la API
  readonly keyFactors?: string[]; // factores clave desde la API
};

export function PredictionPanel() {
  const { fields, onSubmit, formState, isLoadingMetadata } = usePredictionForm();
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [lastUbigeo, setLastUbigeo] = useState<number | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formattedAttributes = useMemo(() => {
    const base: Array<{ id: string; label: string; value: string; Icon: LucideIcon }> = fields.map((field) => {
      const selectedOption = field.options.find(
        (option) => option.value === field.value,
      );

      return {
        id: field.id,
        label: field.label,
        value: selectedOption?.label ?? "Sin selección",
        Icon: field.icon,
      };
    });

    if (typeof lastUbigeo === "number") {
      base.push({
        id: "ubigeo",
        label: "Ubigeo",
        value: String(lastUbigeo),
        Icon: MapPin,
      });
    }
    return base;
  }, [fields, lastUbigeo]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    onSubmit(event);

    try {
      setIsSubmitting(true);
      // Obtener ubigeo para el par dept/prov
      let ubigeo: number | undefined = undefined;
      if (formState.department && formState.province) {
        try {
          const resp = await api.getUbigeo(formState.department, formState.province);
          ubigeo = resp?.ubigeo;
        } catch (e) {
          console.warn("No se pudo obtener ubigeo:", e);
        }
      }

      const payload = {
        NroMes: Number(formState.month),
        Departamento: formState.department,
        Provincia: formState.province,
        Sexo: formState.sex === "M" ? "M" : "F",
        Etapa: formState.lifeStage,
        DetalleTamizaje: formState.screeningType,
        ubigeo,
      } as const;

      const result = await api.predict(payload);
      const [risk, detail] = (result.interpretacion ?? "").split(" - ");
      setLastUbigeo(ubigeo);
      const newPrediction: PredictionResult = {
        value: result.tasa_positividad_predicha,
        classification: risk || "Predicción",
        summary: detail || result.interpretacion,
        recommendations:
          result.explicacion?.acciones && result.explicacion.acciones.length > 0
            ? result.explicacion.acciones
            : [
                "Reforzar acciones preventivas y seguimiento.",
                "Monitorear indicadores críticos semanalmente.",
                "Coordinar intervención con equipos territoriales.",
              ],
        context: result.explicacion?.contexto_situacional,
        keyFactors: result.explicacion?.factores_clave ?? [],
      };
      setPrediction(newPrediction);
      setShowDetails(false);
    } catch (error) {
      console.error("Error al predecir:", error);
      setPrediction(null);
    } finally {
      setIsSubmitting(false);
    }
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
            mental y aplica un modelo GradientBoosting optimizado. Ajusta los
            parámetros y obtén un estimado para el siguiente periodo.
          </CardDescription>
          
          {/* Pasos del flujo */}
          <div className="mt-6 rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-4 dark:border-indigo-800 dark:from-indigo-950/30 dark:to-purple-950/30">
            <h4 className="mb-4 text-sm font-semibold text-indigo-800 dark:text-indigo-200 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Pasos para generar una predicción
            </h4>
            <div className="grid gap-3 md:grid-cols-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white shadow-md dark:bg-indigo-500">
                  1
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-100">Configura filtros</p>
                  <p className="mt-0.5 text-xs text-indigo-700 dark:text-indigo-300">Selecciona departamento, provincia, etapa de vida, tipo de tamizaje, sexo y mes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white shadow-md dark:bg-indigo-500">
                  2
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-100">Genera predicción</p>
                  <p className="mt-0.5 text-xs text-indigo-700 dark:text-indigo-300">Haz clic en "Predecir tasa de positividad"</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white shadow-md dark:bg-indigo-500">
                  3
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-100">Revisa resultados</p>
                  <p className="mt-0.5 text-xs text-indigo-700 dark:text-indigo-300">Analiza la tasa estimada, clasificación y recomendaciones</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white shadow-md dark:bg-indigo-500">
                  4
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-100">Explora más</p>
                  <p className="mt-0.5 text-xs text-indigo-700 dark:text-indigo-300">Usa las otras pestañas para análisis exploratorio y métricas</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50/50 p-3 dark:border-indigo-800 dark:bg-indigo-950/20">
            <div className="flex items-start gap-2">
              <HelpCircle className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0 dark:text-indigo-400" />
              <div className="text-xs text-indigo-700 dark:text-indigo-300">
                <p className="font-medium mb-1">Guía rápida de campos:</p>
                <ul className="space-y-1 text-indigo-600 dark:text-indigo-400">
                  <li>• <strong>Departamento/Provincia:</strong> Ubicación geográfica del tamizaje</li>
                  <li>• <strong>Etapa de Vida:</strong> Grupo etario (Niño, Adolescente, Adulto)</li>
                  <li>• <strong>Tipo de Tamizaje:</strong> Condición a evaluar (ansiedad, depresión, etc.)</li>
                  <li>• <strong>Sexo:</strong> Género del paciente</li>
                  <li>• <strong>Mes a Predecir:</strong> Periodo futuro para la proyección</li>
                </ul>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form
            className="space-y-8"
            onSubmit={handleSubmit}
            aria-label="Formulario para generar predicción"
          >
            <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {fields.map((field) => {
                const Icon = field.icon;
                
                const fieldDescriptions: Record<string, string> = {
                  department: "Selecciona el departamento donde se realizará el tamizaje. Esto afecta la predicción según patrones geográficos históricos.",
                  province: "Provincia específica dentro del departamento seleccionado. Se actualiza automáticamente al elegir un departamento.",
                  lifeStage: "Grupo etario del paciente. Las tasas de positividad varían según la etapa de vida (niño, adolescente, adulto).",
                  screeningType: "Tipo de condición o trastorno a evaluar en el tamizaje (ansiedad, depresión, violencia familiar, etc.).",
                  sex: "Género del paciente. Los modelos muestran diferencias en las tasas según este factor demográfico.",
                  month: "Mes futuro para el cual se quiere predecir la tasa de positividad. Considera variaciones estacionales."
                };
                
                const description = fieldDescriptions[field.id] || "";
                
                return (
                  <label
                    key={field.id}
                    className="group flex flex-col gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-slate-200 bg-white/90 p-3 sm:p-4 shadow-sm transition hover:border-indigo-200 hover:shadow dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-indigo-500/50"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-500 dark:text-indigo-300 flex-shrink-0" />
                        <span className="truncate">{field.label}</span>
                      </span>
                      {description && (
                        <div className="group/help relative flex-shrink-0">
                          <HelpCircle className="h-3.5 w-3.5 text-slate-400 hover:text-indigo-500 cursor-help transition-colors" />
                          <div className="absolute right-0 top-6 z-10 hidden w-64 rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-600 shadow-lg group-hover/help:block dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            {description}
                          </div>
                        </div>
                      )}
                    </div>
                    <select
                      value={field.value}
                      onChange={(event) => field.onChange(event.target.value)}
                      disabled={
                        // Habilita provincia cuando existe un departamento seleccionado
                        isLoadingMetadata ||
                        (field.id === "province" && !formState.department)
                      }
                      className="h-10 sm:h-11 rounded-lg sm:rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 shadow-inner outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/40 w-full"
                      title={description}
                    >
                      {field.options.map((option) => (
                        <option
                          key={`${field.id}-${option.value || "placeholder"}`}
                          value={option.value}
                          disabled={option.value === ""}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {field.id === "province" && !formState.department && (
                      <p className="text-xs text-slate-400 italic">
                        Selecciona primero un departamento
                      </p>
                    )}
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
                  Modelo entrenado con datos del 2017
                </p>
              </div>
              <Button
                type="submit"
                className="gap-2 px-6"
                disabled={isSubmitting || isLoadingMetadata}
                aria-busy={isSubmitting || isLoadingMetadata}
              >
                {isSubmitting || isLoadingMetadata ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
                    {isLoadingMetadata ? "Cargando metadatos..." : "Calculando..."}
                  </>
                ) : (
                  <>
                    Predecir tasa de positividad
                    <ArrowUpRight className="h-4 w-4" />
                  </>
                )}
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
                  {prediction.value.toFixed(2)}%
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
                  {prediction.context || "Sin contexto proporcionado"}
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

              {prediction.keyFactors && prediction.keyFactors.length > 0 ? (
                <div className="mt-4 space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                    Factores clave
                  </div>
                  <ul className="space-y-2">
                    {prediction.keyFactors.map((factor) => (
                      <li
                        key={factor}
                        className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-200"
                      >
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
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
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

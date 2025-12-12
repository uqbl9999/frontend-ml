import { useEffect, useState } from "react";
import { api } from "../../../lib/api";

type MetricQuality = "Excelente" | "Bueno" | "Aceptable" | "En observación";

type ModelMetric = {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly format?: (value: number) => string;
  readonly quality: MetricQuality;
  readonly description: string;
};

// Helpers para clasificar calidad
const qualityR2 = (v: number): MetricQuality => (v >= 0.75 ? "Excelente" : v >= 0.6 ? "Bueno" : v >= 0.5 ? "Aceptable" : "En observación");
const qualityLowerIsBetter = (v: number, t: [number, number, number]): MetricQuality => (v <= t[0] ? "Excelente" : v <= t[1] ? "Bueno" : v <= t[2] ? "Aceptable" : "En observación");

type ModelInfoMeta = {
  readonly model_type?: string;
  readonly n_features?: number;
  readonly metrics?: {
    readonly optimized_train?: {
      readonly R2: number;
      readonly MAE: number;
      readonly MSE: number;
      readonly RMSE: number;
    };
  };
};

export function useMetricsData() {
  const [metrics, setMetrics] = useState<ModelMetric[]>([]);
  const [featureImportance, setFeatureImportance] = useState<ReadonlyArray<{ feature: string; importance: number }>>([]);
  const [interpretation, setInterpretation] = useState<ReadonlyArray<{ title: string; content: string; highlight?: boolean }>>([]);
  const [modelInfo, setModelInfo] = useState<ModelInfoMeta | null>(null);
  const [topN, setTopN] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        const [features, info] = await Promise.all([
          api.getModelFeatures(topN),
          api.getModelInfo(),
        ]);
        if (cancelled) return;
        setFeatureImportance(features);
        setModelInfo(info as ModelInfoMeta);

        // Derivar métricas desde optimized_train
        const infoTyped = info as ModelInfoMeta;
        const optimized = infoTyped?.metrics?.optimized_train;
        if (optimized) {
          const derived: ModelMetric[] = [
            {
              id: "r2",
              label: "R² (Optimized Train)",
              value: optimized.R2,
              format: (v) => v.toFixed(4),
              quality: qualityR2(optimized.R2),
              description:
                "Porcentaje de variabilidad explicada por el modelo en entrenamiento optimizado.",
            },
            {
              id: "mae",
              label: "MAE (Optimized Train)",
              value: optimized.MAE,
              format: (v) => v.toFixed(2),
              quality: qualityLowerIsBetter(optimized.MAE, [10, 12, 15]),
              description: "Error absoluto medio. Mientras menor, mejor desempeño.",
            },
            {
              id: "mse",
              label: "MSE (Optimized Train)",
              value: optimized.MSE,
              format: (v) => v.toFixed(2),
              quality: qualityLowerIsBetter(optimized.MSE, [250, 300, 400]),
              description: "Error cuadrático medio. Penaliza errores grandes.",
            },
          ];
          setMetrics(derived);

          const interpretationItems = [
            {
              title: "Modelo",
              content: `Tipo: ${infoTyped?.model_type ?? "desconocido"} con ${infoTyped?.n_features ?? "?"} características.`,
            },
            {
              title: "R² (Coeficiente de Determinación)",
              content: `${optimized.R2.toFixed(4)}: Proporción de variabilidad explicada en el entrenamiento optimizado.`,
            },
            {
              title: "MAE (Error Absoluto Medio)",
              content: `${optimized.MAE.toFixed(2)}: Desviación promedio de las predicciones respecto a la tasa real.`,
            },
            {
              title: "MSE (Error Cuadrático Medio)",
              content: `${optimized.MSE.toFixed(2)}: Evalúa el error cuadrático; menor indica mejor ajuste.`,
            },
            {
              title: "Conclusión",
              content: optimized.R2 >= 0.6
                ? "El modelo muestra buen desempeño (R² ≥ 0.60, errores manejables) y está listo para seguimiento y mejora continua."
                : "El modelo requiere ajustes adicionales para mejorar su capacidad explicativa y reducir errores.",
              highlight: true,
            },
          ] as const;
          setInterpretation(interpretationItems);
        }
      } catch {
        if (cancelled) return;
        // Fallback silencioso cuando el backend no está disponible
        setFeatureImportance([]);
        setModelInfo(null);
        setMetrics([]);
        setInterpretation([
          {
            title: "Servicio no disponible",
            content: "No se pudo obtener la información del modelo. Verifica la conexión con la API.",
            highlight: true,
          },
        ]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [topN]);

  return { metrics, featureImportance, interpretation, modelInfo, topN, setTopN, isLoading };
}

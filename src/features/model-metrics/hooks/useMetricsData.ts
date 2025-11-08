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

export function useMetricsData() {
  const [metrics, setMetrics] = useState<ModelMetric[]>([]);
  const [featureImportance, setFeatureImportance] = useState<ReadonlyArray<{ feature: string; importance: number }>>([]);
  const [interpretation, setInterpretation] = useState<ReadonlyArray<{ title: string; content: string; highlight?: boolean }>>([]);
  const [modelInfo, setModelInfo] = useState<Record<string, unknown> | null>(null);
  const [topN, setTopN] = useState<number>(10);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [features, info] = await Promise.all([
          api.getModelFeatures(topN),
          api.getModelInfo(),
        ]);
        if (cancelled) return;
        setFeatureImportance(features);
        setModelInfo(info);

        // Derivar métricas desde optimized_train
        const optimized = (info as any)?.metrics?.optimized_train as
          | { R2: number; MAE: number; MSE: number; RMSE: number }
          | undefined;
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
            {
              id: "rmse",
              label: "RMSE (Optimized Train)",
              value: optimized.RMSE,
              format: (v) => v.toFixed(2),
              quality: qualityLowerIsBetter(optimized.RMSE, [16, 18, 22]),
              description: "Raíz de MSE, en unidades originales de la tasa.",
            },
          ];
          setMetrics(derived);

          const interpretationItems = [
            {
              title: "Modelo",
              content: `Tipo: ${(info as any)?.model_type ?? "desconocido"} con ${(info as any)?.n_features ?? "?"} características.`,
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
              title: "RMSE",
              content: `${optimized.RMSE.toFixed(2)}: Interpretación directa en unidades de tasa de positividad.`,
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
      } catch (error) {
        console.error("Error cargando métricas del modelo:", error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [topN]);

  return { metrics, featureImportance, interpretation, modelInfo, topN, setTopN };
}

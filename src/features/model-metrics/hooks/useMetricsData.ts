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

const MOCK_METRICS: ModelMetric[] = [
  {
    id: "mae",
    label: "MAE (Test)",
    value: 11.35,
    format: (value) => value.toFixed(2),
    quality: "Bueno",
    description:
      "Error absoluto medio en el conjunto de prueba. Mientras menor, mejor desempeño.",
  },
  {
    id: "r2",
    label: "R² (Test)",
    value: 0.676,
    format: (value) => value.toFixed(4),
    quality: "Aceptable",
    description:
      "Porcentaje de variabilidad explicada por el modelo. Valores cercanos a 1 indican mayor precisión.",
  },
  {
    id: "oob",
    label: "OOB Score",
    value: 0.6687,
    format: (value) => value.toFixed(4),
    quality: "Bueno",
    description:
      "Puntaje Out-Of-Bag que evalúa generalización sin datos de prueba adicionales.",
  },
];

const FEATURE_IMPORTANCE = [
  { feature: "Ubigeo", importance: 0.3307 },
  { feature: "Detalle Tamizaje · Trastorno Depresivo", importance: 0.2089 },
  { feature: "NroMes", importance: 0.1141 },
  { feature: "Detalle Tamizaje · Síndrome y/o Trastorno Psicotico", importance: 0.0332 },
  { feature: "Etapa · 60 - 79", importance: 0.0185 },
  { feature: "Etapa · 40 - 59", importance: 0.0179 },
  { feature: "Sexo · Masculino", importance: 0.0174 },
  { feature: "Etapa · 12 - 14", importance: 0.0168 },
] as const;

const INTERPRETATION = [
  {
    title: "Modelo",
    content:
      "Se entrenó un modelo RandomForestRegressor (n_estimators=100) con 54,905 registros del dataset balanceado (80% train, 20% test).",
  },
  {
    title: "R² (Coeficiente de Determinación)",
    content:
      "0.6760: El modelo explica el 67.6% de la variabilidad en la tasa de positividad.",
  },
  {
    title: "MAE (Error Absoluto Medio)",
    content:
      "11.35: En promedio, las predicciones del modelo se desvían en 11.35 puntos porcentuales de la tasa real.",
  },
  {
    title: "OOB Score",
    content:
      "0.6687: Confirma que el modelo generaliza bien, siendo un valor muy cercano al R² de prueba.",
  },
  {
    title: "Variables más importantes",
    content:
      "Las variables con mayor poder predictivo son 'Ubigeo' (0.3307), 'Detalle Tamizaje · Trastorno Depresivo' (0.2089) y 'NroMes' (0.1141).",
  },
  {
    title: "Sin overfitting",
    content:
      "Las métricas de train y test son similares, indicando buena generalización.",
  },
  {
    title: "Conclusión",
    content:
      "El modelo cumple con los objetivos establecidos (MAE manejable, R² > 0.60) y está listo para deployment en producción.",
    highlight: true,
  },
] as const;

export function useMetricsData() {
  const [metrics, setMetrics] = useState<ModelMetric[]>([]);
  const [featureImportance, setFeatureImportance] =
    useState(FEATURE_IMPORTANCE);
  const [interpretation, setInterpretation] = useState(INTERPRETATION);
  const [modelInfo, setModelInfo] = useState<Record<string, unknown> | null>(null);
  const [topN, setTopN] = useState<number>(5);

  useEffect(() => {
    // Cargar métricas base (mock por ahora)
    setMetrics(MOCK_METRICS);
    setInterpretation(INTERPRETATION);
  }, []);

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

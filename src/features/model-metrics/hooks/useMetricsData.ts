import { useEffect, useState } from "react";

type ModelMetric = {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly description: string;
};

const MOCK_METRICS: ModelMetric[] = [
  {
    id: "rmse",
    label: "RMSE",
    value: "0.12",
    description: "Error cuadrático medio reducido en el último sprint",
  },
  {
    id: "acc",
    label: "Accuracy",
    value: "92%",
    description: "Tasa de predicciones acertadas en el conjunto de prueba",
  },
  {
    id: "auc",
    label: "AUC",
    value: "0.88",
    description: "Área bajo la curva ROC para la versión v2 del modelo",
  },
];

export function useMetricsData() {
  const [metrics, setMetrics] = useState<ModelMetric[]>([]);

  useEffect(() => {
    // TODO: Reemplazar con la petición real al servicio de métricas.
    setMetrics(MOCK_METRICS);
  }, []);

  return { metrics };
}

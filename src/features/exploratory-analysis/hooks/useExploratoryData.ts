import { useEffect, useState } from "react";

type ExploratoryInsight = {
  readonly id: string;
  readonly title: string;
  readonly value: string;
  readonly change: string;
};

const MOCK_INSIGHTS: ExploratoryInsight[] = [
  {
    id: "trend-growth",
    title: "Crecimiento mensual promedio",
    value: "+3.4%",
    change: "vs. último trimestre",
  },
  {
    id: "life-stage",
    title: "Mayor incidencia",
    value: "Adolescentes",
    change: "grupo de riesgo 2024",
  },
];

export function useExploratoryData() {
  const [insights, setInsights] = useState<ExploratoryInsight[]>([]);

  useEffect(() => {
    // TODO: Replace with API call fetching exploratory charts and KPIs.
    setInsights(MOCK_INSIGHTS);
  }, []);

  return { insights };
}

import { useEffect, useState } from "react";

import {
  departmentHeatmap,
  descriptiveStats,
  screeningGroupDistribution,
  screeningGroupTotals,
  screeningTypeHeatmap,
} from "../data/mock-charts";

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
  {
    id: "department-leader",
    title: "Departamento con mayor variación",
    value: "Cusco",
    change: "Incremento de 6.2 pp",
  },
  {
    id: "screening-focus",
    title: "Tamizaje prioritario",
    value: "Violencia Familiar",
    change: "Mayor tasa de positividad",
  },
];

export function useExploratoryData() {
  const [insights, setInsights] = useState<ExploratoryInsight[]>([]);
  const [groupDistribution, setGroupDistribution] = useState(screeningGroupDistribution);
  const [groupTotals, setGroupTotals] = useState(screeningGroupTotals);
  const [typeHeatmap, setTypeHeatmap] = useState(screeningTypeHeatmap);
  const [deptHeatmap, setDeptHeatmap] = useState(departmentHeatmap);
  const [stats, setStats] = useState(descriptiveStats);

  useEffect(() => {
    // TODO: Replace with API call fetching exploratory charts and KPIs.
    setInsights(MOCK_INSIGHTS);
    setGroupDistribution(screeningGroupDistribution);
    setGroupTotals(screeningGroupTotals);
    setTypeHeatmap(screeningTypeHeatmap);
    setDeptHeatmap(departmentHeatmap);
    setStats(descriptiveStats);
  }, []);

  return {
    insights,
    groupDistribution,
    groupTotals,
    typeHeatmap,
    deptHeatmap,
    stats,
  };
}

import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import type {
  DescriptiveStatsResponse,
  DistributionResponse,
  ScreeningTypeHeatmapResponse,
  DepartmentHeatmapResponse,
} from "../../../lib/api";

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
    // KPIs/insights (placeholder)
    setInsights(MOCK_INSIGHTS);

    // 1) Estadísticas descriptivas
    api
      .getDescriptiveStats()
      .then((d: DescriptiveStatsResponse) => {
        setStats([
          { label: "Media", value: Number(d.media) || 0, color: "text-indigo-500" },
          { label: "Mediana", value: Number(d.mediana) || 0, color: "text-emerald-500" },
          {
            label: "Desv. Estándar",
            value: Number(d.desviacion_estandar) || 0,
            color: "text-amber-500",
          },
          { label: "Máximo", value: Number(d.maximo) || 0, color: "text-rose-500" },
        ]);
      })
      .catch(() => setStats(descriptiveStats));

    // 2) Distribución de registros y suma total de casos
    api
      .getDistributionStats()
      .then((dist: DistributionResponse) => {
        const reg = dist?.distribucion_registros ?? {
          total_tamizajes: 0,
          solo_tamizajes_positivos: 0,
          tamizajes_con_violencia_politica: 0,
        };
        const tot = dist?.suma_total_casos ?? {
          total_tamizajes: 0,
          solo_tamizajes_positivos: 0,
          tamizajes_con_violencia_politica: 0,
        };

        setGroupDistribution([
          { group: "Total de Tamizajes", registros: Number(reg.total_tamizajes) || 0 },
          {
            group: "Solo Tamizajes Positivos",
            registros: Number(reg.solo_tamizajes_positivos) || 0,
          },
          {
            group: "Tamizajes con Violencia Política",
            registros: Number(reg.tamizajes_con_violencia_politica) || 0,
          },
        ]);

        setGroupTotals([
          { group: "Total de Tamizajes", casos: Number(tot.total_tamizajes) || 0 },
          {
            group: "Solo Tamizajes Positivos",
            casos: Number(tot.solo_tamizajes_positivos) || 0,
          },
          {
            group: "Tamizajes con Violencia Política",
            casos: Number(tot.tamizajes_con_violencia_politica) || 0,
          },
        ]);
      })
      .catch(() => {
        setGroupDistribution(screeningGroupDistribution);
        setGroupTotals(screeningGroupTotals);
      });

    // 3) Heatmap por tipo de tamizaje
    api
      .getHeatmapScreeningType()
      .then((resp: ScreeningTypeHeatmapResponse) => {
        const rows = Array.isArray(resp?.data) ? resp.data : [];
        if (rows.length === 0) {
          setTypeHeatmap(screeningTypeHeatmap);
          return;
        }
        const normalized = rows.map((row) => {
          const { grupo, ...rest } = row;
          const entries = Object.entries(rest)
            .filter(([_, v]) => typeof v === "number")
            .map(([k, v]) => ({ type: k, casos: Number(v) || 0 }));
          return { group: String(grupo), values: entries };
        });
        setTypeHeatmap(normalized);
      })
      .catch(() => setTypeHeatmap(screeningTypeHeatmap));

    // 4) Heatmap por departamento
    api
      .getHeatmapDepartment()
      .then((resp: DepartmentHeatmapResponse) => {
        const rows = Array.isArray(resp?.data) ? resp.data : [];
        if (rows.length === 0) {
          setDeptHeatmap(departmentHeatmap);
          return;
        }
        const groupTotal = {
          group: "Total de Tamizajes",
          values: rows.map((r) => ({
            department: r.departamento,
            casos: Number(r.total_de_tamizajes) || 0,
          })),
        };
        const groupPositive = {
          group: "Solo Tamizajes Positivos",
          values: rows.map((r) => ({
            department: r.departamento,
            casos: Number(r.solo_tamizajes_positivos) || 0,
          })),
        };
        const groupViolencia = {
          group: "Tamizajes con Violencia Política",
          values: rows.map((r) => ({
            department: r.departamento,
            casos: Number(r.tamizajes_c_condicion_adicional_violencia_politica) || 0,
          })),
        };
        setDeptHeatmap([groupTotal, groupPositive, groupViolencia]);
      })
      .catch(() => setDeptHeatmap(departmentHeatmap));
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

import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import type {
  DescriptiveStatsResponse,
  DistributionResponse,
  ScreeningTypeHeatmapResponse,
  DepartmentHeatmapResponse,
} from "../../../lib/api";

type ExploratoryInsight = {
  readonly id: string;
  readonly title: string;
  readonly value: string;
  readonly change: string;
};

// Tipos ampliados para evitar literales estrechos provenientes de datos mock con `as const`
type DistributionItem = {
  readonly group: string;
  readonly registros?: number;
  readonly porcentaje?: number;
  readonly casos?: number;
};

type HeatmapTypeValue = { readonly type: string; readonly casos: number };
type HeatmapDeptValue = { readonly department: string; readonly casos: number };
type HeatmapGroup<T> = { readonly group: string; readonly values: ReadonlyArray<T> };
type StatItem = { readonly label: string; readonly value: number; readonly color?: string };

export function useExploratoryData() {
  const [insights] = useState<ExploratoryInsight[]>([]);
  const [groupDistribution, setGroupDistribution] = useState<ReadonlyArray<DistributionItem>>([]);
  const [groupTotals, setGroupTotals] = useState<ReadonlyArray<DistributionItem>>([]);
  const [typeHeatmap, setTypeHeatmap] = useState<ReadonlyArray<HeatmapGroup<HeatmapTypeValue>>>([]);
  const [deptHeatmap, setDeptHeatmap] = useState<ReadonlyArray<HeatmapGroup<HeatmapDeptValue>>>([]);
  const [stats, setStats] = useState<ReadonlyArray<StatItem>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        // 1) Estadísticas descriptivas
        try {
          const d: DescriptiveStatsResponse = await api.getDescriptiveStats();
          setStats([
            { label: "Media", value: Number(d.media) || 0, color: "text-indigo-500" },
            {
              label: "Desv. Estándar",
              value: Number(d.desviacion_estandar) || 0,
              color: "text-amber-500",
            },
            { label: "Máximo", value: Number(d.maximo) || 0, color: "text-rose-500" },
          ]);
        } catch {
          setStats([]);
        }

        // 2) Distribución de registros y suma total de casos
        try {
          const dist: DistributionResponse = await api.getDistributionStats();
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
        } catch {
          setGroupDistribution([]);
          setGroupTotals([]);
        }

        // 3) Heatmap por tipo de tamizaje
        try {
          const resp: ScreeningTypeHeatmapResponse = await api.getHeatmapScreeningType();
          const rows = Array.isArray(resp?.data) ? resp.data : [];
          const normalized = rows.map((row) => {
            const { grupo, ...rest } = row;
            const entries = Object.entries(rest)
              .filter(([, v]) => typeof v === "number")
              .map(([k, v]) => ({ type: k, casos: Number(v) || 0 }));
            return { group: String(grupo), values: entries };
          });
          setTypeHeatmap(normalized);
        } catch {
          setTypeHeatmap([]);
        }

        // 4) Heatmap por departamento
        try {
          const resp: DepartmentHeatmapResponse = await api.getHeatmapDepartment();
          const rows = Array.isArray(resp?.data) ? resp.data : [];
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
        } catch {
          setDeptHeatmap([]);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    insights,
    groupDistribution,
    groupTotals,
    typeHeatmap,
    deptHeatmap,
    stats,
    isLoading,
  };
}

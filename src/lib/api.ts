const BASE_URL = (import.meta.env?.VITE_API_URL as string) || "http://127.0.0.1:8000";

async function fetchJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  health: () => fetchJSON<{ status: string }>("/health"),

  // Metadata endpoints
  getDepartamentos: () => fetchJSON<string[]>("/metadata/departamentos"),
  getTamizajes: () => fetchJSON<string[]>("/metadata/tamizajes"),
  getEtapas: () => fetchJSON<string[]>("/metadata/etapas"),
  // The backend returns: { departamento: string, provincias: string[] }
  // Normalize to string[] for consumer hooks/components.
  getProvincias: async (dept: string) => {
    const data = await fetchJSON<{ departamento?: string; provincias?: string[] }>(
      `/metadata/provincias/${encodeURIComponent(dept)}`,
    );
    return Array.isArray(data?.provincias) ? data.provincias : [];
  },
  getUbigeo: (dept: string, prov: string) => fetchJSON<{ ubigeo: number }>(`/metadata/ubigeo/${encodeURIComponent(dept)}/${encodeURIComponent(prov)}`),

  // Model endpoints
  getModelInfo: () => fetchJSON<Record<string, unknown>>("/model/info"),
  getModelFeatures: async (top_n?: number) => {
    const res = await fetchJSON<
      | Array<{ feature: string; importance: number }>
      | { top_features?: Array<{ feature: string; importance: number }> }
    >(top_n ? `/model/features?top_n=${top_n}` : "/model/features");
    if (Array.isArray(res)) return res;
    if (Array.isArray(res?.top_features)) return res.top_features;
    return [];
  },

  // Exploratory statistics endpoints (exactos según especificación)
  // GET /statistics/descriptive
  getDescriptiveStats: async () => {
    const res = await fetchJSON<DescriptiveStatsResponse>("/statistics/descriptive");
    return res;
  },

  // GET /statistics/distribution
  getDistributionStats: async () => {
    const res = await fetchJSON<DistributionResponse>("/statistics/distribution");
    return res;
  },

  // GET /statistics/heatmap/screening-type
  getHeatmapScreeningType: async () => {
    const res = await fetchJSON<ScreeningTypeHeatmapResponse>("/statistics/heatmap/screening-type");
    return res;
  },

  // GET /statistics/heatmap/department
  getHeatmapDepartment: async () => {
    const res = await fetchJSON<DepartmentHeatmapResponse>("/statistics/heatmap/department");
    return res;
  },

  // GET /statistics/screening-types
  getScreeningTypesSummary: async () => {
    const res = await fetchJSON<ScreeningTypesSummaryResponse>("/statistics/screening-types");
    return res;
  },

  // Prediction endpoints
  predict: (payload: {
    NroMes: number;
    Departamento: string;
    Provincia: string;
    Sexo: "M" | "F";
    Etapa: string;
    DetalleTamizaje: string;
    ubigeo?: number;
  }) =>
    fetchJSON<{
      tasa_positividad_predicha: number;
      interpretacion: string;
      explicacion?: {
        contexto_situacional?: string;
        acciones?: string[];
        factores_clave?: string[];
      };
      input_data: {
        NroMes: number;
        Departamento: string;
        Provincia: string;
        Sexo: "M" | "F";
        Etapa: string;
        DetalleTamizaje: string;
        ubigeo?: number;
      };
    }>("/predict/explain", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  predictBatch: (payloads: Array<{
    NroMes: number;
    Departamento: string;
    Provincia: string;
    Sexo: "M" | "F";
    Etapa: string;
    DetalleTamizaje: string;
    ubigeo?: number;
  }>) => fetchJSON<Array<{ tasa_positividad_predicha: number; interpretacion: string }>>("/predict/batch", {
    method: "POST",
    body: JSON.stringify(payloads),
  }),
};

export type PredictPayload = Parameters<typeof api.predict>[0];
export type PredictResponse = Awaited<ReturnType<typeof api.predict>>;

export type DepartmentStat = {
  departamento: string;
  total_registros: number;
  suma_total_casos: number;
  suma_positivos: number;
  tasa_positividad_promedio: number;
  tasa_positividad_mediana: number;
  tasa_positividad_max: number;
};

// Types exactos de endpoints nuevos
export type DescriptiveStatsResponse = {
  media: number;
  mediana: number;
  desviacion_estandar: number;
  maximo: number;
};

export type DistributionResponse = {
  distribucion_registros: {
    total_tamizajes: number;
    solo_tamizajes_positivos: number;
    tamizajes_con_violencia_politica: number;
  };
  suma_total_casos: {
    total_tamizajes: number;
    solo_tamizajes_positivos: number;
    tamizajes_con_violencia_politica: number;
  };
};

export type ScreeningTypeHeatmapResponse = {
  grupo_filtro: string;
  data: Array<{
    grupo: string;
    [k: string]: number | string; // claves de tipos con valores numéricos
  }>;
};

export type DepartmentHeatmapResponse = {
  grupo_filtro: string;
  top_n: string;
  data: Array<{
    departamento: string;
    solo_tamizajes_positivos: number;
    tamizajes_c_condicion_adicional_violencia_politica: number;
    total_de_tamizajes: number;
    total: number;
  }>;
};

export type ScreeningTypesSummaryResponse = {
  count: number;
  data: Array<{
    detalle_tamizaje: string;
    total_registros: number;
    suma_total_casos: number;
    suma_positivos: number;
    tasa_positividad_promedio: number;
    tasa_positividad_mediana: number;
    tasa_positividad_max: number;
  }>;
};

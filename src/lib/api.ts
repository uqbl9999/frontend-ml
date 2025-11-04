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
  getProvincias: (dept: string) => fetchJSON<string[]>(`/metadata/provincias/${encodeURIComponent(dept)}`),
  getUbigeo: (dept: string, prov: string) => fetchJSON<{ ubigeo: number }>(`/metadata/ubigeo/${encodeURIComponent(dept)}/${encodeURIComponent(prov)}`),

  // Model endpoints
  getModelInfo: () => fetchJSON<Record<string, unknown>>("/model/info"),
  getModelFeatures: (top_n?: number) => fetchJSON<Array<{ feature: string; importance: number }>>(
    top_n ? `/model/features?top_n=${top_n}` : "/model/features",
  ),

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
      input_data: {
        NroMes: number;
        Departamento: string;
        Provincia: string;
        Sexo: "M" | "F";
        Etapa: string;
        DetalleTamizaje: string;
        ubigeo?: number;
      };
    }>("/predict", {
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
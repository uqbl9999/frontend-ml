import axios, { type AxiosInstance } from 'axios';

export interface PredictionResponse {
  predicted_class: string;
  confidence: number;
  interpretation: string;
  all_probabilities: Record<string, number>;
  metadata: {
    image_size: number[];
    processing_time_ms: number;
    filename: string;
  };
  explicacion: {
    contexto_clinico: string;
    recomendaciones: string[];
    consideraciones: string[];
  };
}

export interface ModelInfo {
  model_type: string;
  framework: string;
  input_shape: number[];
  num_classes: number;
  classes: string[];
  architecture: {
    total_params: number;
    trainable_params: number;
    layers: number;
  };
  training_info: {
    epochs: number;
    batch_size: number;
    optimizer: string;
    learning_rate: number;
    loss: string;
  };
}

export interface ModelClass {
  class_name: string;
  description: string;
}

export interface ModelStatistics {
  test_accuracy: number;
  test_loss: number;
  per_class_metrics: Record<string, {
    precision: number;
    recall: number;
    f1: number;
  }>;
  confusion_matrix: number[][];
}

class ImageAnalysisService {
  private baseURL = (import.meta.env?.VITE_API_URL as string) || "http://localhost:8000";
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 45000,
      headers: { Accept: 'application/json' },
    });
  }

  private async withRetry<T>(fn: () => Promise<T>): Promise<T> {
    const maxRetries = 4;
    const baseDelayMs = 1500;
    let lastError: unknown = null;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (err: unknown) {
        lastError = err;
        const isAxios = axios.isAxiosError(err);
        const status = isAxios ? err.response?.status : undefined;
        const retryable = !isAxios || (status && (status >= 500 || status === 429));
        if (retryable && attempt < maxRetries) {
          const delay = baseDelayMs * Math.pow(2, attempt) + Math.floor(Math.random() * 500);
          await new Promise((r) => setTimeout(r, delay));
          continue;
        }
        throw err;
      }
    }
    throw lastError instanceof Error ? lastError : new Error('Request failed');
  }

  async predictImage(file: File): Promise<PredictionResponse> {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await this.withRetry(() =>
        this.client.post(`/image/predict/explain`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Error al analizar imagen: ${error.response?.data?.detail || error.message}`);
      }
      throw new Error('Error desconocido al analizar imagen');
    }
  }
  
  async getModelInfo(): Promise<ModelInfo> {
    try {
      const response = await this.withRetry(() =>
        this.client.get(`/image/model/info`)
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Error al obtener información del modelo: ${error.response?.data?.detail || error.message}`);
      }
      throw new Error('Error desconocido al obtener información del modelo');
    }
  }
  
  async getModelClasses(): Promise<ModelClass[]> {
    try {
      const response = await this.withRetry(() =>
        this.client.get(`/image/model/classes`)
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Error al obtener clases del modelo: ${error.response?.data?.detail || error.message}`);
      }
      throw new Error('Error desconocido al obtener clases del modelo');
    }
  }
  
  async getModelStatistics(): Promise<ModelStatistics> {
    try {
      const response = await this.withRetry(() =>
        this.client.get(`/image/model/statistics`)
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Error al obtener estadísticas del modelo: ${error.response?.data?.detail || error.message}`);
      }
      throw new Error('Error desconocido al obtener estadísticas del modelo');
    }
  }
}

export const imageAnalysisService = new ImageAnalysisService();

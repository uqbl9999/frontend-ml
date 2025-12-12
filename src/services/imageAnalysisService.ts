import axios from 'axios';

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
  private baseURL = 'http://localhost:8000';

  async predictImage(file: File): Promise<PredictionResponse> {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axios.post(`${this.baseURL}/image/predict/explain`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      });
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
      const response = await axios.get(`${this.baseURL}/image/model/info`, {
        headers: {
          'Accept': 'application/json'
        }
      });
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
      const response = await axios.get(`${this.baseURL}/image/model/classes`, {
        headers: {
          'Accept': 'application/json'
        }
      });
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
      const response = await axios.get(`${this.baseURL}/image/model/statistics`, {
        headers: {
          'Accept': 'application/json'
        }
      });
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
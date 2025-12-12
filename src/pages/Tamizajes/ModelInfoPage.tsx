import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Brain, Info } from 'lucide-react';
import { ModelStats } from '../../components/tamizajes/ModelStats';
import { ClassDescriptions } from '../../components/tamizajes/ClassDescriptions';
import { PerformanceMetrics } from '../../components/tamizajes/PerformanceMetrics';
import { LoadingSpinner } from '../../components/tamizajes/LoadingSpinner';
import { imageAnalysisService } from '../../services/imageAnalysisService';
import type { ModelInfo, ModelClass, ModelStatistics } from '../../services/imageAnalysisService';
import { Button } from '../../components/ui/button';

export const ModelInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null);
  const [classes, setClasses] = useState<ModelClass[]>([]);
  const [statistics, setStatistics] = useState<ModelStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'classes' | 'performance'>('info');

  const fetchModelData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [infoResponse, classesResponse, statsResponse] = await Promise.all([
        imageAnalysisService.getModelInfo(),
        imageAnalysisService.getModelClasses(),
        imageAnalysisService.getModelStatistics()
      ]);

      setModelInfo(infoResponse);
      setClasses(classesResponse);
      setStatistics(statsResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar información del modelo');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchModelData();
  }, []);

  const handleRefresh = () => {
    fetchModelData();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner
          message="Cargando información del modelo..."
          submessage="Obteniendo datos de configuración"
          variant="default"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error al cargar datos</h2>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reintentar</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/tamizajes-imagenes')}
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al análisis
          </Button>
          <Button variant="outline" onClick={handleRefresh} className="inline-flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Actualizar
          </Button>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Información del Modelo</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Detalles técnicos y estadísticas de rendimiento del sistema de análisis de imágenes médicas
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'info'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Arquitectura
            </button>
            <button
              onClick={() => setActiveTab('classes')}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'classes'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Clases
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'performance'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Rendimiento
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'info' && modelInfo && (
            <>
              <ModelStats modelInfo={modelInfo} />
              
              {/* Training Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Info className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Información de Entrenamiento</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Épocas</h4>
                    <p className="text-2xl font-bold text-gray-900">{modelInfo.training_info.epochs}</p>
                    <p className="text-xs text-gray-500">Iteraciones de entrenamiento</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Tamaño de Lote</h4>
                    <p className="text-2xl font-bold text-gray-900">{modelInfo.training_info.batch_size}</p>
                    <p className="text-xs text-gray-500">Muestras por lote</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Optimizador</h4>
                    <p className="text-lg font-bold text-gray-900">{modelInfo.training_info.optimizer}</p>
                    <p className="text-xs text-gray-500">Algoritmo de optimización</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Tasa de Aprendizaje</h4>
                    <p className="text-lg font-bold text-gray-900">{modelInfo.training_info.learning_rate}</p>
                    <p className="text-xs text-gray-500">Velocidad de aprendizaje</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-sm font-semibold text-blue-800 mb-2">Función de Pérdida</h4>
                  <p className="text-sm text-blue-700">{modelInfo.training_info.loss}</p>
                  <p className="text-xs text-blue-600 mt-1">
                    Función utilizada para medir el error durante el entrenamiento
                  </p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'classes' && classes.length > 0 && (
            <ClassDescriptions classes={classes} />
          )}

          {activeTab === 'performance' && statistics && (
            <PerformanceMetrics statistics={statistics} />
          )}
        </div>

        {/* Footer Information */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-blue-800 mb-2">Acerca del Modelo</h4>
              <p className="text-sm text-blue-700 leading-relaxed">
                Este modelo de aprendizaje profundo fue entrenado con un conjunto de datos de radiografías torácicas 
                etiquetadas por profesionales médicos. El sistema utiliza una arquitectura de red neuronal convolucional (CNN) 
                para identificar patrones característicos en las imágenes médicas.
              </p>
              <p className="text-xs text-blue-600 mt-2">
                Nota: Esta herramienta es de apoyo diagnóstico y no debe reemplazar la evaluación médica profesional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 

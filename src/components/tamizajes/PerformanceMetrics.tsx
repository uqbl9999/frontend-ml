import React from 'react';
import { BarChart3, TrendingUp, Target, Zap } from 'lucide-react';
import type { ModelStatistics } from '../../services/imageAnalysisService';

interface PerformanceMetricsProps {
  statistics: ModelStatistics;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ statistics }) => {
  const getMetricColor = (value: number) => {
    if (value >= 0.9) return 'text-green-600';
    if (value >= 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (value: number) => {
    if (value >= 0.9) return 'bg-green-500';
    if (value >= 0.8) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const overallMetrics = [
    {
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
      label: 'Precisión General',
      value: (statistics.test_accuracy * 100).toFixed(1),
      rawValue: statistics.test_accuracy,
      description: 'Porcentaje de predicciones correctas'
    },
    {
      icon: <Target className="w-5 h-5 text-green-600" />,
      label: 'Pérdida de Prueba',
      value: statistics.test_loss.toFixed(3),
      rawValue: statistics.test_loss,
      description: 'Error promedio en el conjunto de prueba',
      isLoss: true
    }
  ];

  const classMetrics = Object.entries(statistics.per_class_metrics).map(([className, metrics]) => ({
    className,
    precision: (metrics.precision * 100).toFixed(1),
    recall: (metrics.recall * 100).toFixed(1),
    f1: (metrics.f1 * 100).toFixed(1),
    rawPrecision: metrics.precision,
    rawRecall: metrics.recall,
    rawF1: metrics.f1
  }));

  return (
    <div className="space-y-6">
      {/* Métricas Generales */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Métricas Generales del Modelo</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {overallMetrics.map((metric, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                {metric.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-700">{metric.label}</h4>
                <div className="flex items-center space-x-2">
                  <p className={`text-2xl font-bold ${metric.isLoss ? getMetricColor(1 - metric.rawValue) : getMetricColor(metric.rawValue)}`}>
                    {metric.value}{!metric.isLoss && '%'}
                  </p>
                  {!metric.isLoss && (
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(metric.rawValue)}`}
                          style={{ width: `${metric.rawValue * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Métricas por Clase */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Zap className="w-6 h-6 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-800">Rendimiento por Clase</h3>
        </div>

        <div className="space-y-4">
          {classMetrics.map((classMetric, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3 capitalize">{classMetric.className.toLowerCase()}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Precisión */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Precisión</span>
                    <span className={`text-sm font-semibold ${getMetricColor(classMetric.rawPrecision)}`}>
                      {classMetric.precision}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(classMetric.rawPrecision)}`}
                      style={{ width: `${classMetric.rawPrecision * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Capacidad de evitar falsos positivos
                  </p>
                </div>

                {/* Recall */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Recall</span>
                    <span className={`text-sm font-semibold ${getMetricColor(classMetric.rawRecall)}`}>
                      {classMetric.recall}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(classMetric.rawRecall)}`}
                      style={{ width: `${classMetric.rawRecall * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Capacidad de encontrar todos los casos positivos
                  </p>
                </div>

                {/* F1-Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">F1-Score</span>
                    <span className={`text-sm font-semibold ${getMetricColor(classMetric.rawF1)}`}>
                      {classMetric.f1}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(classMetric.rawF1)}`}
                      style={{ width: `${classMetric.rawF1 * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Media armónica de precisión y recall
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interpretación de Métricas */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <BarChart3 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-blue-800 mb-2">Interpretación de Métricas</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <h5 className="font-semibold mb-1">Precisión</h5>
                <p>Proporción de predicciones positivas que fueron correctas. Alta precisión significa pocos falsos positivos.</p>
              </div>
              <div>
                <h5 className="font-semibold mb-1">Recall (Sensibilidad)</h5>
                <p>Proporción de casos positivos reales que fueron identificados correctamente.</p>
              </div>
              <div>
                <h5 className="font-semibold mb-1">F1-Score</h5>
                <p>Balance entre precisión y recall. Es útil cuando las clases están desbalanceadas.</p>
              </div>
              <div>
                <h5 className="font-semibold mb-1">Precisión General</h5>
                <p>Porcentaje total de predicciones correctas sobre el total de predicciones.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Escala de Rendimiento */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Escala de Rendimiento</h4>
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-700">Excelente (≥90%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-gray-700">Bueno (80-89%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-gray-700">Necesita Mejora (&lt;80%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

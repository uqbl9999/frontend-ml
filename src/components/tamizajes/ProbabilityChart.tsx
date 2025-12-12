import React from 'react';
import { BarChart3 } from 'lucide-react';
import type { PredictionResponse } from '../../services/imageAnalysisService';

interface ProbabilityChartProps {
  prediction: PredictionResponse;
}

export const ProbabilityChart: React.FC<ProbabilityChartProps> = ({ prediction }) => {
  const getClassColor = (className: string) => {
    switch (className) {
      case 'NORMAL':
        return 'bg-green-500';
      case 'COVID19':
        return 'bg-red-500';
      case 'PNEUMONIA':
        return 'bg-orange-500';
      case 'TUBERCULOSIS':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getClassTextColor = (className: string) => {
    switch (className) {
      case 'NORMAL':
        return 'text-green-700';
      case 'COVID19':
        return 'text-red-700';
      case 'PNEUMONIA':
        return 'text-orange-700';
      case 'TUBERCULOSIS':
        return 'text-purple-700';
      default:
        return 'text-gray-700';
    }
  };

  const getClassBorderColor = (className: string) => {
    switch (className) {
      case 'NORMAL':
        return 'border-green-200';
      case 'COVID19':
        return 'border-red-200';
      case 'PNEUMONIA':
        return 'border-orange-200';
      case 'TUBERCULOSIS':
        return 'border-purple-200';
      default:
        return 'border-gray-200';
    }
  };

  const sortedProbabilities = Object.entries(prediction.all_probabilities)
    .sort(([, a], [, b]) => b - a);

  const maxProbability = Math.max(...Object.values(prediction.all_probabilities));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <BarChart3 className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Distribución de Probabilidades</h3>
      </div>

      <div className="space-y-4">
        {sortedProbabilities.map(([className, probability]) => {
          const percentage = (probability * 100);
          const isPredicted = className === prediction.predicted_class;
          
          return (
            <div key={className} className={`p-3 rounded-lg border-2 ${getClassBorderColor(className)} ${isPredicted ? 'bg-opacity-10' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`font-medium ${getClassTextColor(className)}`}>
                    {className}
                  </span>
                  {isPredicted && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                      Predicción
                    </span>
                  )}
                </div>
                <span className={`text-sm font-semibold ${getClassTextColor(className)}`}>
                  {percentage.toFixed(2)}%
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${getClassColor(className)}`}
                  style={{ 
                    width: `${(probability / maxProbability) * 100}%`,
                    opacity: isPredicted ? 1 : 0.7
                  }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                <span>Probabilidad</span>
                <span>{probability.toFixed(4)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumen estadístico */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Resumen del Análisis</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Clase predicha:</span>
            <span className={`ml-2 font-semibold ${getClassTextColor(prediction.predicted_class)}`}>
              {prediction.predicted_class}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Confianza:</span>
            <span className="ml-2 font-semibold">
              {(prediction.confidence * 100).toFixed(2)}%
            </span>
          </div>
          <div>
            <span className="text-gray-600">Total clases:</span>
            <span className="ml-2 font-semibold">
              {Object.keys(prediction.all_probabilities).length}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Diferencia máx:</span>
            <span className="ml-2 font-semibold">
              {((prediction.confidence - sortedProbabilities[1][1]) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* Leyenda */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h5 className="text-xs font-semibold text-blue-800 mb-2">LEYENDA DE CLASES</h5>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-700">NORMAL: Sin hallazgos patológicos</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-700">COVID19: Neumonía viral SARS-CoV-2</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-gray-700">PNEUMONIA: Infección pulmonar</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span className="text-gray-700">TUBERCULOSIS: Infección por M. tuberculosis</span>
          </div>
        </div>
      </div>
    </div>
  );
};
 

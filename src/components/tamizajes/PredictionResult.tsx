import React from 'react';
import { AlertCircle, CheckCircle, XCircle, Activity } from 'lucide-react';
import type { PredictionResponse } from '../../services/imageAnalysisService';

interface PredictionResultProps {
  prediction: PredictionResponse;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({ prediction }) => {
  const getClassColor = (className: string) => {
    switch (className) {
      case 'NORMAL':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'COVID19':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'PNEUMONIA':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'TUBERCULOSIS':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getClassIcon = (className: string) => {
    switch (className) {
      case 'NORMAL':
        return <CheckCircle className="w-6 h-6" />;
      case 'COVID19':
        return <XCircle className="w-6 h-6" />;
      case 'PNEUMONIA':
        return <AlertCircle className="w-6 h-6" />;
      case 'TUBERCULOSIS':
        return <Activity className="w-6 h-6" />;
      default:
        return <AlertCircle className="w-6 h-6" />;
    }
  };

  const getConfidenceLevel = (confidence: number) => {
    if (confidence >= 0.9) return { level: 'Alta', color: 'text-green-600' };
    if (confidence >= 0.7) return { level: 'Media', color: 'text-yellow-600' };
    return { level: 'Baja', color: 'text-red-600' };
  };

  const confidenceInfo = getConfidenceLevel(prediction.confidence);

  return (
    <div className={`p-6 rounded-lg border-2 ${getClassColor(prediction.predicted_class)}`}>
      <div className="flex items-center space-x-3 mb-4">
        {getClassIcon(prediction.predicted_class)}
        <div>
          <h2 className="text-2xl font-bold">
            Diagnóstico: {prediction.predicted_class}
          </h2>
          <p className="text-sm opacity-75">
            {prediction.interpretation}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Confianza:</span>
            <span className={`text-sm font-semibold ${confidenceInfo.color}`}>
              {(prediction.confidence * 100).toFixed(1)}% ({confidenceInfo.level})
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Tiempo de procesamiento:</span>
            <span className="text-sm">
              {prediction.metadata.processing_time_ms.toFixed(0)}ms
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Dimensiones:</span>
            <span className="text-sm">
              {prediction.metadata.image_size[0]} × {prediction.metadata.image_size[1]}px
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Todas las probabilidades:</h4>
          {Object.entries(prediction.all_probabilities).map(([className, probability]) => (
            <div key={className} className="flex justify-between items-center text-xs">
              <span className="capitalize">{className.toLowerCase()}:</span>
              <span className="font-mono">
                {(probability * 100).toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

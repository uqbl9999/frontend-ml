import React from 'react';
import { Brain, Layers, Cpu, Database } from 'lucide-react';
import type { ModelInfo } from '../../services/imageAnalysisService';

interface ModelStatsProps {
  modelInfo: ModelInfo;
}

export const ModelStats: React.FC<ModelStatsProps> = ({ modelInfo }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const stats = [
    {
      icon: <Layers className="w-6 h-6 text-blue-600" />,
      label: 'Capas',
      value: modelInfo.architecture.layers.toString(),
      description: 'Total de capas en la red neuronal'
    },
    {
      icon: <Database className="w-6 h-6 text-green-600" />,
      label: 'Parámetros Entrenables',
      value: formatNumber(modelInfo.architecture.trainable_params),
      description: 'Parámetros que se actualizan durante el entrenamiento'
    },
    {
      icon: <Cpu className="w-6 h-6 text-purple-600" />,
      label: 'Parámetros Totales',
      value: formatNumber(modelInfo.architecture.total_params),
      description: 'Total de parámetros en el modelo'
    },
    {
      icon: <Brain className="w-6 h-6 text-orange-600" />,
      label: 'Clases de Salida',
      value: modelInfo.num_classes.toString(),
      description: 'Número de clases que puede clasificar'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Arquitectura del Modelo</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0">
              {stat.icon}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-700">{stat.label}</h4>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Información del Framework */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-800 mb-3">DETALLES TÉCNICOS</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-blue-700 font-medium">Framework:</span>
            <span className="ml-2 text-blue-800">{modelInfo.framework}</span>
          </div>
          <div>
            <span className="text-blue-700 font-medium">Tipo:</span>
            <span className="ml-2 text-blue-800">{modelInfo.model_type}</span>
          </div>
          <div>
            <span className="text-blue-700 font-medium">Forma de Entrada:</span>
            <span className="ml-2 text-blue-800">
              {modelInfo.input_shape.join(' × ')} × {modelInfo.input_shape[2]}
            </span>
          </div>
          <div>
            <span className="text-blue-700 font-medium">Clases:</span>
            <span className="ml-2 text-blue-800">{modelInfo.classes.join(', ')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

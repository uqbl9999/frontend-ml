import React from 'react';
import { Stethoscope, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import type { PredictionResponse } from '../../services/imageAnalysisService';

interface ClinicalExplanationProps {
  prediction: PredictionResponse;
}

export const ClinicalExplanation: React.FC<ClinicalExplanationProps> = ({ prediction }) => {
  const getClassSeverity = (className: string) => {
    switch (className) {
      case 'NORMAL':
        return { level: 'success', icon: <CheckCircle className="w-5 h-5 text-green-600" />, color: 'green' };
      case 'COVID19':
        return { level: 'error', icon: <AlertTriangle className="w-5 h-5 text-red-600" />, color: 'red' };
      case 'PNEUMONIA':
        return { level: 'warning', icon: <AlertTriangle className="w-5 h-5 text-orange-600" />, color: 'orange' };
      case 'TUBERCULOSIS':
        return { level: 'error', icon: <AlertTriangle className="w-5 h-5 text-purple-600" />, color: 'purple' };
      default:
        return { level: 'info', icon: <Info className="w-5 h-5 text-blue-600" />, color: 'blue' };
    }
  };

  const severity = getClassSeverity(prediction.predicted_class);

  return (
    <div className="space-y-6">
      {/* Contexto Clínico */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Stethoscope className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Contexto Clínico</h3>
        </div>
        <div className="flex items-start space-x-3">
          {severity.icon}
          <p className="text-gray-700 leading-relaxed">
            {prediction.explicacion.contexto_clinico}
          </p>
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-6 h-6 rounded-full bg-${severity.color}-100 flex items-center justify-center`}>
            <span className="text-xs font-bold text-${severity.color}-600">!</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Recomendaciones Médicas</h3>
        </div>
        <ul className="space-y-3">
          {prediction.explicacion.recomendaciones.map((recomendacion, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className={`w-2 h-2 bg-${severity.color}-500 rounded-full mt-2 flex-shrink-0`}></div>
              <span className="text-gray-700">{recomendacion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Consideraciones */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Info className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Consideraciones Importantes</h3>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <ul className="space-y-2">
            {prediction.explicacion.consideraciones.map((consideracion, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-blue-800">{consideracion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Advertencia de IA */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-yellow-800 mb-1">
              Importante: Herramienta de Apoyo Diagnóstico
            </h4>
            <p className="text-sm text-yellow-700">
              Esta predicción es generada por inteligencia artificial y debe ser validada por un profesional médico calificado. 
              No reemplace el juicio clínico y la evaluación profesional.
            </p>
          </div>
        </div>
      </div>

      {/* Métricas de confianza */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Nivel de Confianza del Modelo</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Predicción principal:</span>
            <span className="font-semibold">
              {(prediction.confidence * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                prediction.confidence >= 0.9 ? 'bg-green-500' :
                prediction.confidence >= 0.7 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${prediction.confidence * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">
            {prediction.confidence >= 0.9 ? 'Alta confianza' :
             prediction.confidence >= 0.7 ? 'Confianza media' : 'Baja confianza'}
          </p>
        </div>
      </div>
    </div>
  );
};

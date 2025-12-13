import React from 'react';
import { Info, CheckCircle, AlertTriangle, Activity } from 'lucide-react';
import type { ModelClass } from '../../services/imageAnalysisService';

interface ClassDescriptionsProps {
  classes: ModelClass[];
}

export const ClassDescriptions: React.FC<ClassDescriptionsProps> = ({ classes }) => {
  const getClassIcon = (className: string) => {
    switch (className) {
      case 'NORMAL':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'COVID19':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'PNEUMONIA':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'TUBERCULOSIS':
        return <Activity className="w-5 h-5 text-purple-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getClassColor = (className: string) => {
    switch (className) {
      case 'NORMAL':
        return 'border-green-200 bg-green-50';
      case 'COVID19':
        return 'border-red-200 bg-red-50';
      case 'PNEUMONIA':
        return 'border-orange-200 bg-orange-50';
      case 'TUBERCULOSIS':
        return 'border-purple-200 bg-purple-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getClassHeaderColor = (className: string) => {
    switch (className) {
      case 'NORMAL':
        return 'text-green-800';
      case 'COVID19':
        return 'text-red-800';
      case 'PNEUMONIA':
        return 'text-orange-800';
      case 'TUBERCULOSIS':
        return 'text-purple-800';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Info className="w-6 h-6 text-indigo-600" />
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Clases de Diagnóstico</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {classes.map((modelClass, index) => (
          <div key={index} className={`p-4 rounded-lg border-2 ${getClassColor(modelClass.class_name)}`}>
            <div className="flex items-start space-x-3 mb-3">
              {getClassIcon(modelClass.class_name)}
              <h4 className={`font-semibold ${getClassHeaderColor(modelClass.class_name)}`}>
                {modelClass.class_name}
              </h4>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {modelClass.description}
            </p>
          </div>
        ))}
      </div>

      {/* Información adicional */}
      <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg dark:bg-indigo-500/10 dark:border-indigo-500/30">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-indigo-800 dark:text-indigo-300 mb-2">
              Sobre las Clases de Diagnóstico
            </h4>
            <p className="text-sm text-indigo-700 dark:text-indigo-200">
              El modelo está entrenado para identificar cuatro condiciones principales en radiografías de tórax. 
              Cada clase representa un patrón radiológico característico que ayuda en el diagnóstico diferencial 
              de enfermedades respiratorias.
            </p>
          </div>
        </div>
      </div>

      {/* Notas clínicas */}
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
            <span className="text-yellow-600 font-bold text-sm">!</span>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-yellow-800 mb-2">
              Importante para el Diagnóstico
            </h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Los resultados deben ser interpretados por un profesional médico calificado</li>
              <li>• La predicción es una herramienta de apoyo, no un diagnóstico definitivo</li>
              <li>• Se requieren pruebas adicionales para confirmar el diagnóstico</li>
              <li>• Los hallazgos deben correlacionarse con la evaluación clínica del paciente</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

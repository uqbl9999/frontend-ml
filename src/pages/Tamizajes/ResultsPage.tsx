import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Printer, Eye, FileText } from 'lucide-react';
import { PredictionResult } from '../../components/tamizajes/PredictionResult';
import { ClinicalExplanation } from '../../components/tamizajes/ClinicalExplanation';
import { ProbabilityChart } from '../../components/tamizajes/ProbabilityChart';
import { ImagePreview } from '../../components/tamizajes/ImagePreview';
import type { PredictionResponse } from '../../services/imageAnalysisService';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

interface LocationState {
  prediction: PredictionResponse;
  imageFile: File;
}

export const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showImagePreview, setShowImagePreview] = useState(false);
  
  const state = location.state as LocationState;
  
  if (!state || !state.prediction) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No hay resultados disponibles</h2>
          <p className="text-gray-600 mb-4">Por favor, analiza una imagen primero.</p>
          <button
            onClick={() => navigate('/tamizajes-imagenes')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Volver al análisis
          </button>
        </div>
      </div>
    );
  }

  const { prediction, imageFile } = state;

  const handleDownloadReport = () => {
    // Crear un reporte simple en formato de texto
    const report = `
REPORTE DE ANÁLISIS DE RAYOS X - ${new Date().toLocaleDateString()}
================================================================

DIAGNÓSTICO: ${prediction.predicted_class}
CONFIANZA: ${(prediction.confidence * 100).toFixed(1)}%

CONTEXTO CLÍNICO:
${prediction.explicacion.contexto_clinico}

RECOMENDACIONES:
${prediction.explicacion.recomendaciones.map(rec => `- ${rec}`).join('\n')}

PROBABILIDADES:
${Object.entries(prediction.all_probabilities).map(([clase, prob]) => 
  `- ${clase}: ${(prob * 100).toFixed(2)}%`
).join('\n')}

TIEMPO DE PROCESAMIENTO: ${prediction.metadata.processing_time_ms.toFixed(0)}ms
ARCHIVO: ${prediction.metadata.filename}

================================================================
NOTA: Este análisis fue generado por inteligencia artificial y debe ser validado por un profesional médico.
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte_rayosx_${prediction.predicted_class}_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Análisis Rayos X - ${prediction.predicted_class}`,
          text: `Diagnóstico: ${prediction.predicted_class} (${(prediction.confidence * 100).toFixed(1)}% de confianza). ${prediction.interpretation}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error al compartir:', err);
      }
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(
        `Análisis Rayos X - ${prediction.predicted_class}\n` +
        `Confianza: ${(prediction.confidence * 100).toFixed(1)}%\n` +
        `Interpretación: ${prediction.interpretation}\n` +
        `Más detalles: ${window.location.href}`
      );
      alert('Resumen copiado al portapapeles');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => navigate('/tamizajes-imagenes')}
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al análisis
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setShowImagePreview(true)}>
              <Eye className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">Ver imagen</span>
            </Button>
            <Button variant="outline" onClick={handleDownloadReport}>
              <Download className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">Descargar</span>
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">Compartir</span>
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">Imprimir</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <PredictionResult prediction={prediction} />
          </Card>
          <Card className="p-6">
            <ProbabilityChart prediction={prediction} />
          </Card>
        </div>

        <Card className="mb-8 p-6">
          <ClinicalExplanation prediction={prediction} />
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-6 h-6 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Información Técnica</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Archivo</h4>
              <p className="text-sm text-gray-600">{prediction.metadata.filename}</p>
              <p className="text-xs text-gray-500">
                {prediction.metadata.image_size[0]} × {prediction.metadata.image_size[1]}px
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Procesamiento</h4>
              <p className="text-sm text-gray-600">
                {prediction.metadata.processing_time_ms.toFixed(0)}ms
              </p>
              <p className="text-xs text-gray-500">Tiempo de análisis</p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Fecha</h4>
              <p className="text-sm text-gray-600">
                {new Date().toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500">
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {showImagePreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-full overflow-auto">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Vista previa de la imagen</h3>
              <button
                onClick={() => setShowImagePreview(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <ImagePreview
                imageFile={imageFile}
                onRemove={() => setShowImagePreview(false)}
                disabled={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

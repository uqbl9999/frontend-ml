import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Brain, Image as ImageIcon } from 'lucide-react';
import { ImageUploader } from '../../components/tamizajes/ImageUploader';
import { ImagePreview } from '../../components/tamizajes/ImagePreview';
import { LoadingSpinner, FullScreenLoader, ButtonLoader } from '../../components/tamizajes/LoadingSpinner';
import { imageAnalysisService } from '../../services/imageAnalysisService';

export const ImageUploadPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setError(null);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setError(null);
  };

  const handleAnalyzeImage = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);

    try {
      const prediction = await imageAnalysisService.predictImage(selectedImage);
      
      // Navegar a la página de resultados con los datos de la predicción
      navigate('/tamizajes-imagenes/resultados', { 
        state: { 
          prediction,
          imageFile: selectedImage
        } 
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al analizar la imagen');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Análisis de Rayos X</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sistema de detección asistida por inteligencia artificial para análisis de radiografías torácicas
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-3 mb-4">
                <ImageIcon className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Cargar Imagen</h2>
              </div>
              
              <ImageUploader
                onImageSelect={handleImageSelect}
                onImageRemove={handleImageRemove}
                selectedImage={selectedImage}
                disabled={isLoading}
              />

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <ButtonLoader
                isLoading={isLoading}
                onClick={handleAnalyzeImage}
                disabled={!selectedImage || isLoading}
                loadingText="Analizando..."
                className="flex-1"
              >
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>Analizar Imagen</span>
                </div>
              </ButtonLoader>

              <button
                onClick={() => navigate('/tamizajes-imagenes/modelo-info')}
                disabled={isLoading}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Ver Info del Modelo
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            {selectedImage ? (
              <ImagePreview
                imageFile={selectedImage}
                onRemove={handleImageRemove}
                disabled={isLoading}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Vista previa de imagen</h3>
                    <p className="text-gray-500">
                      Selecciona una imagen para ver su vista previa aquí
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Information Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">INFORMACIÓN IMPORTANTE</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Formatos aceptados: JPG, PNG</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Tamaño máximo: 10MB</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>El análisis puede tomar 30-60 segundos</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Esta herramienta es de apoyo diagnóstico</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Loader */}
      <FullScreenLoader
        isLoading={isLoading}
        message="Analizando imagen con inteligencia artificial..."
        submessage="Por favor espera mientras procesamos la radiografía"
        variant="analysis"
      />
    </div>
  );
};
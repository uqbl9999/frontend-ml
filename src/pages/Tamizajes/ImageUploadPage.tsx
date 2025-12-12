import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Brain, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { ImageUploader } from '../../components/tamizajes/ImageUploader';
import { ImagePreview } from '../../components/tamizajes/ImagePreview';
import { FullScreenLoader, ButtonLoader } from '../../components/tamizajes/LoadingSpinner';
import { imageAnalysisService } from '../../services/imageAnalysisService';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

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
    <div className="py-8">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Button>
        </div>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Brain className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-semibold">Análisis de Rayos X</h1>
          </div>
          <p className="text-sm text-slate-600">
            Sistema de detección asistida por inteligencia artificial para análisis de radiografías torácicas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-indigo-600" />
                <CardTitle>Cargar Imagen</CardTitle>
              </div>
              <CardDescription>Arrastra o selecciona una imagen de rayos X</CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUploader
                onImageSelect={handleImageSelect}
                onImageRemove={handleImageRemove}
                selectedImage={selectedImage}
                disabled={isLoading}
              />
              {error && (
                <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                  {error}
                </div>
              )}
              <div className="mt-4 flex gap-3">
                <ButtonLoader
                  isLoading={isLoading}
                  onClick={handleAnalyzeImage}
                  disabled={!selectedImage || isLoading}
                  loadingText="Analizando..."
                  className="flex-1"
                >
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    <span>Analizar Imagen</span>
                  </div>
                </ButtonLoader>
                <Button
                  variant="outline"
                  onClick={() => navigate('/tamizajes-imagenes/modelo-info')}
                  disabled={isLoading}
                >
                  Ver Info del Modelo
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-indigo-600" />
                <CardTitle>Vista previa de imagen</CardTitle>
              </div>
              <CardDescription>Selecciona una imagen para ver su vista previa</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedImage ? (
                <ImagePreview
                  imageFile={selectedImage}
                  onRemove={handleImageRemove}
                  disabled={isLoading}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                    <ImageIcon className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="mt-3 text-sm text-slate-500">
                    Selecciona una imagen para ver su vista previa aquí
                  </p>
                </div>
              )}
              <div className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
                <h3 className="mb-2 text-sm font-semibold text-indigo-800">Información importante</h3>
                <ul className="space-y-2 text-sm text-indigo-700">
                  <li className="flex items-start gap-2"><span>•</span><span>Formatos aceptados: JPG, PNG</span></li>
                  <li className="flex items-start gap-2"><span>•</span><span>Tamaño máximo: 10MB</span></li>
                  <li className="flex items-start gap-2"><span>•</span><span>El análisis puede tomar 30-60 segundos</span></li>
                  <li className="flex items-start gap-2"><span>•</span><span>Esta herramienta es de apoyo diagnóstico</span></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <FullScreenLoader
        isLoading={isLoading}
        message="Analizando imagen con inteligencia artificial..."
        submessage="Por favor espera mientras procesamos la radiografía"
        variant="analysis"
      />
    </div>
  );
};

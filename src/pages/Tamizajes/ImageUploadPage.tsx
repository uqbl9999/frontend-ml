import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Brain, Image as ImageIcon, ArrowLeft, AlertTriangle, Info, CheckCircle2, XCircle } from 'lucide-react';
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
          <p className="text-sm text-slate-600 mb-4">
            Sistema de detección asistida por inteligencia artificial para análisis de radiografías torácicas
          </p>
          
          <div className="mx-auto max-w-2xl mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-amber-800 mb-2">
                  ⚠️ Importante: Solo radiografías de tórax
                </h4>
                <p className="text-sm text-amber-700 mb-3">
                  Este sistema está diseñado <strong>exclusivamente</strong> para analizar <strong>radiografías torácicas (de pecho)</strong>. 
                  No suba imágenes de animales, objetos, paisajes u otras imágenes que no sean radiografías médicas.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-amber-700">
                      <p className="font-medium">✓ Acepta:</p>
                      <ul className="list-disc list-inside mt-1 space-y-0.5">
                        <li>Radiografías de tórax</li>
                        <li>Imágenes en escala de grises</li>
                        <li>Estudios médicos de pecho</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-amber-700">
                      <p className="font-medium">✗ No acepta:</p>
                      <ul className="list-disc list-inside mt-1 space-y-0.5">
                        <li>Animales, mascotas, objetos</li>
                        <li>Imágenes con colores vivos</li>
                        <li>Fotografías comunes</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-amber-200">
                  <p className="text-xs text-amber-600">
                    <strong>¿Cómo identificar una radiografía?</strong> Imagen en escala de grises (blanco y negro) que muestra la estructura del tórax (costillas, pulmones, corazón), formato rectangular típico de estudios médicos.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
              <div className="mb-4 rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-sky-50 p-3 sm:p-4 dark:border-indigo-800 dark:from-indigo-950/30 dark:to-sky-950/30">
                <h4 className="mb-3 text-xs font-semibold text-indigo-800 dark:text-indigo-200 flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5" />
                  Pasos para analizar una radiografía
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-md dark:bg-indigo-500">
                      1
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-100">Selecciona imagen</p>
                      <p className="mt-0.5 text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">Arrastra o selecciona una radiografía de tórax válida</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-md dark:bg-indigo-500">
                      2
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-100">Verifica preview</p>
                      <p className="mt-0.5 text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">Confirma que es una radiografía válida</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-md dark:bg-indigo-500">
                      3
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-100">Analiza con IA</p>
                      <p className="mt-0.5 text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">Haz clic en "Analizar Imagen" y espera 30-60 segundos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-md dark:bg-indigo-500">
                      4
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-100">Revisa resultados</p>
                      <p className="mt-0.5 text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">Analiza condición detectada, probabilidades y explicación</p>
                    </div>
                  </div>
                </div>
              </div>
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
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
                  <h3 className="mb-3 text-sm font-semibold text-indigo-800 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Información importante
                  </h3>
                  <ul className="space-y-2.5 text-sm text-indigo-700">
                    <li className="flex items-start gap-2">
                      <span className="font-medium text-indigo-600">•</span>
                      <span><strong>Formatos aceptados:</strong> JPG, PNG (solo radiografías de tórax)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium text-indigo-600">•</span>
                      <span><strong>Tamaño máximo:</strong> 10MB</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium text-indigo-600">•</span>
                      <span><strong>Tiempo de análisis:</strong> 30-60 segundos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium text-indigo-600">•</span>
                      <span><strong>Condiciones detectadas:</strong> COVID-19, Neumonía, Tuberculosis, Normal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium text-indigo-600">•</span>
                      <span><strong>Propósito:</strong> Herramienta de apoyo diagnóstico - requiere validación médica profesional</span>
                    </li>
                  </ul>
                </div>

                {/* Proceso paso a paso */}
                <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                  <h3 className="mb-3 text-sm font-semibold text-sky-800 flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Proceso de análisis
                  </h3>
                  <ol className="space-y-2 text-xs text-sky-700">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-sky-600">1.</span>
                      <span>Selecciona o arrastra una <strong>radiografía de tórax</strong> válida</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-sky-600">2.</span>
                      <span>Verifica la vista previa para confirmar que es una radiografía</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-sky-600">3.</span>
                      <span>Haz clic en "Analizar Imagen" para procesar con inteligencia artificial</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-sky-600">4.</span>
                      <span>Revisa los resultados: probabilidades, explicación clínica y recomendaciones</span>
                    </li>
                  </ol>
                </div>
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

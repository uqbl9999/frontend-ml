import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

export const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="py-8">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </div>

        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Shield className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-semibold">Políticas de Privacidad y Seguridad</h1>
          </div>
          <p className="text-sm text-slate-600">
            MedAI Perú - Protección de Datos y Seguridad de la Información
          </p>
          <Badge variant="secondary" className="mt-3">
            Última actualización: {new Date().toLocaleDateString('es-PE')}
          </Badge>
        </div>

        <div className="space-y-6">
          {/* Introducción */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-600" />
                Introducción
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                MedAI Perú se compromete a proteger la privacidad y seguridad de los datos de los usuarios. 
                Esta política describe cómo recopilamos, utilizamos, almacenamos y protegemos la información 
                en nuestro sistema de predicción de tamizajes de salud mental y análisis de imágenes médicas.
              </p>
            </CardContent>
          </Card>

          {/* Datos que recopilamos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-indigo-600" />
                Datos que Recopilamos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Datos de Predicción de Tamizajes
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Información demográfica: departamento, provincia, etapa de vida, sexo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Tipo de tamizaje y mes de predicción</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Resultados de predicción generados (tasas de positividad estimadas)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Datos de Análisis de Imágenes
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Imágenes de radiografías torácicas subidas por el usuario</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Resultados de análisis (condiciones detectadas, probabilidades)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Metadatos de las imágenes (tamaño, formato, fecha de carga)</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950/20">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-700 dark:text-amber-300">
                      <strong>Importante:</strong> No recopilamos información personal identificable (nombres, 
                      DNI, números de teléfono, direcciones, etc.). Solo procesamos datos anonimizados 
                      necesarios para las predicciones y análisis.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Uso de datos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                Uso de los Datos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                Utilizamos los datos recopilados exclusivamente para:
              </p>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Generar predicciones de tasas de positividad en tamizajes de salud mental</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Analizar radiografías torácicas para detección de condiciones respiratorias</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Mejorar la precisión de los modelos mediante análisis de patrones</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Proporcionar estadísticas y visualizaciones para análisis exploratorio</span>
                </li>
              </ul>
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-950/20">
                <p className="text-xs text-red-700 dark:text-red-300">
                  <strong>No utilizamos los datos para:</strong> Marketing, publicidad, venta a terceros, 
                  o cualquier propósito comercial. Los datos son estrictamente para uso académico y de investigación.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Almacenamiento y seguridad */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-indigo-600" />
                Almacenamiento y Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Medidas de Seguridad Implementadas
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span><strong>Datos anonimizados:</strong> No se almacenan datos personales identificables</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span><strong>Comunicación segura:</strong> Todas las comunicaciones utilizan protocolos HTTPS</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span><strong>Validación de entrada:</strong> Todas las entradas son validadas antes del procesamiento</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span><strong>Procesamiento temporal:</strong> Las imágenes se procesan y no se almacenan permanentemente</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span><strong>Acceso restringido:</strong> Solo personal autorizado tiene acceso a los datos</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3 dark:border-indigo-800 dark:bg-indigo-950/20">
                  <p className="text-xs text-indigo-700 dark:text-indigo-300">
                    <strong>Retención de datos:</strong> Los datos de predicción se almacenan temporalmente 
                    para análisis estadísticos. Las imágenes de radiografías se procesan en tiempo real y 
                    no se almacenan en nuestros servidores después del análisis.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compartir datos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-indigo-600" />
                Compartir Datos con Terceros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                <strong>No compartimos datos con terceros.</strong> Todos los datos permanecen dentro de 
                nuestro sistema y solo son utilizados para los fines académicos y de investigación del proyecto.
              </p>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950/20">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  <strong>Excepción:</strong> En caso de requerimientos legales o académicos, los datos 
                  anonimizados pueden ser utilizados para publicaciones científicas, siempre manteniendo 
                  la privacidad y anonimato de los usuarios.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Derechos del usuario */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                Derechos del Usuario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                Los usuarios tienen derecho a:
              </p>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span><strong>Acceso:</strong> Solicitar información sobre qué datos se han procesado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span><strong>Rectificación:</strong> Corregir datos incorrectos si aplica</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span><strong>Eliminación:</strong> Solicitar la eliminación de datos procesados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span><strong>Oposición:</strong> Oponerse al procesamiento de sus datos</span>
                </li>
              </ul>
              <p className="mt-4 text-xs text-slate-600 dark:text-slate-400">
                Para ejercer estos derechos, contacte al equipo del proyecto a través de los canales 
                oficiales de la Universidad Nacional Mayor de San Marcos (UNMSM).
              </p>
            </CardContent>
          </Card>

          {/* Limitaciones y advertencias */}
          <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                Limitaciones y Advertencias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-amber-700 dark:text-amber-300">
                <p>
                  <strong>1. Herramienta de Apoyo:</strong> Este sistema es una herramienta de apoyo 
                  diagnóstico y no reemplaza la evaluación médica profesional.
                </p>
                <p>
                  <strong>2. Precisión:</strong> Las predicciones y análisis son estimaciones basadas 
                  en modelos de machine learning y pueden tener márgenes de error.
                </p>
                <p>
                  <strong>3. Uso Académico:</strong> Este sistema es parte de un proyecto académico 
                  del curso de Machine Learning & Big Data de la UNMSM.
                </p>
                <p>
                  <strong>4. No es un Sistema Clínico:</strong> No debe utilizarse como único medio 
                  para tomar decisiones médicas críticas.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contacto 
          <Card>
            <CardHeader>
              <CardTitle>Contacto</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                Para consultas sobre privacidad, seguridad de datos o ejercer sus derechos, puede contactar:
              </p>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Grupo 1 - Curso de Machine Learning & Big Data
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Universidad Nacional Mayor de San Marcos (UNMSM)
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                  Proyecto: MedAI Perú - Sistema de Predicción de Tamizajes y Análisis de Imágenes Médicas
                </p>
              </div>
            </CardContent>
          </Card>
          */}

          {/* Actualizaciones */}
          <Card>
            <CardHeader>
              <CardTitle>Actualizaciones de la Política</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Nos reservamos el derecho de actualizar esta política de privacidad. Las actualizaciones 
                se reflejarán en esta página con la fecha de última modificación. Se recomienda revisar 
                periódicamente esta política para estar informado sobre cómo protegemos sus datos.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-center">
          <Button onClick={() => navigate(-1)} variant="outline">
            Volver
          </Button>
        </div>
      </div>
    </div>
  );
};


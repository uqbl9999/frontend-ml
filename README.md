# Mental Health Screening Prediction Frontend

Interfaz web moderna para el Sistema de Predicción de Tasas de Positividad de Tamizajes de Salud Mental en Perú. Desarrollada con React, TypeScript y Vite, proporciona una experiencia de usuario intuitiva para interactuar con modelos de Machine Learning y visualizar análisis de datos.

## 📋 Descripción del Proyecto

Este frontend es la interfaz de usuario del sistema de predicción de tasas de positividad de tamizajes de salud mental. Permite a los usuarios realizar predicciones mediante formularios interactivos, visualizar análisis exploratorios de datos históricos, consultar métricas del modelo y analizar imágenes de rayos X mediante inteligencia artificial.

### Características Principales

- **Predicción Interactiva**: Formularios intuitivos para generar predicciones con explicaciones de IA
- **Análisis Exploratorio**: Visualizaciones interactivas de estadísticas descriptivas y distribuciones
- **Métricas del Modelo**: Dashboard con feature importance y métricas de rendimiento
- **Análisis de Imágenes**: Sistema de detección por rayos X con explicaciones clínicas
- **Diseño Moderno**: Interfaz responsive con modo claro/oscuro y componentes UI reutilizables
- **Visualizaciones Avanzadas**: Gráficos interactivos con Recharts (barras, heatmaps, distribuciones)
- **Navegación Intuitiva**: Sistema de tabs para acceso rápido a diferentes funcionalidades

## 🏗️ Estructura del Proyecto

```
frontend-ml/
│
├── public/                         # Archivos estáticos
│   └── vite.svg
│
├── src/                            # Código fuente
│   ├── components/                 # Componentes reutilizables
│   │   ├── layout/                 # Layout principal (Header, Footer, AppShell)
│   │   ├── navigation/             # Navegación (Tabs, ThemeToggle)
│   │   ├── tamizajes/              # Componentes para análisis de imágenes
│   │   │   ├── ImageUploader.tsx
│   │   │   ├── ImagePreview.tsx
│   │   │   ├── PredictionResult.tsx
│   │   │   ├── ProbabilityChart.tsx
│   │   │   ├── ClinicalExplanation.tsx
│   │   │   └── ModelStats.tsx
│   │   └── ui/                     # Componentes UI base (shadcn/ui)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── tabs.tsx
│   │       └── ...
│   │
│   ├── features/                   # Funcionalidades principales
│   │   ├── prediction/             # Módulo de predicción
│   │   │   ├── components/
│   │   │   │   └── PredictionPanel.tsx
│   │   │   ├── hooks/
│   │   │   │   └── usePredictionForm.ts
│   │   │   └── data/
│   │   │       └── options.ts
│   │   │
│   │   ├── exploratory-analysis/   # Análisis exploratorio
│   │   │   ├── components/
│   │   │   │   ├── ExploratoryPanel.tsx
│   │   │   │   ├── DescriptiveStats.tsx
│   │   │   │   ├── DistributionBarChart.tsx
│   │   │   │   └── HeatmapMatrix.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useExploratoryData.ts
│   │   │   └── data/
│   │   │       └── mock-charts.ts
│   │   │
│   │   └── model-metrics/          # Métricas del modelo
│   │       ├── components/
│   │       │   ├── MetricsPanel.tsx
│   │       │   └── FeatureImportanceChart.tsx
│   │       └── hooks/
│   │           └── useMetricsData.ts
│   │
│   ├── pages/                      # Páginas principales
│   │   ├── Landing/
│   │   │   └── LandingPage.tsx     # Página principal con tabs
│   │   └── Tamizajes/
│   │       ├── ImageUploadPage.tsx # Carga de imágenes de rayos X
│   │       ├── ResultsPage.tsx     # Resultados de análisis de imágenes
│   │       └── ModelInfoPage.tsx   # Información del modelo de imágenes
│   │
│   ├── lib/                        # Utilidades y configuración
│   │   ├── api.ts                  # Cliente API con endpoints del backend
│   │   └── utils.ts                # Funciones utilitarias
│   │
│   ├── services/                   # Servicios externos
│   │   └── imageAnalysisService.ts # Servicio de análisis de imágenes
│   │
│   ├── providers/                  # Context providers
│   │   ├── theme-context.tsx       # Contexto de tema (claro/oscuro)
│   │   └── ui-provider.tsx         # Provider de componentes UI
│   │
│   ├── types/                      # Tipos TypeScript
│   │   └── index.ts
│   │
│   ├── styles/                     # Estilos globales
│   │   └── theme.ts
│   │
│   ├── App.tsx                     # Componente raíz de la aplicación
│   ├── main.tsx                    # Punto de entrada
│   └── index.css                   # Estilos globales
│
├── index.html                      # HTML principal
├── package.json                    # Dependencias y scripts
├── vite.config.ts                  # Configuración de Vite
├── tsconfig.json                   # Configuración de TypeScript
└── README.md                       # Este archivo
```

## 🚀 Instalación y Configuración

### Requisitos Previos

- **Node.js** 18.0 o superior
- **npm** 9.0+ o **pnpm** 8.0+ (se recomienda pnpm)
- **Backend API** corriendo (ver [backend-ml README](https://github.com/uqbl9999/backend-ml))

### Paso 1: Clonar el Repositorio

```bash
git clone <repository-url>
cd frontend-ml
```

### Paso 2: Instalar Dependencias

Con npm:
```bash
npm install
```

Con pnpm (recomendado):
```bash
pnpm install
```

### Paso 3: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# URL del backend API (por defecto: http://localhost:8000)
VITE_API_URL=http://localhost:8000
```

**Nota**: Si el backend está corriendo en otro puerto o host, actualiza la variable `VITE_API_URL` en el archivo `.env`.

### Paso 4: Verificar que el Backend esté Corriendo

Asegúrate de que el backend API esté ejecutándose en la URL configurada. Puedes verificar con:

```bash
curl http://localhost:8000/health
```

## 🎯 Uso

### Modo Desarrollo

Inicia el servidor de desarrollo con recarga automática:

```bash
# Con npm
npm run dev

# Con pnpm
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

### Build para Producción

Genera una build optimizada para producción:

```bash
# Con npm
npm run build

# Con pnpm
pnpm build
```

Los archivos optimizados se generarán en el directorio `dist/`.

### Preview de la Build de Producción

Para previsualizar la build de producción localmente:

```bash
# Con npm
npm run preview

# Con pnpm
pnpm preview
```

### Linting

Ejecuta el linter para verificar errores de código:

```bash
# Con npm
npm run lint

# Con pnpm
pnpm lint
```

## 🗺️ Rutas Disponibles

La aplicación utiliza React Router para la navegación. Las rutas principales son:

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal (Landing) con tabs para diferentes funcionalidades |
| `/tamizajes-imagenes` | Página de carga de imágenes de rayos X |
| `/tamizajes-imagenes/resultados` | Página de resultados del análisis de imágenes |
| `/tamizajes-imagenes/modelo-info` | Información técnica del modelo de análisis de imágenes |

### Funcionalidades en la Página Principal (`/`)

La página principal incluye un sistema de tabs con las siguientes secciones:

1. **Predicción**: Formulario para generar predicciones de tasa de positividad
   - Selección de mes, departamento, provincia, sexo, etapa y tipo de tamizaje
   - Predicción con explicación de IA (XAI)
   - Visualización de resultados con interpretación del riesgo

2. **Análisis Exploratorio**: Visualizaciones de datos históricos
   - Estadísticas descriptivas (media, mediana, desviación estándar)
   - Distribución de registros por grupos de tamizaje
   - Heatmaps por tipo de tamizaje y por departamento
   - Resumen de tipos de tamizaje y departamentos

3. **Métricas del Modelo**: Dashboard de rendimiento del modelo
   - Feature importance (importancia de características)
   - Métricas de evaluación (R², MAE, RMSE, MSE)

4. **Rayos X**: Acceso rápido al módulo de análisis de imágenes

## 🎨 Tecnologías Utilizadas

### Core

- **React 19.1**: Librería de UI moderna con hooks
- **TypeScript 5.9**: Tipado estático para mayor seguridad de código
- **Vite 7.1**: Build tool rápida y moderna

### UI y Estilos

- **TailwindCSS 4.1**: Framework de utilidades CSS
- **Lucide React**: Librería de iconos moderna
- **shadcn/ui**: Componentes UI reutilizables basados en Radix UI
  - Componentes: Button, Card, Tabs, Badge, Separator, Switch

### Navegación y Estado

- **React Router DOM 7.10**: Enrutamiento cliente
- **React Hooks**: Gestión de estado local (useState, useEffect, useCallback)

### Visualización de Datos

- **Recharts 2.12**: Librería de gráficos interactivos
  - Gráficos de barras, heatmaps, distribuciones

### HTTP Client

- **Axios 1.13**: Cliente HTTP para peticiones al backend

### Utilidades

- **clsx**: Utilidad para construir nombres de clases condicionales
- **tailwind-merge**: Merge inteligente de clases de Tailwind
- **class-variance-authority**: Sistema de variantes para componentes

## 🔌 Integración con el Backend

El frontend se conecta al backend mediante el cliente API definido en `src/lib/api.ts`. Los endpoints principales incluyen:

### Endpoints de Predicción

- `POST /predict/explain` - Predicción con explicación de IA
- `POST /predict/batch` - Predicción en lote
- `POST /predict` - Predicción individual

### Endpoints de Metadatos

- `GET /metadata/departamentos` - Lista de departamentos
- `GET /metadata/provincias/{departamento}` - Provincias por departamento
- `GET /metadata/ubigeo/{dept}/{prov}` - Código ubigeo
- `GET /metadata/tamizajes` - Tipos de tamizaje
- `GET /metadata/etapas` - Grupos etarios

### Endpoints de Estadísticas

- `GET /statistics/descriptive` - Estadísticas descriptivas
- `GET /statistics/distribution` - Distribución por grupos
- `GET /statistics/heatmap/screening-type` - Heatmap por tipo de tamizaje
- `GET /statistics/heatmap/department` - Heatmap por departamento
- `GET /statistics/screening-types` - Resumen por tipo de tamizaje
- `GET /statistics/departments` - Resumen por departamento

### Endpoints del Modelo

- `GET /model/info` - Información del modelo
- `GET /model/features?top_n={n}` - Feature importance

### Endpoints de Análisis de Imágenes

- `POST /image/predict/explain` - Análisis de imagen con explicación
- `GET /image/model/info` - Información del modelo de imágenes
- `GET /image/model/classes` - Clases del modelo de imágenes
- `GET /image/model/statistics` - Estadísticas del modelo de imágenes

### Health Check

- `GET /health` - Estado del servidor

## 🔄 Manejo de Errores y Reintentos

El cliente API incluye un sistema robusto de reintentos automáticos:

- **Máximo de reintentos**: 4 intentos
- **Delay exponencial**: Base de 1500ms con backoff exponencial
- **Timeout por intento**: 45 segundos
- **Reintentos automáticos**: Para errores 5xx y 429 (rate limit)

## 🎭 Temas y Personalización

La aplicación incluye soporte para modo claro/oscuro:

- **Toggle de tema**: Disponible en el header
- **Persistencia**: La preferencia del usuario se guarda en localStorage
- **Tema por defecto**: Modo claro

Los temas están definidos en `src/styles/theme.ts` y pueden ser personalizados modificando las variables de TailwindCSS.

## 📱 Diseño Responsive

La aplicación está diseñada para ser responsive y funciona correctamente en:

- **Desktop**: Pantallas grandes (> 1024px)
- **Tablet**: Pantallas medianas (768px - 1024px)
- **Mobile**: Pantallas pequeñas (< 768px)

## 🧪 Desarrollo y Testing

### Estructura de Componentes

Los componentes siguen las siguientes convenciones:

- **Componentes funcionales**: Todos los componentes usan funciones y hooks
- **TypeScript estricto**: Tipos explícitos para props y estados
- **Composición**: Componentes pequeños y reutilizables
- **Separación de lógica**: Hooks personalizados para lógica compleja

### Agregar Nuevas Features

1. **Crear el componente** en `src/components/` o `src/features/`
2. **Definir tipos** en `src/types/index.ts` si es necesario
3. **Agregar endpoints** en `src/lib/api.ts` si requiere nuevas llamadas al backend
4. **Agregar ruta** en `src/App.tsx` si es una nueva página
5. **Actualizar navegación** si es necesario

### Ejemplo: Agregar un Nuevo Endpoint

1. Agrega el método en `src/lib/api.ts`:

```typescript
// En src/lib/api.ts
export const api = {
  // ... endpoints existentes
  
  nuevoEndpoint: (param: string) => 
    fetchJSON<{ resultado: string }>(`/nuevo-endpoint/${param}`),
};
```

2. Úsalo en tu componente o hook:

```typescript
import { api } from '@/lib/api';

const datos = await api.nuevoEndpoint('valor');
```

## 🛠️ Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo con HMR |
| `npm run build` | Genera build de producción optimizada |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Ejecuta ESLint para verificar código |

## 📝 Notas Importantes

### Variables de Entorno

- Las variables de entorno deben comenzar con `VITE_` para ser accesibles en el código
- Las variables se exponen como `import.meta.env.VITE_*`
- Nunca commits archivos `.env` con información sensible

### CORS

Asegúrate de que el backend tenga configurado CORS correctamente para permitir peticiones desde el frontend:

```python
# En el backend (FastAPI)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # URL del frontend en desarrollo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Producción

Para desplegar en producción:

1. **Build de producción**: `npm run build`
2. **Servir archivos estáticos**: Los archivos en `dist/` pueden servirse con:
   - Nginx
   - Apache
   - Servicios como Vercel, Netlify, GitHub Pages
   - O cualquier servidor de archivos estáticos

3. **Configurar variables de entorno** en tu plataforma de hosting
4. **Actualizar CORS** en el backend para incluir la URL de producción

### Performance

- **Code splitting**: Vite divide automáticamente el código en chunks
- **Tree shaking**: Elimina código no utilizado en producción
- **Optimización de assets**: Imágenes y recursos optimizados automáticamente
- **Lazy loading**: Considera usar React.lazy() para componentes grandes

## 🐛 Troubleshooting

### Error de conexión con el backend

**Problema**: `Network error: Failed to fetch`

**Solución**: 
- Verifica que el backend esté corriendo
- Revisa la URL en `.env` (debe ser `VITE_API_URL`)
- Verifica CORS en el backend
- Revisa la consola del navegador para más detalles

### Puerto ya en uso

**Problema**: `Port 5173 is already in use`

**Solución**:
```bash
# Vite usará automáticamente el siguiente puerto disponible
# O puedes especificar uno manualmente:
npm run dev -- --port 3000
```

### Dependencias desactualizadas

**Problema**: Errores de compatibilidad

**Solución**:
```bash
# Limpia node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Estilo

- Usa TypeScript estricto
- Sigue las convenciones de nombres de React (PascalCase para componentes)
- Usa ESLint y corrige los errores antes de commitear
- Documenta componentes complejos con comentarios

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos.

## 👥 Autores

Desarrollado como parte del proyecto final del curso de Machine Learning.

---

**Nota**: Este frontend requiere que el [backend API](https://github.com/uqbl9999/backend-ml) esté corriendo para funcionar correctamente. Consulta la documentación del backend para más información sobre la API.

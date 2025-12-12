import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ImagePreviewProps {
  imageFile: File;
  onRemove: () => void;
  disabled?: boolean;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageFile,
  onRemove,
  disabled = false
}) => {
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  React.useEffect(() => {
    const url = URL.createObjectURL(imageFile);
    setImageUrl(url);
    setIsLoading(true);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [imageFile]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleReset = () => {
    setScale(1);
    setRotation(0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Vista previa de imagen</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            disabled={disabled || scale <= 0.5}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Alejar"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomIn}
            disabled={disabled || scale >= 3}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Acercar"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleRotate}
            disabled={disabled}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Rotar"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            disabled={disabled}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Restablecer"
          >
            <span className="text-xs font-medium">Reset</span>
          </button>
          <button
            onClick={onRemove}
            disabled={disabled}
            className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Eliminar imagen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="relative bg-gray-50 p-4" style={{ height: '400px' }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-sm text-gray-500">Cargando imagen...</p>
            </div>
          </div>
        )}
        
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt="Radiografía"
            onLoad={handleImageLoad}
            className="max-w-full max-h-full object-contain transition-transform duration-200"
            style={{
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              display: isLoading ? 'none' : 'block'
            }}
          />
        </div>
        
        {!isLoading && (
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded-md text-sm">
            <p className="font-medium">{imageFile.name}</p>
            <p className="text-xs opacity-75">
              {(imageFile.size / 1024 / 1024).toFixed(2)} MB • 
              Escala: {Math.round(scale * 100)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
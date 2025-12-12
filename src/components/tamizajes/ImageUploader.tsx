import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
  selectedImage: File | null;
  disabled?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  onImageRemove,
  selectedImage,
  disabled = false
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onImageSelect(imageFile);
    }
  }, [onImageSelect, disabled]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const validateImageFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      alert('Por favor, selecciona una imagen JPG o PNG');
      return false;
    }

    if (file.size > maxSize) {
      alert('La imagen no debe superar los 10MB');
      return false;
    }

    return true;
  };

  const handleImageSelect = (file: File) => {
    if (validateImageFile(file)) {
      onImageSelect(file);
    }
  };

  if (selectedImage) {
    return (
      <div className="relative">
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 bg-blue-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Imagen seleccionada</h3>
            <button
              onClick={onImageRemove}
              disabled={disabled}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <ImageIcon className="w-8 h-8 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">{selectedImage.name}</p>
              <p className="text-sm text-gray-500">
                {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragOver && !disabled
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-blue-400'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center space-y-4">
        <Upload className="w-12 h-12 text-gray-400" />
        <div>
          <p className="text-lg font-medium text-gray-700">
            Arrastra o selecciona una imagen
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Formatos: JPG, PNG • Máximo: 10MB
          </p>
        </div>
        <label className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <span>Seleccionar archivo</span>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleFileSelect}
            disabled={disabled}
            className="sr-only"
          />
        </label>
      </div>
    </div>
  );
};
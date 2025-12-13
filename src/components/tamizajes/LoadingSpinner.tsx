import React from 'react';
import { Activity, Clock, Brain } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  submessage?: string;
  showProgress?: boolean;
  progress?: number;
  variant?: 'default' | 'analysis' | 'upload';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Procesando imagen...',
  submessage = 'Esto puede tomar unos segundos',
  showProgress = false,
  progress = 0,
  variant = 'default'
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'analysis':
        return <Brain className="w-8 h-8 text-indigo-600 animate-pulse" />;
      case 'upload':
        return <Activity className="w-8 h-8 text-indigo-600 animate-pulse" />;
      default:
        return (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        );
    }
  };

  const getMessage = () => {
    switch (variant) {
      case 'analysis':
        return 'Analizando imagen con IA...';
      case 'upload':
        return 'Subiendo imagen...';
      default:
        return message;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        {getIcon()}
        {variant === 'analysis' && (
          <div className="absolute -top-1 -right-1">
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-ping"></div>
          </div>
        )}
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
          {getMessage()}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {submessage}
        </p>
        
        {showProgress && (
          <div className="w-64 bg-slate-200 rounded-full h-2 mt-4 dark:bg-slate-700">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
        
        <div className="flex items-center justify-center space-x-2 mt-4 text-xs text-slate-400">
          <Clock className="w-3 h-3" />
          <span>Tiempo estimado: 30-60 segundos</span>
        </div>
      </div>
      
      {variant === 'analysis' && (
        <div className="flex space-x-2 mt-4">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      )}
    </div>
  );
};

interface FullScreenLoaderProps {
  isLoading: boolean;
  message?: string;
  submessage?: string;
  variant?: 'default' | 'analysis' | 'upload';
}

export const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({
  isLoading,
  message,
  submessage,
  variant = 'default'
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <LoadingSpinner
          message={message}
          submessage={submessage}
          variant={variant}
        />
      </div>
    </div>
  );
};

interface ButtonLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const ButtonLoader: React.FC<ButtonLoaderProps> = ({
  isLoading,
  children,
  loadingText = 'Procesando...',
  className = '',
  disabled = false,
  onClick,
  type = 'button'
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

import React from 'react';
import { LoadingStateProps } from '@/types';

const spinnerSizes = {
  sm: 'h-5 w-5 border-2',
  md: 'h-8 w-8 border-[3px]',
  lg: 'h-12 w-12 border-4',
};

const textSizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

/** Indicador de carregamento genérico, em bloco ou em tela cheia. */
export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Carregando...',
  size = 'md',
  fullScreen = false,
  className = '',
}) => {
  const content = (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-3 ${fullScreen ? '' : 'p-8'} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`animate-spin rounded-full border-primary-100 border-t-primary-600 ${spinnerSizes[size]}`}
      />
      {message ? (
        <span className={`font-medium text-neutral-600 ${textSizes[size]}`}>{message}</span>
      ) : (
        <span className="sr-only">Carregando</span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
};

import React from 'react';
import { ErrorStateProps } from '@/types';
import { Button } from '@/components/ui/Button';
import { StatusIcon } from './feedbackStyles';

const sizeClasses = {
  sm: { wrapper: 'p-6 gap-2', icon: 'h-10 w-10', svg: 'h-5 w-5', title: 'text-sm', text: 'text-xs' },
  md: { wrapper: 'p-8 gap-3', icon: 'h-14 w-14', svg: 'h-7 w-7', title: 'text-base', text: 'text-sm' },
  lg: { wrapper: 'p-12 gap-4', icon: 'h-16 w-16', svg: 'h-8 w-8', title: 'text-lg', text: 'text-base' },
};

/** Estado de falha (ex.: erro ao carregar movimentações), com opção de nova tentativa. */
export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Não foi possível carregar os dados',
  description = 'Ocorreu um erro inesperado. Tente novamente em instantes.',
  icon,
  onRetry,
  retryLabel = 'Tentar novamente',
  retrying = false,
  action,
  size = 'md',
  className = '',
}) => {
  const styles = sizeClasses[size];

  return (
    <div role="alert" className={`flex flex-col items-center justify-center text-center ${styles.wrapper} ${className}`}>
      <div
        className={`flex items-center justify-center rounded-full bg-error-50 text-error-600 ring-8 ring-error-50/50 ${styles.icon}`}
      >
        {icon ?? <StatusIcon variant="error" className={styles.svg} />}
      </div>
      <p className={`mt-2 font-semibold text-neutral-900 ${styles.title}`}>{title}</p>
      {description && <p className={`max-w-sm text-neutral-500 ${styles.text}`}>{description}</p>}
      {(onRetry || action) && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          {onRetry && (
            <Button variant="secondary" size="sm" onClick={onRetry} loading={retrying}>
              {retryLabel}
            </Button>
          )}
          {action}
        </div>
      )}
    </div>
  );
};

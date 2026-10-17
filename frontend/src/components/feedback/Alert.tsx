import React from 'react';
import { AlertProps } from '@/types';
import { CloseIcon, StatusIcon, feedbackVariantClasses } from './feedbackStyles';

/**
 * Mensagem contextual em linha para sucesso, informação, atenção ou erro.
 * Erros e avisos são anunciados imediatamente por leitores de tela (`role="alert"`).
 */
export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  description,
  children,
  actions,
  icon,
  closable = false,
  onClose,
  closeLabel = 'Fechar alerta',
  className = '',
}) => {
  const styles = feedbackVariantClasses[variant];
  const isUrgent = variant === 'error' || variant === 'warning';
  const renderedIcon = icon === undefined ? <StatusIcon variant={variant} /> : icon;

  return (
    <div
      role={isUrgent ? 'alert' : 'status'}
      className={`flex gap-3 rounded-xl border p-4 ${styles.container} ${className}`}
    >
      {renderedIcon && <div className={`mt-0.5 shrink-0 ${styles.icon}`}>{renderedIcon}</div>}

      <div className="min-w-0 flex-1">
        {title && <p className={`text-sm font-semibold ${styles.title}`}>{title}</p>}
        {description && (
          <div className={`text-sm ${styles.text} ${title ? 'mt-1' : ''}`}>{description}</div>
        )}
        {children && <div className={`text-sm ${styles.text} mt-2`}>{children}</div>}
        {actions && <div className="mt-3 flex flex-wrap gap-2">{actions}</div>}
      </div>

      {closable && (
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className={`-m-1 h-7 w-7 shrink-0 inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus-visible:ring-2 ${styles.close}`}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

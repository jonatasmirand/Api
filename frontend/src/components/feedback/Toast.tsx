'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ToastContainerProps, ToastPosition, ToastProps } from '@/types';
import { CloseIcon, StatusIcon, feedbackVariantClasses } from './feedbackStyles';

/**
 * Notificação temporária. Fecha automaticamente após `duration` ms
 * (pausando enquanto o cursor ou o foco estiverem sobre ela).
 */
export const Toast: React.FC<ToastProps> = ({
  variant = 'info',
  title,
  description,
  duration = 5000,
  action,
  onClose,
  closeLabel = 'Fechar notificação',
  className = '',
}) => {
  const [paused, setPaused] = useState(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!duration || paused) return;
    const timer = window.setTimeout(() => onCloseRef.current?.(), duration);
    return () => window.clearTimeout(timer);
  }, [duration, paused]);

  const styles = feedbackVariantClasses[variant];
  const isUrgent = variant === 'error';

  return (
    <div
      role={isUrgent ? 'alert' : 'status'}
      aria-live={isUrgent ? 'assertive' : 'polite'}
      aria-atomic="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={`pointer-events-auto flex w-full max-w-sm gap-3 rounded-xl border bg-white p-4 shadow-lg animate-toast-in ${className}`}
    >
      <div className={`mt-0.5 shrink-0 ${styles.icon}`}>
        <StatusIcon variant={variant} />
      </div>
      <div className="min-w-0 flex-1">
        {title && <p className="text-sm font-semibold text-neutral-900">{title}</p>}
        {description && (
          <p className={`text-sm text-neutral-600 ${title ? 'mt-0.5' : ''}`}>{description}</p>
        )}
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="mt-2 text-sm font-semibold text-primary-700 hover:text-primary-800 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            {action.label}
          </button>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="-m-1 h-7 w-7 shrink-0 inline-flex items-center justify-center rounded-md text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

const positionClasses: Record<ToastPosition, string> = {
  'top-right': 'top-0 right-0 items-end',
  'top-left': 'top-0 left-0 items-start',
  'top-center': 'top-0 left-1/2 -translate-x-1/2 items-center',
  'bottom-right': 'bottom-0 right-0 items-end',
  'bottom-left': 'bottom-0 left-0 items-start',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 items-center',
};

/**
 * Pilha posicionada de toasts. Componente controlado: o estado da lista
 * fica com quem o utiliza, sem dependência de contexto global.
 */
export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
  position = 'top-right',
  className = '',
}) => {
  const isBottom = position.startsWith('bottom');

  return (
    <section
      aria-label="Notificações"
      className={`pointer-events-none fixed z-[60] flex w-full max-w-sm gap-3 p-4 ${
        isBottom ? 'flex-col-reverse' : 'flex-col'
      } ${positionClasses[position]} ${className}`}
    >
      {toasts.map(({ id, ...toast }) => (
        <Toast key={id} id={id} {...toast} onClose={() => onDismiss(id)} />
      ))}
    </section>
  );
};

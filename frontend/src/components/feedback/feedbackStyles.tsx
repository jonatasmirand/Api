import React from 'react';
import { AlertVariant } from '@/types';

/** Classes de cor compartilhadas por Alert e Toast. */
export const feedbackVariantClasses: Record<
  AlertVariant,
  { container: string; icon: string; title: string; text: string; close: string }
> = {
  success: {
    container: 'bg-success-50 border-success-500/40',
    icon: 'text-success-600',
    title: 'text-success-700',
    text: 'text-neutral-700',
    close: 'text-success-700 hover:bg-success-100 focus-visible:ring-success-500',
  },
  info: {
    container: 'bg-info-50 border-info-500/40',
    icon: 'text-info-600',
    title: 'text-info-700',
    text: 'text-neutral-700',
    close: 'text-info-700 hover:bg-info-100 focus-visible:ring-info-500',
  },
  warning: {
    container: 'bg-warning-50 border-warning-500/40',
    icon: 'text-warning-600',
    title: 'text-warning-700',
    text: 'text-neutral-700',
    close: 'text-warning-700 hover:bg-warning-100 focus-visible:ring-warning-500',
  },
  error: {
    container: 'bg-error-50 border-error-500/40',
    icon: 'text-error-600',
    title: 'text-error-700',
    text: 'text-neutral-700',
    close: 'text-error-700 hover:bg-error-100 focus-visible:ring-error-500',
  },
};

const iconPaths: Record<AlertVariant, string> = {
  success: 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  info: 'm11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z',
  warning:
    'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z',
  error: 'M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z',
};

interface StatusIconProps {
  variant: AlertVariant;
  className?: string;
}

/** Ícone semântico (decorativo) para sucesso, informação, atenção e erro. */
export const StatusIcon: React.FC<StatusIconProps> = ({ variant, className = 'h-5 w-5' }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.75}
    stroke="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d={iconPaths[variant]} />
  </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true" focusable="false">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

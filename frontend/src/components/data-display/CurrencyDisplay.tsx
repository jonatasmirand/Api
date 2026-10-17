import React from 'react';
import { CurrencyDisplayProps } from '@/types';
import { formatCurrency } from '@/utils/format';

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
  xl: 'text-3xl',
};

/** Exibe um valor monetário formatado (padrão BRL / pt-BR). */
export const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({
  value,
  currency = 'BRL',
  locale = 'pt-BR',
  size = 'md',
  colorize = false,
  showSign = false,
  compact = false,
  hidden = false,
  className = '',
}) => {
  const formatted = formatCurrency(value, { currency, locale, compact, showSign });

  const colorClass = !colorize || hidden || value === 0
    ? 'text-inherit'
    : value > 0
      ? 'text-success-700'
      : 'text-error-600';

  if (hidden) {
    return (
      <span className={`font-semibold tabular-nums ${sizeClasses[size]} ${className}`}>
        <span aria-hidden="true">{formatCurrency(0, { currency, locale }).replace(/[\d.,\s]+$/, ' ')}••••••</span>
        <span className="sr-only">Valor oculto</span>
      </span>
    );
  }

  return (
    <span
      className={`font-semibold tabular-nums whitespace-nowrap ${sizeClasses[size]} ${colorClass} ${className}`}
      title={compact ? formatCurrency(value, { currency, locale, showSign }) : undefined}
    >
      {formatted}
    </span>
  );
};

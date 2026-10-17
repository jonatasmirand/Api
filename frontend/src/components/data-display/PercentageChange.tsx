import React from 'react';
import { PercentageChangeProps } from '@/types';
import { formatPercent } from '@/utils/format';

const tones = {
  positive: { text: 'text-success-700', badge: 'bg-success-50 text-success-700 ring-success-500/20' },
  negative: { text: 'text-error-600', badge: 'bg-error-50 text-error-700 ring-error-500/20' },
  neutral: { text: 'text-neutral-500', badge: 'bg-neutral-100 text-neutral-600 ring-neutral-500/20' },
};

const sizeClasses = {
  sm: { text: 'text-xs', icon: 'h-3.5 w-3.5', badge: 'px-1.5 py-0.5' },
  md: { text: 'text-sm', icon: 'h-4 w-4', badge: 'px-2 py-0.5' },
};

const arrowPaths = {
  up: 'M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18',
  down: 'M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3',
  flat: 'M5 12h14',
};

/** Variação percentual positiva/negativa com cor e ícone indicativos. */
export const PercentageChange: React.FC<PercentageChangeProps> = ({
  value,
  decimals = 1,
  invertColors = false,
  showIcon = true,
  variant = 'text',
  size = 'md',
  label,
  className = '',
}) => {
  const direction = value > 0 ? 'up' : value < 0 ? 'down' : 'flat';
  const isGood = invertColors ? value < 0 : value > 0;
  const tone = direction === 'flat' ? tones.neutral : isGood ? tones.positive : tones.negative;
  const sizes = sizeClasses[size];
  const formatted = formatPercent(value, { decimals, showSign: true });
  const srDirection = direction === 'up' ? 'Aumento de' : direction === 'down' ? 'Redução de' : 'Sem variação:';

  return (
    <span className={`inline-flex items-center gap-1.5 ${sizes.text} ${className}`}>
      <span
        className={`inline-flex items-center gap-0.5 font-semibold tabular-nums ${
          variant === 'badge' ? `rounded-full ring-1 ring-inset ${sizes.badge} ${tone.badge}` : tone.text
        }`}
      >
        {showIcon && (
          <svg className={sizes.icon} fill="none" viewBox="0 0 24 24" strokeWidth={2.25} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d={arrowPaths[direction]} />
          </svg>
        )}
        <span className="sr-only">{srDirection} </span>
        {formatted}
      </span>
      {label && <span className="text-neutral-500">{label}</span>}
    </span>
  );
};

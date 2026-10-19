import React from 'react';
import { SkeletonProps } from '@/types';

const toCssSize = (value?: string | number) =>
  typeof value === 'number' ? `${value}px` : value;

const variantClasses = {
  text: 'h-4 rounded-md',
  rectangular: 'rounded-lg',
  circular: 'rounded-full',
};

/** Espaço reservado animado para conteúdo em carregamento. */
export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  lines = 1,
  className = '',
}) => {
  const base = `block animate-pulse bg-neutral-200 ${variantClasses[variant]}`;

  if (variant === 'text' && lines > 1) {
    return (
      <span aria-hidden="true" className={`flex flex-col gap-2 ${className}`} style={{ width: toCssSize(width) }}>
        {Array.from({ length: lines }, (_, index) => (
          <span
            key={index}
            className={base}
            style={{
              height: toCssSize(height),
              // A última linha fica mais curta para parecer um parágrafo.
              width: index === lines - 1 ? '70%' : '100%',
            }}
          />
        ))}
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`${base} ${className}`}
      style={{
        width: toCssSize(width) ?? (variant === 'circular' ? '2.5rem' : '100%'),
        height: toCssSize(height) ?? (variant === 'circular' ? '2.5rem' : variant === 'rectangular' ? '6rem' : undefined),
      }}
    />
  );
};

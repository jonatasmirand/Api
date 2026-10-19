import React from 'react';
import { BadgeProps } from '@/types';

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

const variantClasses = {
  default: 'bg-neutral-100 text-neutral-800',
  primary: 'bg-primary-100 text-primary-800',
  success: 'bg-success-100 text-success-800',
  warning: 'bg-warning-100 text-warning-800',
  error: 'bg-error-100 text-error-800',
  info: 'bg-info-100 text-info-800',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  const sizeClass = sizeClasses[size];
  const variantClass = variantClasses[variant];

  return (
    <span className={`${baseClasses} ${sizeClass} ${variantClass} ${className}`}>
      {children}
    </span>
  );
};

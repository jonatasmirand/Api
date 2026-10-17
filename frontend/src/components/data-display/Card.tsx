import React from 'react';
import { CardProps } from '@/types';

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  padding = 'md',
}) => {
  const baseClasses = 'bg-white rounded-lg border border-neutral-200 shadow-sm';
  const paddingClass = paddingClasses[padding];
  const hoverClass = hoverable ? 'hover:shadow-md transition-shadow duration-200' : '';

  return (
    <div className={`${baseClasses} ${paddingClass} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

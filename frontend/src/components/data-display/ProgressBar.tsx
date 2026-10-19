import React from 'react';
import { ProgressBarProps } from '@/types';

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

const colorClasses = {
  primary: 'bg-primary-600',
  success: 'bg-success-600',
  warning: 'bg-warning-600',
  error: 'bg-error-600',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel = false,
  label,
  className = '',
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  const sizeClass = sizeClasses[size];
  const colorClass = colorClasses[color];

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-neutral-700">{label || 'Progress'}</span>
          <span className="text-sm font-medium text-neutral-600">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-neutral-200 rounded-full overflow-hidden">
        <div
          className={`${sizeClass} ${colorClass} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

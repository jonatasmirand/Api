import React from 'react';
import { KpiCardProps } from '@/types';

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  target,
  progress,
  trend,
  description,
  icon,
  className = '',
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return (
          <svg className="h-4 w-4 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        );
      case 'down':
        return (
          <svg className="h-4 w-4 text-error-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        );
      default:
        return (
          <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        );
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-success-600';
      case 'down':
        return 'text-error-600';
      default:
        return 'text-neutral-400';
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-neutral-200 shadow-sm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-600">{title}</p>
          <p className="mt-1 text-3xl font-bold text-neutral-900">{value}</p>
        </div>
        {icon && (
          <div className="ml-4 flex-shrink-0">
            <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600">
              {icon}
            </div>
          </div>
        )}
      </div>
      {description && (
        <p className="text-sm text-neutral-500 mb-3">{description}</p>
      )}
      {target && (
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-neutral-600">Meta: {target}</span>
          {trend && (
            <span className={`flex items-center ${getTrendColor()}`}>
              {getTrendIcon()}
            </span>
          )}
        </div>
      )}
      {progress !== undefined && (
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { EmptyStateProps } from '@/types';

const sizeClasses = {
  sm: { wrapper: 'p-6 gap-2', icon: 'h-10 w-10', title: 'text-sm', text: 'text-xs' },
  md: { wrapper: 'p-8 gap-3', icon: 'h-14 w-14', title: 'text-base', text: 'text-sm' },
  lg: { wrapper: 'p-12 gap-4', icon: 'h-16 w-16', title: 'text-lg', text: 'text-base' },
};

const DefaultIcon = () => (
  <svg className="h-1/2 w-1/2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
    />
  </svg>
);

/** Estado de ausência de dados (ex.: nenhuma transação no período). */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  size = 'md',
  className = '',
}) => {
  const styles = sizeClasses[size];

  return (
    <div className={`flex flex-col items-center justify-center text-center ${styles.wrapper} ${className}`}>
      <div
        className={`flex items-center justify-center rounded-full bg-primary-50 text-primary-600 ring-8 ring-primary-50/50 ${styles.icon}`}
      >
        {icon ?? <DefaultIcon />}
      </div>
      <p className={`mt-2 font-semibold text-neutral-900 ${styles.title}`}>{title}</p>
      {description && <p className={`max-w-sm text-neutral-500 ${styles.text}`}>{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};

import React from 'react';
import { TabsProps } from '@/types';

export const Tabs: React.FC<TabsProps> = ({
  options,
  value,
  onChange,
  variant = 'underline',
  className = '',
}) => {
  const variantClasses = {
    underline: 'border-b border-neutral-200',
    pills: 'bg-neutral-100 p-1 rounded-lg',
  };

  const tabClasses = {
    underline: (isActive: boolean) =>
      `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
        isActive
          ? 'border-primary-600 text-primary-600'
          : 'border-transparent text-neutral-600 hover:text-neutral-900'
      }`,
    pills: (isActive: boolean) =>
      `px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? 'bg-white text-primary-600 shadow-sm'
          : 'text-neutral-600 hover:text-neutral-900'
      }`,
  };

  return (
    <div className={className}>
      <div className={`flex ${variantClasses[variant]}`}>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => !option.disabled && onChange(option.value)}
            disabled={option.disabled}
            className={`flex items-center gap-2 ${tabClasses[variant](value === option.value)} ${
              option.disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {option.icon && <span>{option.icon}</span>}
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

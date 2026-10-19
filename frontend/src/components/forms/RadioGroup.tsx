import React from 'react';
import { RadioGroupProps } from '@/types';

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  options,
  label,
  description,
  disabled = false,
  required = false,
  error,
  orientation = 'vertical',
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const baseClasses = 'w-5 h-5 text-primary-600 border-2 transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed';
  const errorClass = error ? 'border-error-500' : 'border-neutral-300';
  const orientationClass = orientation === 'horizontal' ? 'flex-row space-x-6' : 'flex-col space-y-3';

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      <div className={`flex ${orientationClass}`}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={handleChange}
              disabled={disabled || option.disabled}
              className={`${baseClasses} ${errorClass}`}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="ml-2 text-sm text-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {description && !error && (
        <p className="mt-1 text-sm text-neutral-500">{description}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-error-600">{error}</p>
      )}
    </div>
  );
};

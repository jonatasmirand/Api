import React from 'react';
import { CheckboxProps } from '@/types';

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  required = false,
  error,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  const baseClasses = 'w-5 h-5 text-primary-600 border-2 rounded transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed';
  const errorClass = error ? 'border-error-500' : 'border-neutral-300';

  return (
    <div className={className}>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={id}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            className={`${baseClasses} ${errorClass}`}
          />
        </div>
        <div className="ml-3">
          {label && (
            <label htmlFor={id} className="block text-sm font-medium text-neutral-700">
              {label}
              {required && <span className="text-error-500 ml-1">*</span>}
            </label>
          )}
          {description && !error && (
            <p className="text-sm text-neutral-500">{description}</p>
          )}
          {error && (
            <p className="text-sm text-error-600">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

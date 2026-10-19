import React from 'react';
import { FormFieldProps } from '@/types';

export const FormField: React.FC<FormFieldProps> = ({
  label,
  description,
  required = false,
  error,
  children,
  className = '',
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {description && !error && (
        <p className="mt-1 text-sm text-neutral-500">{description}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-error-600">{error}</p>
      )}
    </div>
  );
};

import React from 'react';
import { FormFieldProps } from '@/types';

export const FormField: React.FC<FormFieldProps> = ({
  id,
  htmlFor,
  label,
  description,
  required = false,
  error,
  children,
  className = '',
}) => {
  const fieldId = id || htmlFor;
  const errorId = fieldId ? `${fieldId}-error` : undefined;
  const descriptionId = fieldId ? `${fieldId}-description` : undefined;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          {label}
          {required && (
            <span className="text-error-500 ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {children}

      {description && !error && (
        <p id={descriptionId} className="mt-1.5 text-xs text-neutral-500">
          {description}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          aria-live="polite"
          className="mt-1.5 text-xs text-error-600 font-medium flex items-center gap-1.5"
        >
          <svg
            className="w-4 h-4 shrink-0 text-error-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

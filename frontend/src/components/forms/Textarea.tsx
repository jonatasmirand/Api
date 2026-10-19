import React from 'react';
import { TextareaProps } from '@/types';

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-2.5 text-lg',
};

const resizeClasses = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
};

export const Textarea: React.FC<TextareaProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  readOnly = false,
  required = false,
  size = 'md',
  error,
  label,
  description,
  rows = 4,
  resize = 'vertical',
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  const baseClasses = 'w-full border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const sizeClass = sizeClasses[size];
  const resizeClass = resizeClasses[resize];
  const errorClass = error
    ? 'border-error-500 focus:ring-error-500'
    : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500';
  const disabledClass = disabled ? 'bg-neutral-100' : 'bg-white';

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        rows={rows}
        className={`${baseClasses} ${sizeClass} ${errorClass} ${disabledClass} ${resizeClass}`}
      />
      {description && !error && (
        <p className="mt-1 text-sm text-neutral-500">{description}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-error-600">{error}</p>
      )}
    </div>
  );
};

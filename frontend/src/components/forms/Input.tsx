import React, { useId } from 'react';
import { InputProps } from '@/types';

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-2.5 text-lg',
};

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  disabled = false,
  readOnly = false,
  required = false,
  autoComplete,
  size = 'md',
  error,
  label,
  description,
  leftIcon,
  rightIcon,
  className = '',
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const baseClasses = 'w-full border rounded-lg text-neutral-900 placeholder:text-neutral-400 transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed';
  const sizeClass = sizeClasses[size];
  const errorClass = error
    ? 'border-error-500 focus:ring-error-500/30'
    : 'border-neutral-300 hover:border-neutral-400 focus:ring-primary-500/30 focus:border-primary-500';
  const disabledClass = disabled ? 'bg-neutral-100' : 'bg-white';

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
          {required && <span className="text-error-500 ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          name={name}
          type={type}
          inputMode={type === 'number' ? 'decimal' : undefined}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : description ? descriptionId : undefined}
          className={`${baseClasses} ${sizeClass} ${errorClass} ${disabledClass} ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''}`}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-400">
            {rightIcon}
          </div>
        )}
      </div>
      {description && !error && (
        <p id={descriptionId} className="mt-1 text-sm text-neutral-500">{description}</p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-error-600">{error}</p>
      )}
    </div>
  );
};

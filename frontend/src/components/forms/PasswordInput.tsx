'use client';

import React, { useId, useState } from 'react';
import { PasswordInputProps } from '@/types';

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-2.5 text-lg',
};

export const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  disabled = false,
  readOnly = false,
  required = false,
  autoComplete = 'current-password',
  size = 'md',
  error,
  label,
  description,
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const baseClasses =
    'w-full border rounded-lg text-neutral-900 placeholder:text-neutral-400 transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed';
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
          {required && (
            <span className="text-error-500 ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={showPassword ? 'text' : 'password'}
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
          className={`${baseClasses} ${sizeClass} ${errorClass} ${disabledClass} pr-11`}
        />
        <button
          type="button"
          onClick={togglePassword}
          disabled={disabled}
          aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
          title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 focus:outline-none focus-visible:text-primary-600 disabled:cursor-not-allowed"
        >
          {showPassword ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          )}
        </button>
      </div>
      {description && !error && (
        <p id={descriptionId} className="mt-1 text-sm text-neutral-500">
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-error-600">
          {error}
        </p>
      )}
    </div>
  );
};

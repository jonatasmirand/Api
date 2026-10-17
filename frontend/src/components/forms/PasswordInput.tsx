'use client';

import React, { useState } from 'react';
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
  placeholder,
  disabled = false,
  readOnly = false,
  required = false,
  size = 'md',
  error,
  label,
  description,
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const baseClasses = 'w-full border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const sizeClass = sizeClasses[size];
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
      <div className="relative">
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          className={`${baseClasses} ${sizeClass} ${errorClass} ${disabledClass} pr-10`}
        />
        <button
          type="button"
          onClick={togglePassword}
          disabled={disabled}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 focus:outline-none disabled:cursor-not-allowed"
        >
          {showPassword ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
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

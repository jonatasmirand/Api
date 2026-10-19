import React from 'react';
import { DatePickerProps } from '@/types';

export const DatePicker: React.FC<DatePickerProps> = ({
  id,
  name,
  value,
  onChange,
  label,
  description,
  disabled = false,
  required = false,
  error,
  minDate,
  maxDate,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // "AAAA-MM-DD" é interpretado no fuso local (new Date(string) usaria UTC).
    const [year, month, day] = e.target.value.split('-').map(Number);
    const date = e.target.value ? new Date(year, month - 1, day) : null;
    onChange?.(date);
  };

  const formatDate = (date?: Date | null) => {
    if (!date || Number.isNaN(date.getTime())) return '';
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  };

  const baseClasses = 'w-full border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-white';
  const errorClass = error
    ? 'border-error-500 focus:ring-error-500'
    : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500';

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type="date"
        value={formatDate(value)}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        min={minDate ? formatDate(minDate) : undefined}
        max={maxDate ? formatDate(maxDate) : undefined}
        className={`${baseClasses} ${errorClass} px-4 py-2`}
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

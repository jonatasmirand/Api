'use client';

import React, { useId, useState } from 'react';
import { FilterValues, TableFiltersProps } from '@/types';

const fieldClasses =
  'h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors hover:border-neutral-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30';

/** Painel de filtros configurável para tabelas (texto, seleção, data e número). */
export const TableFilters: React.FC<TableFiltersProps> = ({
  filters,
  onFilterChange,
  onClear,
  title = 'Filtros',
  className = '',
}) => {
  const baseId = useId();
  const [localFilters, setLocalFilters] = useState<FilterValues>(() =>
    Object.fromEntries(filters.filter((f) => f.value !== undefined).map((f) => [f.key, f.value ?? ''])),
  );

  const getValue = (key: string) => {
    const filter = filters.find((f) => f.key === key);
    // Filtros controlados (com `value`) têm prioridade sobre o estado local.
    return filter?.value ?? localFilters[key] ?? '';
  };

  const handleChange = (key: string, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
    filters.find((f) => f.key === key)?.onChange?.(value);
    onFilterChange?.(key, value);
  };

  const handleClear = () => {
    setLocalFilters(Object.fromEntries(filters.map((f) => [f.key, ''])));
    filters.forEach((filter) => {
      filter.onChange?.('');
      onFilterChange?.(filter.key, '');
    });
    onClear?.();
  };

  const hasActiveFilters = filters.some((filter) => getValue(filter.key) !== '');

  return (
    <fieldset className={`mb-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <legend className="text-sm font-semibold text-neutral-800">{title}</legend>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClear}
            className="rounded text-sm font-medium text-primary-700 hover:text-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            Limpar filtros
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filters.map((filter) => {
          const id = `${baseId}-${filter.key}`;
          const value = getValue(filter.key);

          return (
            <div key={filter.key}>
              <label htmlFor={id} className="mb-1 block text-sm font-medium text-neutral-700">
                {filter.label}
              </label>
              {filter.type === 'select' ? (
                <select id={id} value={value} onChange={(e) => handleChange(filter.key, e.target.value)} className={fieldClasses}>
                  <option value="">{filter.placeholder ?? 'Todos'}</option>
                  {filter.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  type={filter.type}
                  inputMode={filter.type === 'number' ? 'decimal' : undefined}
                  value={value}
                  onChange={(e) => handleChange(filter.key, e.target.value)}
                  placeholder={
                    filter.placeholder ??
                    (filter.type === 'text' ? `Buscar por ${filter.label.toLowerCase()}` : undefined)
                  }
                  className={fieldClasses}
                />
              )}
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};

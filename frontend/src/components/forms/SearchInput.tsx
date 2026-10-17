'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SearchInputProps } from '@/types';

const sizeClasses = {
  sm: 'h-8 text-sm pl-8 pr-8',
  md: 'h-10 text-sm pl-10 pr-10',
  lg: 'h-12 text-base pl-11 pr-11',
};

const iconOffset = {
  sm: 'left-2.5',
  md: 'left-3',
  lg: 'left-3.5',
};

/**
 * Campo de pesquisa com botão de limpar, busca por Enter e debounce opcional.
 * Funciona de forma controlada (`value`) ou não controlada (`defaultValue`).
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  id,
  name,
  value,
  defaultValue = '',
  onChange,
  onSearch,
  debounceMs = 0,
  placeholder = 'Pesquisar...',
  size = 'md',
  disabled = false,
  loading = false,
  ariaLabel = 'Pesquisar',
  clearLabel = 'Limpar pesquisa',
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;
  const inputRef = useRef<HTMLInputElement>(null);
  const onSearchRef = useRef(onSearch);
  const isFirstRender = useRef(true);

  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!debounceMs) return;
    const timer = window.setTimeout(() => onSearchRef.current?.(currentValue), debounceMs);
    return () => window.clearTimeout(timer);
  }, [currentValue, debounceMs]);

  const updateValue = (next: string) => {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const handleClear = () => {
    updateValue('');
    onSearch?.('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSearch?.(currentValue);
    } else if (event.key === 'Escape' && currentValue) {
      event.preventDefault();
      handleClear();
    }
  };

  return (
    <div role="search" className={`relative w-full ${className}`}>
      <span className={`pointer-events-none absolute inset-y-0 flex items-center text-neutral-400 ${iconOffset[size]}`}>
        {loading ? (
          <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-200 border-t-primary-600" />
        ) : (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        )}
      </span>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="search"
        value={currentValue}
        onChange={(event) => updateValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-busy={loading || undefined}
        autoComplete="off"
        className={`w-full rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 transition-all duration-200 hover:border-neutral-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-60 [&::-webkit-search-cancel-button]:appearance-none ${sizeClasses[size]}`}
      />
      {currentValue && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          aria-label={clearLabel}
          className="absolute inset-y-0 right-2 my-auto inline-flex h-6 w-6 items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

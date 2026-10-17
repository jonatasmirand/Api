'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DropdownProps } from '@/types';

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  options,
  align = 'left',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const alignClass = align === 'right' ? 'right-0' : 'left-0';

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className={`absolute ${alignClass} top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-50`}
        >
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                if (!option.disabled) {
                  option.onClick?.();
                  setIsOpen(false);
                }
              }}
              disabled={option.disabled}
              className={`w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center ${
                option.disabled ? 'text-neutral-400' : ''
              }`}
            >
              {option.icon && <span className="mr-2">{option.icon}</span>}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

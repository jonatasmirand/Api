'use client';

import React, { useState } from 'react';
import { AccordionProps } from '@/types';

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className = '',
}) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={className}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        return (
          <div key={item.id} className="border border-neutral-200 rounded-lg mb-2 last:mb-0">
            <button
              onClick={() => !item.disabled && toggleItem(item.id)}
              disabled={item.disabled}
              className={`w-full flex items-center justify-between p-4 text-left font-medium text-neutral-900 hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 ${
                item.disabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span>{item.title}</span>
              <svg
                className={`h-5 w-5 text-neutral-500 transition-transform ${
                  isOpen ? 'transform rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="p-4 border-t border-neutral-200 text-neutral-600">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

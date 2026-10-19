'use client';

import React, { useState } from 'react';

export type FinancialContext = 'pessoal' | 'empresarial';

export interface ContextSwitcherProps {
  currentContext?: FinancialContext;
  onContextChange?: (context: FinancialContext) => void;
  className?: string;
}

export const ContextSwitcher: React.FC<ContextSwitcherProps> = ({
  currentContext = 'pessoal',
  onContextChange,
  className = '',
}) => {
  const [activeContext, setActiveContext] = useState<FinancialContext>(currentContext);

  const handleSelect = (context: FinancialContext) => {
    setActiveContext(context);
    onContextChange?.(context);
  };

  return (
    <div
      className={`inline-flex items-center bg-neutral-100/90 p-1 rounded-xl border border-[#E3E9E4] ${className}`}
      role="radiogroup"
      aria-label="Contexto financeiro (Visual)"
      title="Alternador de contexto financeiro (Preparação visual)"
    >
      {/* Botão Pessoal */}
      <button
        type="button"
        role="radio"
        aria-checked={activeContext === 'pessoal'}
        onClick={() => handleSelect('pessoal')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9658] ${
          activeContext === 'pessoal'
            ? 'bg-white text-[#1F6B43] font-semibold shadow-xs'
            : 'text-neutral-500 hover:text-neutral-800'
        }`}
      >
        <svg
          className={`w-3.5 h-3.5 ${activeContext === 'pessoal' ? 'text-[#2E9658]' : 'text-neutral-400'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
        <span>Pessoal</span>
      </button>

      {/* Botão Empresarial */}
      <button
        type="button"
        role="radio"
        aria-checked={activeContext === 'empresarial'}
        onClick={() => handleSelect('empresarial')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9658] ${
          activeContext === 'empresarial'
            ? 'bg-white text-[#1F6B43] font-semibold shadow-xs'
            : 'text-neutral-500 hover:text-neutral-800'
        }`}
      >
        <svg
          className={`w-3.5 h-3.5 ${activeContext === 'empresarial' ? 'text-[#2E9658]' : 'text-neutral-400'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
          />
        </svg>
        <span>Empresarial</span>
      </button>
    </div>
  );
};

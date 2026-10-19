'use client';

import React, { useEffect } from 'react';
import { AppSidebar } from './AppSidebar';
import { SidebarOverlay } from './SidebarOverlay';

export interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  // Fecha a barra lateral ao pressionar a tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Evita rolagem do body quando o menu lateral está aberto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <SidebarOverlay isOpen={isOpen} onClose={onClose} />

      <div
        className="fixed inset-y-0 left-0 z-50 flex w-full max-w-xs flex-col bg-white shadow-2xl transition-transform md:hidden animate-slide-right"
        role="dialog"
        aria-modal="true"
        aria-label="Menu lateral de navegação"
      >
        {/* Botão de Fechar */}
        <div className="absolute top-3 right-3 z-10">
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9658]"
            aria-label="Fechar menu lateral"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Conteúdo compartilhado da sidebar */}
        <AppSidebar onNavigate={onClose} className="w-full border-r-0" />
      </div>
    </>
  );
};

'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AppSidebar } from './AppSidebar';
import { MobileSidebar } from './MobileSidebar';
import { AppHeader } from './AppHeader';
import { LoadingState } from '@/components/feedback/LoadingState';

export interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);

  // Exibe tela de carregamento seguro enquanto valida o token com a API
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6F9F6] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1F6B43] to-[#2E9658] flex items-center justify-center text-white mb-4 shadow-md shadow-[#2E9658]/20 animate-pulse">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <LoadingState size="md" message="Verificando sessão segura..." />
      </div>
    );
  }

  // Se não autenticado, AuthProvider já redirecionou para o login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F6F9F6] flex items-center justify-center p-4">
        <LoadingState size="md" message="Redirecionando para login..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F9F6] flex">
      {/* Sidebar Retrátil para Dispositivos Móveis */}
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Sidebar Fixa Desktop */}
      <div className={`hidden md:flex transition-all duration-200 ${isDesktopSidebarCollapsed ? 'w-0 overflow-hidden' : 'w-64'}`}>
        <div className="fixed inset-y-0 left-0 w-64 z-20">
          <AppSidebar />
        </div>
      </div>

      {/* Área Principal de Conteúdo */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Cabeçalho Fixo / Sticky */}
        <AppHeader
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onToggleDesktopSidebar={() => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)}
          isDesktopSidebarCollapsed={isDesktopSidebarCollapsed}
        />

        {/* Conteúdo da Rota Atual */}
        <main className="flex-1 bg-[#F6F9F6] relative">
          {children}
        </main>
      </div>
    </div>
  );
};

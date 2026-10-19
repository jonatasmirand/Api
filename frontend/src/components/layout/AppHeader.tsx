'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ContextSwitcher } from './ContextSwitcher';
import { UserMenu } from './UserMenu';

export interface AppHeaderProps {
  onToggleMobileSidebar: () => void;
  onToggleDesktopSidebar?: () => void;
  isDesktopSidebarCollapsed?: boolean;
  title?: string;
}

const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/contas': 'Contas financeiras',
  '/movimentacoes': 'Receitas e despesas',
  '/contas-a-pagar-receber': 'Contas a pagar e receber',
  '/categorias': 'Categorias',
  '/relatorios': 'Relatórios',
  '/planejamento': 'Planejamento financeiro',
  '/configuracoes': 'Configurações',
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  onToggleMobileSidebar,
  onToggleDesktopSidebar,
  isDesktopSidebarCollapsed = false,
  title,
}) => {
  const pathname = usePathname();

  // Obtém o título dinamicamente com base na rota atual ou prop
  const currentTitle =
    title ||
    routeTitles[pathname] ||
    Object.entries(routeTitles).find(([route]) => pathname.startsWith(route))?.[1] ||
    'Painel';

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-[#E3E9E4] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Lado Esquerdo: Botões de Toggle e Título */}
      <div className="flex items-center gap-3">
        {/* Botão Mobile para abrir a sidebar retrátil */}
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="p-2 -ml-2 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9658]"
          aria-label="Abrir menu de navegação"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        {/* Botão Desktop opcional para recolher/expandir sidebar */}
        {onToggleDesktopSidebar && (
          <button
            type="button"
            onClick={onToggleDesktopSidebar}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 hidden md:inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9658]"
            aria-label={isDesktopSidebarCollapsed ? 'Expandir menu lateral' : 'Recolher menu lateral'}
            title={isDesktopSidebarCollapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            <svg
              className={`w-4 h-4 transition-transform ${isDesktopSidebarCollapsed ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg>
          </button>
        )}

        {/* Título da Página Atual */}
        <h1 className="text-base sm:text-lg font-bold text-neutral-900 truncate tracking-tight">
          {currentTitle}
        </h1>
      </div>

      {/* Lado Direito: ContextSwitcher, Atalho Configurações e Menu do Usuário */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Seletor Visual de Contexto (Pessoal / Empresarial) */}
        <ContextSwitcher className="hidden sm:inline-flex" />

        {/* Atalho rápido para configurações */}
        <Link
          href="/configuracoes"
          className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9658]"
          title="Configurações do sistema"
          aria-label="Configurações do sistema"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </Link>

        {/* Divisória vertical */}
        <div className="h-6 w-[1px] bg-[#E3E9E4] hidden sm:block" aria-hidden="true" />

        {/* Menu do Usuário */}
        <UserMenu />
      </div>
    </header>
  );
};

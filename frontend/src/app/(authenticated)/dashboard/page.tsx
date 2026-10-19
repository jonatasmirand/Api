'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { PageContainer, PageHeader } from '@/components/layout';
import { Card } from '@/components/data-display/Card';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Visão consolidada das suas finanças e atalhos rápidos do sistema."
        badge="Área Autenticada"
        badgeVariant="success"
      />

      {/* Cartão de Boas-vindas Estrutural */}
      <Card padding="lg" className="bg-white border border-[#E3E9E4] rounded-2xl shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F5EC] text-[#2E9658] flex items-center justify-center font-bold text-xl flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-900">
                Olá, {user?.name || 'Usuário'}!
              </h2>
              <p className="text-xs text-neutral-500">
                Sua sessão segura está ativa. O layout autenticado está pronto para receber os módulos financeiros.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto">
            <Link href="/contas" className="flex-1 md:flex-initial">
              <Button variant="secondary" size="sm" fullWidth className="border-[#E3E9E4]">
                Ver Contas
              </Button>
            </Link>
            <Link href="/movimentacoes" className="flex-1 md:flex-initial">
              <Button variant="primary" size="sm" fullWidth className="!bg-[#2E9658] hover:!bg-[#1F6B43]">
                Nova Movimentação
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Cards Indicadores Estruturais (Sem dados fictícios simulando valores reais) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <Card padding="md" className="bg-white border border-[#E3E9E4] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Saldo Geral
            </span>
            <span className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </span>
          </div>
          <p className="text-xl font-bold text-neutral-900 tracking-tight">
            R$ --,--
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            Módulo pronto para conexão na próxima etapa.
          </p>
        </Card>

        <Card padding="md" className="bg-white border border-[#E3E9E4] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Receitas do Mês
            </span>
            <span className="w-8 h-8 rounded-xl bg-[#E8F5EC] flex items-center justify-center text-[#2E9658]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
              </svg>
            </span>
          </div>
          <p className="text-xl font-bold text-neutral-900 tracking-tight">
            R$ --,--
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            Aguardando integração de lançamentos.
          </p>
        </Card>

        <Card padding="md" className="bg-white border border-[#E3E9E4] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Despesas do Mês
            </span>
            <span className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
              </svg>
            </span>
          </div>
          <p className="text-xl font-bold text-neutral-900 tracking-tight">
            R$ --,--
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            Aguardando integração de lançamentos.
          </p>
        </Card>
      </div>

      {/* Seção Estrutural de Próximos Passos */}
      <Card padding="lg" className="bg-white border border-[#E3E9E4] rounded-2xl shadow-xs">
        <h3 className="text-base font-bold text-neutral-900 mb-2">
          Estrutura do Painel Inicializada com Sucesso
        </h3>
        <p className="text-sm text-neutral-600 leading-relaxed mb-4">
          O layout da área autenticada foi totalmente estruturado com sidebar responsiva, cabeçalho dinâmico,
          seletor de contexto e proteção de rota ativa. Navegue pelo menu lateral para verificar a navegação
          entre as páginas estruturais do sistema.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <Link
            href="/contas"
            className="p-3 rounded-xl border border-[#E3E9E4] hover:border-[#2E9658] hover:bg-neutral-50 transition-colors"
          >
            <p className="text-xs font-semibold text-neutral-800">Contas Financeiras</p>
            <p className="text-[11px] text-neutral-500">Bancos, carteiras e saldos</p>
          </Link>
          <Link
            href="/movimentacoes"
            className="p-3 rounded-xl border border-[#E3E9E4] hover:border-[#2E9658] hover:bg-neutral-50 transition-colors"
          >
            <p className="text-xs font-semibold text-neutral-800">Receitas & Despesas</p>
            <p className="text-[11px] text-neutral-500">Fluxo de lançamentos</p>
          </Link>
          <Link
            href="/contas-a-pagar-receber"
            className="p-3 rounded-xl border border-[#E3E9E4] hover:border-[#2E9658] hover:bg-neutral-50 transition-colors"
          >
            <p className="text-xs font-semibold text-neutral-800">Contas a Pagar/Receber</p>
            <p className="text-[11px] text-neutral-500">Vencimentos e compromissos</p>
          </Link>
          <Link
            href="/configuracoes"
            className="p-3 rounded-xl border border-[#E3E9E4] hover:border-[#2E9658] hover:bg-neutral-50 transition-colors"
          >
            <p className="text-xs font-semibold text-neutral-800">Configurações</p>
            <p className="text-[11px] text-neutral-500">Preferências e perfil</p>
          </Link>
        </div>
      </Card>
    </PageContainer>
  );
}

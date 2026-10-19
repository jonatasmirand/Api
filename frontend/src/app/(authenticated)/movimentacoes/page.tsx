'use client';

import React from 'react';
import { PageContainer, PageHeader } from '@/components/layout';
import { Card } from '@/components/data-display/Card';
import { Button } from '@/components/ui/Button';

export default function MovimentacoesPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Receitas e Despesas"
        description="Registro e acompanhamento de entradas, saídas e transferências financeiras."
        badge="Em desenvolvimento"
        badgeVariant="warning"
        breadcrumbs={[
          { label: 'Painel', href: '/dashboard' },
          { label: 'Receitas e Despesas' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled
              className="opacity-60 cursor-not-allowed border-[#E3E9E4]"
              title="Funcionalidade em desenvolvimento"
            >
              Exportar
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled
              className="!bg-[#2E9658] opacity-60 cursor-not-allowed"
              title="Funcionalidade em desenvolvimento"
            >
              + Novo Lançamento
            </Button>
          </div>
        }
      />

      <Card padding="lg" className="bg-white border border-[#E3E9E4] rounded-2xl shadow-xs text-center py-12">
        <div className="w-16 h-16 rounded-3xl bg-[#E8F5EC] text-[#2E9658] mx-auto flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-neutral-900 mb-2">
          Fluxo de Lançamentos Financeiros
        </h2>
        <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6">
          Área estruturada para a tabela de transações, filtros por período, tipos de movimentação
          e categorias associadas. Os formulários e o CRUD de transações serão conectados nas próximas etapas.
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          Página estrutural ativa • Conexão com endpoints de transações na próxima etapa
        </div>
      </Card>
    </PageContainer>
  );
}

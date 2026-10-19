'use client';

import React from 'react';
import { PageContainer, PageHeader } from '@/components/layout';
import { Card } from '@/components/data-display/Card';
import { Button } from '@/components/ui/Button';

export default function RelatoriosPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Relatórios Financeiros"
        description="Demonstrativos de fluxo de caixa, despesas por categoria e evolução patrimonial."
        badge="Em desenvolvimento"
        badgeVariant="warning"
        breadcrumbs={[
          { label: 'Painel', href: '/dashboard' },
          { label: 'Relatórios' },
        ]}
        actions={
          <Button
            variant="secondary"
            size="sm"
            disabled
            className="opacity-60 cursor-not-allowed border-[#E3E9E4]"
            title="Funcionalidade em desenvolvimento"
          >
            Gerar Demonstrativo (PDF/Excel)
          </Button>
        }
      />

      <Card padding="lg" className="bg-white border border-[#E3E9E4] rounded-2xl shadow-xs text-center py-12">
        <div className="w-16 h-16 rounded-3xl bg-[#E8F5EC] text-[#2E9658] mx-auto flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-neutral-900 mb-2">
          Demonstrativos e Análises Gráficas
        </h2>
        <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6">
          Área estruturada para apresentação de gráficos de pizza por categoria, barras de evolução mensal
          e demonstrativo de resultado financeiro.
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          Página estrutural ativa • Conexão analítica prevista para as próximas etapas
        </div>
      </Card>
    </PageContainer>
  );
}

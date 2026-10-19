'use client';

import React from 'react';
import { PageContainer, PageHeader } from '@/components/layout';
import { Card } from '@/components/data-display/Card';

export default function PlanejamentoPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Planejamento Financeiro"
        description="Definição de tetos de gastos, metas de economia e projeções para o futuro."
        badge="Em breve"
        badgeVariant="warning"
        breadcrumbs={[
          { label: 'Painel', href: '/dashboard' },
          { label: 'Planejamento Financeiro' },
        ]}
      />

      <Card padding="lg" className="bg-white border border-[#E3E9E4] rounded-2xl shadow-xs text-center py-12">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.143 2.143L15.75 6" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-neutral-900 mb-2">
          Planejamento & Metas Financeiras
        </h2>
        <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6">
          Este módulo está preparado para uma etapa futura da aplicação, incluindo reserva de emergência,
          orçamentos por categoria e limites de despesas mensais.
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-700 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-neutral-400" />
          Módulo planejado para expansão futura
        </div>
      </Card>
    </PageContainer>
  );
}

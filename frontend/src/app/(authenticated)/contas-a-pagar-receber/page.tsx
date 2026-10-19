'use client';

import React from 'react';
import { PageContainer, PageHeader } from '@/components/layout';
import { Card } from '@/components/data-display/Card';
import { Button } from '@/components/ui/Button';

export default function ContasPagarReceberPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Contas a Pagar e Receber"
        description="Controle de compromissos futuros, contas a liquidar e previsões de recebimento."
        badge="Em desenvolvimento"
        badgeVariant="warning"
        breadcrumbs={[
          { label: 'Painel', href: '/dashboard' },
          { label: 'Contas a Pagar e Receber' },
        ]}
        actions={
          <Button
            variant="primary"
            size="sm"
            disabled
            className="!bg-[#2E9658] opacity-60 cursor-not-allowed"
            title="Funcionalidade em desenvolvimento"
          >
            + Agendar Conta (Em breve)
          </Button>
        }
      />

      <Card padding="lg" className="bg-white border border-[#E3E9E4] rounded-2xl shadow-xs text-center py-12">
        <div className="w-16 h-16 rounded-3xl bg-[#E8F5EC] text-[#2E9658] mx-auto flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-neutral-900 mb-2">
          Gestão de Contas a Pagar e Receber
        </h2>
        <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6">
          Espaço dedicado para calendário de vencimentos, alertas de pendências e quitação de parcelas
          recorrentes ou pontuais.
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          Página estrutural ativa • Conexão prevista para as próximas etapas
        </div>
      </Card>
    </PageContainer>
  );
}

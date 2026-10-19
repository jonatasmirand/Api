'use client';

import React from 'react';
import { PageContainer, PageHeader } from '@/components/layout';
import { Card } from '@/components/data-display/Card';
import { Button } from '@/components/ui/Button';

export default function ContasPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Contas Financeiras"
        description="Gerenciamento de contas bancárias, carteiras, caixas e saldos disponíveis."
        badge="Em desenvolvimento"
        badgeVariant="warning"
        breadcrumbs={[
          { label: 'Painel', href: '/dashboard' },
          { label: 'Contas Financeiras' },
        ]}
        actions={
          <Button
            variant="primary"
            size="sm"
            disabled
            className="!bg-[#2E9658] opacity-60 cursor-not-allowed"
            title="Funcionalidade em desenvolvimento"
          >
            + Nova Conta (Em breve)
          </Button>
        }
      />

      <Card padding="lg" className="bg-white border border-[#E3E9E4] rounded-2xl shadow-xs text-center py-12">
        <div className="w-16 h-16 rounded-3xl bg-[#E8F5EC] text-[#2E9658] mx-auto flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-neutral-900 mb-2">
          Módulo de Contas Financeiras
        </h2>
        <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6">
          Nesta seção será possível cadastrar bancos, contas correntes, poupanças e carteiras de dinheiro,
          acompanhando os saldos individuais e a conciliação com a API.
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          Página estrutural ativa • Conexão com endpoints prevista para a próxima etapa
        </div>
      </Card>
    </PageContainer>
  );
}

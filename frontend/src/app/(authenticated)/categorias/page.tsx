'use client';

import React from 'react';
import { PageContainer, PageHeader } from '@/components/layout';
import { Card } from '@/components/data-display/Card';
import { Button } from '@/components/ui/Button';

export default function CategoriasPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Categorias"
        description="Classificação personalizada de receitas e despesas para organização financeira."
        badge="Em desenvolvimento"
        badgeVariant="warning"
        breadcrumbs={[
          { label: 'Painel', href: '/dashboard' },
          { label: 'Categorias' },
        ]}
        actions={
          <Button
            variant="primary"
            size="sm"
            disabled
            className="!bg-[#2E9658] opacity-60 cursor-not-allowed"
            title="Funcionalidade em desenvolvimento"
          >
            + Nova Categoria
          </Button>
        }
      />

      <Card padding="lg" className="bg-white border border-[#E3E9E4] rounded-2xl shadow-xs text-center py-12">
        <div className="w-16 h-16 rounded-3xl bg-[#E8F5EC] text-[#2E9658] mx-auto flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-neutral-900 mb-2">
          Gestão de Categorias e Centros de Custo
        </h2>
        <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6">
          Estrutura para listagem de categorias por cores, ícones, tipos (receita ou despesa)
          e subcategorias para relatórios analíticos detalhados.
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          Página estrutural ativa • Integração prevista com a API de categorias
        </div>
      </Card>
    </PageContainer>
  );
}

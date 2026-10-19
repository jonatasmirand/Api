'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { PageContainer, PageHeader } from '@/components/layout';
import { Card } from '@/components/data-display/Card';
import { Button } from '@/components/ui/Button';

export default function ConfiguracoesPage() {
  const { user, logout } = useAuth();

  return (
    <PageContainer>
      <PageHeader
        title="Configurações do Sistema"
        description="Gerenciamento da sua conta, perfil de acesso e preferências da aplicação."
        badge="Área Autenticada"
        badgeVariant="success"
        breadcrumbs={[
          { label: 'Painel', href: '/dashboard' },
          { label: 'Configurações' },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cartão de Perfil */}
        <div className="md:col-span-2 space-y-6">
          <Card padding="lg" className="bg-white border border-[#E3E9E4] rounded-2xl shadow-xs">
            <h2 className="text-base font-bold text-neutral-900 mb-4 pb-3 border-b border-[#E3E9E4]">
              Dados do Usuário Autenticado
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  Nome Completo
                </p>
                <p className="font-semibold text-neutral-900">
                  {user?.name || 'Não informado'}
                </p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  E-mail de Acesso
                </p>
                <p className="font-semibold text-neutral-900">
                  {user?.email || 'Não informado'}
                </p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  Perfil de Permissão
                </p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E8F5EC] text-[#1F6B43]">
                  {user?.role === 'admin' ? 'Administrador' : 'Usuário Padrão'}
                </span>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  Status da Sessão
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2E9658]">
                  <span className="w-2 h-2 rounded-full bg-[#2E9658] animate-pulse" />
                  Sessão ativa e protegida via JWT
                </span>
              </div>
            </div>
          </Card>

          {/* Preferências Visuais */}
          <Card padding="lg" className="bg-white border border-[#E3E9E4] rounded-2xl shadow-xs">
            <h2 className="text-base font-bold text-neutral-900 mb-4 pb-3 border-b border-[#E3E9E4]">
              Preferências do Sistema
            </h2>
            <p className="text-sm text-neutral-500 mb-4">
              As opções de tema, moedas adicionais e notificações por e-mail serão integradas com os endpoints da API.
            </p>
            <div className="p-3 rounded-xl bg-neutral-50 text-xs text-neutral-600 border border-neutral-200">
              Ambiente configurado com idioma padrão Português do Brasil (pt-BR) e moeda Real (BRL).
            </div>
          </Card>
        </div>

        {/* Cartão de Segurança e Logout */}
        <div className="space-y-6">
          <Card padding="lg" className="bg-white border border-[#E3E9E4] rounded-2xl shadow-xs">
            <h2 className="text-base font-bold text-neutral-900 mb-3">
              Encerramento de Sessão
            </h2>
            <p className="text-xs text-neutral-500 leading-relaxed mb-5">
              Ao sair, seu token de acesso será revogado na API e removido de forma segura do armazenamento local.
            </p>

            <Button
              variant="danger"
              size="md"
              fullWidth
              onClick={logout}
              className="font-semibold shadow-xs"
            >
              Sair da Aplicação
            </Button>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}

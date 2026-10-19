'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getStoredAuth, clearAuthSession } from '@/services/auth';
import { AuthUser } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/data-display/Card';

export default function DashboardPlaceholderPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const { user: storedUser } = getStoredAuth();
    if (storedUser) {
      queueMicrotask(() => {
        setUser(storedUser);
      });
    }
  }, []);

  const handleLogout = () => {
    clearAuthSession();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#F6F9F6] flex flex-col">
      {/* Barra Superior da Aplicação */}
      <header className="bg-white border-b border-[#E3E9E4] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#2E9658] flex items-center justify-center text-white font-extrabold text-lg">
            F
          </div>
          <span className="font-extrabold text-lg text-[#202522]">
            Fin<span className="text-[#2E9658]">Gestão</span>
          </span>
          <span className="hidden sm:inline-flex items-center ml-2 px-2.5 py-0.5 rounded-full text-xs font-semibold text-[#1F6B43] bg-[#E8F5EC]">
            Aplicação / Painel
          </span>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <span className="text-xs text-[#6F7771] hidden sm:inline-block">
              Conectado como <strong className="text-[#202522]">{user.name || user.email}</strong>
            </span>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleLogout}
            className="border border-[#E3E9E4] text-[#6F7771] hover:text-[#202522]"
          >
            Sair
          </Button>
        </div>
      </header>

      {/* Conteúdo Placeholder da Aplicação */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col items-center justify-center">
        <Card padding="lg" className="bg-white border border-[#E3E9E4] shadow-sm rounded-3xl text-center max-w-xl w-full">
          <div className="w-16 h-16 rounded-3xl bg-[#E8F5EC] text-[#2E9658] mx-auto flex items-center justify-center mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>

          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#1F6B43] bg-[#E8F5EC] px-3 py-1 rounded-full mb-3">
            Área Interna do Sistema
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202522] mb-3">
            Painel da Aplicação
          </h1>

          <p className="text-sm sm:text-base text-[#6F7771] leading-relaxed mb-6">
            {user ? `Bem-vindo, ${user.name}! ` : ''}
            Você acessou a rota interna da aplicação (<code className="px-1.5 py-0.5 bg-neutral-100 rounded text-xs font-mono">/dashboard</code>).
            Conforme planejado, as telas e funcionalidades internas completas serão implementadas nas próximas etapas.
          </p>

          <div className="pt-6 border-t border-[#E3E9E4] flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto">
                Ver Landing Page Pública
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto">
                Voltar ao Login
              </Button>
            </Link>
          </div>
        </Card>
      </main>
    </div>
  );
}

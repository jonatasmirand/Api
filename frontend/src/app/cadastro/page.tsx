'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/data-display/Card';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/forms/Input';
import { PasswordInput } from '@/components/forms/PasswordInput';
import { Alert } from '@/components/feedback/Alert';
import { LandingHeader } from '@/components/landing';

export default function CadastroPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col relative">
      {/* Barra de navegação com link para voltar à página inicial */}
      <LandingHeader />

      <main className="flex-1 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 relative">
        {/* Background decorativo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-60" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-200 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
          {/* Identificação visual */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary-700 to-primary-500 shadow-lg shadow-primary-500/25 mb-4 text-white">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>

            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-primary-700 bg-primary-50 px-3 py-1 rounded-full mb-2">
              Cadastro de Novo Usuário
            </span>

            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              Crie sua conta
            </h1>
            <p className="mt-1.5 text-sm text-neutral-600">
              Comece a organizar suas finanças com clareza e segurança.
            </p>
          </div>

          {/* Card do Formulário de Cadastro */}
          <Card
            padding="lg"
            className="shadow-xl shadow-neutral-200/50 border border-neutral-200/80 bg-white/95 backdrop-blur-sm relative rounded-2xl"
          >
            {submitted ? (
              <div className="space-y-4 py-3 text-center animate-toast-in">
                <Alert
                  variant="info"
                  title="Cadastro em fase de habilitação"
                  description="O fluxo de registro público está sendo configurado. Utilize suas credenciais existentes para acessar a plataforma."
                />
                <div className="pt-2">
                  <Link href="/login">
                    <Button variant="primary" fullWidth className="!bg-[#2E9658] hover:!bg-[#1F6B43]">
                      Ir para tela de Login
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Nome completo" htmlFor="name" required>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome ou da sua empresa"
                    value={name}
                    onChange={setName}
                    required
                  />
                </FormField>

                <FormField label="E-mail" htmlFor="email" required>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    value={email}
                    onChange={setEmail}
                    required
                  />
                </FormField>

                <FormField label="Senha" htmlFor="password" required>
                  <PasswordInput
                    id="password"
                    placeholder="Crie uma senha segura (mín. 6 caracteres)"
                    value={password}
                    onChange={setPassword}
                    required
                  />
                </FormField>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    className="!bg-[#2E9658] hover:!bg-[#1F6B43] !text-white font-semibold shadow-sm rounded-xl py-3"
                  >
                    Criar conta
                  </Button>
                </div>

                <div className="pt-3 border-t border-[#E3E9E4] text-center text-sm text-[#6F7771]">
                  Já possui uma conta?{' '}
                  <Link href="/login" className="font-semibold text-[#2E9658] hover:text-[#1F6B43]">
                    Fazer login
                  </Link>
                </div>
              </form>
            )}

            {/* Rodapé informativo */}
            <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-col items-center gap-1.5 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                <span>Ambiente protegido com criptografia de ponta a ponta</span>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

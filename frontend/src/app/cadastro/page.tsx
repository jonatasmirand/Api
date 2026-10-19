'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/data-display/Card';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/forms/Input';
import { PasswordInput } from '@/components/forms/PasswordInput';
import { Alert } from '@/components/feedback/Alert';

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
    <div className="min-h-screen bg-[#F6F9F6] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#E8F5EC] rounded-full blur-3xl opacity-70" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#E8F5EC] rounded-full blur-3xl opacity-70" />
      </div>

      <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
        {/* Identificação visual */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
            <div className="w-12 h-12 rounded-2xl bg-[#2E9658] flex items-center justify-center text-white font-black text-2xl shadow-md group-hover:bg-[#1F6B43] transition-colors">
              F
            </div>
            <span className="font-extrabold text-2xl text-[#202522] tracking-tight">
              Fin<span className="text-[#2E9658]">Gestão</span>
            </span>
          </Link>

          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#1F6B43] bg-[#E8F5EC] px-3 py-1 rounded-full mb-2">
            Cadastro de Novo Usuário
          </span>

          <h1 className="text-2xl font-bold tracking-tight text-[#202522] sm:text-3xl">
            Crie sua conta
          </h1>
          <p className="mt-1.5 text-sm text-[#6F7771]">
            Comece a organizar suas finanças com clareza e segurança.
          </p>
        </div>

        {/* Card do Formulário de Cadastro */}
        <Card
          padding="lg"
          className="shadow-xl shadow-neutral-900/5 border border-[#E3E9E4] bg-white relative rounded-2xl"
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
        </Card>

        {/* Link para voltar para a página inicial */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs font-medium text-[#6F7771] hover:text-[#202522] transition-colors inline-flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Voltar para a página inicial pública</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

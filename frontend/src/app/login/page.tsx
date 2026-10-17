'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert } from '@/components/feedback/Alert';
import { LoadingState } from '@/components/feedback/LoadingState';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/forms/Input';
import { PasswordInput } from '@/components/forms/PasswordInput';
import { Card } from '@/components/data-display/Card';
import { AuthUser } from '@/types';
import {
  AuthError,
  getRememberedEmail,
  getStoredAuth,
  loginApi,
  saveAuthSession,
} from '@/services/auth';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthUser | null>(null);

  // Carrega e-mail lembrado ou sessão pré-existente
  useEffect(() => {
    const savedEmail = getRememberedEmail();
    const { user } = getStoredAuth();

    if (savedEmail || user) {
      queueMicrotask(() => {
        if (savedEmail) {
          setEmail(savedEmail);
        }
        if (user) {
          setAuthenticatedUser(user);
        }
      });
    }
  }, []);

  const validate = (): boolean => {
    let isValid = true;
    setEmailError(undefined);
    setPasswordError(undefined);
    setApiError(null);

    const emailTrimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailTrimmed) {
      setEmailError('Informe seu e-mail');
      isValid = false;
    } else if (!emailRegex.test(emailTrimmed)) {
      setEmailError('Informe um e-mail válido');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Informe sua senha');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('A senha deve ter no mínimo 6 caracteres');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    setApiError(null);

    try {
      const data = await loginApi({ email, password });

      // Salva sessão no storage/cookie
      saveAuthSession(data, true);
      setAuthenticatedUser(data.user);

      // Redireciona após breve confirmação
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (err) {
      if (err instanceof AuthError) {
        setApiError(err.message);
      } else {
        setApiError('Ocorreu um erro inesperado ao tentar realizar o login.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-200 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
        {/* Identificação visual do sistema financeiro */}
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
            Gestão Financeira Pessoal & MEI
          </span>

          {/* Título de boas-vindas */}
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Bem-vindo de volta!
          </h1>
          <p className="mt-1.5 text-sm text-neutral-600">
            Acesse sua conta para acompanhar seu saldo, receitas e despesas.
          </p>
        </div>

        {/* Card principal do formulário */}
        <Card padding="lg" className="shadow-xl shadow-neutral-200/50 border border-neutral-200/80 bg-white/95 backdrop-blur-sm relative">
          {authenticatedUser ? (
            <div className="space-y-4 py-2 text-center">
              <Alert
                variant="success"
                title="Sessão Iniciada"
                description={`Olá, ${authenticatedUser.name}! Login realizado com sucesso.`}
              />
              <p className="text-sm text-neutral-600 animate-pulse">
                Redirecionando para o painel principal...
              </p>
              <Button
                variant="primary"
                fullWidth
                onClick={() => router.push('/')}
              >
                Ir para o Painel
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Mensagem de erro para credenciais inválidas ou falha de conexão */}
              {apiError && (
                <Alert
                  variant="error"
                  title="Não foi possível entrar"
                  description={apiError}
                  closable
                  onClose={() => setApiError(null)}
                />
              )}

              {/* Campo de e-mail utilizando FormField e Input */}
              <FormField
                label="E-mail"
                required
                error={emailError}
              >
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={email}
                  onChange={(val) => {
                    setEmail(val);
                    if (emailError) setEmailError(undefined);
                  }}
                  disabled={isLoading}
                  leftIcon={
                    <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  }
                />
              </FormField>

              {/* Campo de senha utilizando FormField e PasswordInput (com opção de mostrar/ocultar senha embutida) */}
              <FormField
                label="Senha"
                required
                error={passwordError}
              >
                <PasswordInput
                  id="password"
                  name="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(val) => {
                    setPassword(val);
                    if (passwordError) setPasswordError(undefined);
                  }}
                  disabled={isLoading}
                />
              </FormField>

              {/* Indicador visual adicional durante o envio */}
              {isLoading && (
                <div className="py-1">
                  <LoadingState size="sm" message="Validando credenciais..." />
                </div>
              )}

              {/* Botão de entrar */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isLoading}
                rightIcon={
                  !isLoading ? (
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  ) : undefined
                }
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          )}

          {/* Rodapé informativo */}
          <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-col items-center gap-1.5 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span>Conexão segura com a API (JWT / TLS)</span>
            </div>
            <p className="text-center text-neutral-400">
              Acesso exclusivo para usuários cadastrados.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

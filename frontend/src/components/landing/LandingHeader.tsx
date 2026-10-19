'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export const LandingHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const isCadastroPage = pathname === '/cadastro';

  const navLinks = [
    { label: 'Apresentação', href: '/#apresentacao' },
    { label: 'Benefícios', href: '/#beneficios' },
    { label: 'Funcionalidades', href: '/#funcionalidades' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E3E9E4] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logotipo / Nome do Sistema */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9658] rounded-lg"
            title="Ir para a página inicial"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1F6B43] to-[#2E9658] flex items-center justify-center text-white shadow-md shadow-[#2E9658]/20 group-hover:scale-105 transition-transform">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
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
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#202522]">
                FinGestão
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-[#2E9658] -mt-1">
                Controle Financeiro
              </span>
            </div>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#6F7771] hover:text-[#2E9658] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9658] rounded px-1 py-0.5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Ações Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {isLoginPage ? (
              <>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6F7771] hover:text-[#202522] px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9658] rounded-lg"
                >
                  <svg className="w-4 h-4 text-[#2E9658]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Voltar ao início</span>
                </Link>
                <Link href="/cadastro">
                  <Button
                    variant="primary"
                    size="md"
                    className="!bg-[#2E9658] hover:!bg-[#1F6B43] !text-white font-semibold shadow-sm hover:shadow-md transition-all rounded-xl"
                  >
                    Criar conta
                  </Button>
                </Link>
              </>
            ) : isCadastroPage ? (
              <>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6F7771] hover:text-[#202522] px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9658] rounded-lg"
                >
                  <svg className="w-4 h-4 text-[#2E9658]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Voltar ao início</span>
                </Link>
                <Link href="/login">
                  <Button
                    variant="primary"
                    size="md"
                    className="!bg-[#2E9658] hover:!bg-[#1F6B43] !text-white font-semibold shadow-sm hover:shadow-md transition-all rounded-xl"
                  >
                    Fazer login
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-[#202522] hover:text-[#2E9658] px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9658] rounded-lg"
                >
                  Entrar
                </Link>
                <Link href="/cadastro">
                  <Button
                    variant="primary"
                    size="md"
                    className="!bg-[#2E9658] hover:!bg-[#1F6B43] !text-white font-semibold shadow-sm hover:shadow-md transition-all rounded-xl"
                  >
                    Começar agora
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Botão Menu Mobile */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#6F7771] hover:text-[#202522] hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-[#2E9658]"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile Retrátil */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E3E9E4] animate-toast-in">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 text-base font-medium text-[#202522] hover:bg-[#E8F5EC] hover:text-[#2E9658] rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-[#E3E9E4] flex flex-col gap-2">
                {isLoginPage ? (
                  <>
                    <Link
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="inline-flex items-center justify-center gap-2 w-full text-center py-2.5 text-sm font-semibold text-[#6F7771] hover:text-[#202522] hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4 text-[#2E9658]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      <span>Voltar para a página inicial</span>
                    </Link>
                    <Link
                      href="/cadastro"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full"
                    >
                      <Button
                        variant="primary"
                        fullWidth
                        className="!bg-[#2E9658] hover:!bg-[#1F6B43] !text-white font-semibold rounded-xl"
                      >
                        Criar conta
                      </Button>
                    </Link>
                  </>
                ) : isCadastroPage ? (
                  <>
                    <Link
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="inline-flex items-center justify-center gap-2 w-full text-center py-2.5 text-sm font-semibold text-[#6F7771] hover:text-[#202522] hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4 text-[#2E9658]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      <span>Voltar para a página inicial</span>
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full"
                    >
                      <Button
                        variant="primary"
                        fullWidth
                        className="!bg-[#2E9658] hover:!bg-[#1F6B43] !text-white font-semibold rounded-xl"
                      >
                        Fazer login
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full text-center py-2.5 text-sm font-semibold text-[#202522] hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                      Entrar na conta
                    </Link>
                    <Link
                      href="/cadastro"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full"
                    >
                      <Button
                        variant="primary"
                        fullWidth
                        className="!bg-[#2E9658] hover:!bg-[#1F6B43] !text-white font-semibold rounded-xl"
                      >
                        Começar agora
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

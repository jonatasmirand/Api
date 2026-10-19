'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const HeroSection: React.FC = () => {
  const benefits = [
    'Saiba para onde seu dinheiro está indo.',
    'Acompanhe receitas e despesas com mais clareza.',
    'Planeje seus próximos passos financeiros.',
  ];

  return (
    <section
      id="apresentacao"
      className="relative overflow-hidden bg-white pt-12 pb-20 lg:pt-20 lg:pb-32"
    >
      {/* Elementos decorativos de fundo sutis */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-[#E8F5EC] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 w-72 h-72 bg-neutral-100 rounded-full blur-2xl opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Coluna Esquerda: Mensagem Comercial e Proposta de Valor */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Tag de categoria */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F5EC] text-[#1F6B43] text-xs font-semibold w-fit mb-6">
              <span className="w-2 h-2 rounded-full bg-[#2E9658] animate-pulse" />
              Gestão Financeira Pessoal & MEI
            </div>

            {/* Título Principal com destaque verde */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#202522] leading-[1.15]">
              Seu financeiro organizado.{' '}
              <span className="text-[#2E9658] block mt-1">
                Suas decisões mais inteligentes.
              </span>
            </h1>

            {/* Descrição objetiva */}
            <p className="mt-6 text-lg sm:text-xl text-[#6F7771] leading-relaxed max-w-xl">
              Organize receitas, despesas e compromissos financeiros em um só lugar.
              Tenha mais clareza sobre seu dinheiro e tome decisões com confiança.
            </p>

            {/* Lista de benefícios com marcadores verdes */}
            <ul className="mt-8 space-y-3.5">
              {benefits.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-base font-medium text-[#202522]">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E8F5EC] text-[#2E9658] flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.8} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Botões de Ação */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/cadastro">
                <Button
                  variant="primary"
                  size="lg"
                  className="!bg-[#2E9658] hover:!bg-[#1F6B43] !text-white font-semibold shadow-md shadow-[#2E9658]/20 rounded-xl px-8 py-3.5 text-base w-full sm:w-auto"
                  rightIcon={
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  }
                >
                  Começar agora
                </Button>
              </Link>

              <a href="#funcionalidades">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white hover:bg-neutral-50 !text-[#202522] border border-[#E3E9E4] font-semibold rounded-xl px-7 py-3.5 text-base w-full sm:w-auto"
                  leftIcon={
                    <svg className="w-4 h-4 text-[#2E9658] mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  }
                >
                  Conhecer a solução
                </Button>
              </a>
            </div>

            {/* Indicadores de Confiança */}
            <div className="mt-12 pt-8 border-t border-[#E3E9E4] grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-sm font-bold text-[#202522]">100% Organizado</p>
                <p className="text-xs text-[#6F7771]">Sem planilhas perdidas</p>
              </div>
              <div>
                <p className="text-sm font-bold text-[#202522]">Acesso Seguro</p>
                <p className="text-xs text-[#6F7771]">Criptografia e proteção</p>
              </div>
              <div>
                <p className="text-sm font-bold text-[#202522]">Para MEI & PF</p>
                <p className="text-xs text-[#6F7771]">Fluxo simplificado</p>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Apresentação Visual com Imagem e Cards Ilustrativos Sobrepostos */}
          <div className="lg:col-span-6 relative mt-8 lg:mt-0">
            {/* Moldura da imagem principal com bordas arredondadas e sombra */}
            <div className="relative mx-auto max-w-lg lg:max-w-none rounded-3xl overflow-hidden shadow-2xl shadow-neutral-900/10 border border-[#E3E9E4] bg-neutral-100 aspect-[4/3]">
              <Image
                src="/images/hero-entrepreneur.jpg"
                alt="Empreendedor acompanhando a gestão financeira do seu negócio em laptop"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Card Decorativo 1 (Topo Direito) - Saldo Disponível */}
            <div className="absolute -top-6 right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl border border-[#E3E9E4] max-w-[240px] sm:max-w-[260px] animate-toast-in">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-medium text-[#6F7771]">Resumo financeiro</span>
                <span className="text-[9px] uppercase tracking-wider font-semibold text-[#2E9658] bg-[#E8F5EC] px-1.5 py-0.5 rounded">
                  Ilustrativo
                </span>
              </div>
              <p className="text-xs text-[#6F7771]">Saldo disponível</p>
              <p className="text-xl sm:text-2xl font-bold text-[#202522] tracking-tight">
                R$ 32.830,45
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="inline-flex items-center text-xs font-semibold text-[#2E9658]">
                  <svg className="w-3.5 h-3.5 mr-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                  +8,7% vs mês anterior
                </span>
              </div>

              {/* Mini gráfico em barras estilizado (similar à referência da captura 3) */}
              <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-end gap-1.5 h-7">
                {[35, 50, 42, 68, 55, 80, 72, 95, 88].map((val, idx) => (
                  <div
                    key={idx}
                    className="flex-1 rounded-sm bg-[#2E9658]/30 transition-all hover:bg-[#2E9658]"
                    style={{ height: `${val}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Card Decorativo 2 (Rodapé Esquerdo) - Receitas & Despesas */}
            <div className="absolute -bottom-8 left-2 sm:-left-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl border border-[#E3E9E4] max-w-[250px] sm:max-w-[270px]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F5EC] text-[#2E9658] flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] text-[#6F7771]">Entradas do mês</p>
                    <p className="text-sm font-bold text-[#202522]">R$ 45.230,00</p>
                  </div>
                </div>
                <span className="text-[9px] uppercase tracking-wider font-semibold text-[#6F7771] bg-neutral-100 px-1 py-0.5 rounded">
                  Demo
                </span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#2E9658] h-1.5 rounded-full" style={{ width: '74%' }} />
              </div>
              <p className="mt-2 text-[10px] text-[#6F7771] flex justify-between">
                <span>Despesas: R$ 12.390,00</span>
                <span className="font-semibold text-[#2E9658]">74% economia</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import Image from 'next/image';

export const BenefitsSection: React.FC = () => {
  const problems = [
    'Dificuldade para acompanhar receitas e despesas.',
    'Falta de clareza sobre o saldo disponível.',
    'Compromissos financeiros esquecidos.',
    'Informações financeiras espalhadas.',
    'Dificuldade para entender os gastos do mês.',
  ];

  const solutions = [
    'Informações financeiras organizadas.',
    'Visualização de receitas e despesas.',
    'Acompanhamento dos compromissos financeiros.',
    'Indicadores para facilitar a análise.',
    'Mais clareza para planejar o orçamento.',
  ];

  return (
    <section
      id="beneficios"
      className="py-20 lg:py-28 bg-[#F6F9F6] border-y border-[#E3E9E4]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#1F6B43] bg-[#E8F5EC] px-3.5 py-1 rounded-full inline-block mb-3">
            Transformação na prática
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#202522]">
            Do descontrole à organização financeira.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6F7771]">
            Veja a diferença que uma visão estruturada faz no seu dia a dia e na tranquilidade do seu planejamento.
          </p>
        </div>

        {/* Grade comparativa e Imagem */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Card 1 — Antes (Hoje é assim) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-100">
              <span className="text-xs font-bold uppercase tracking-wider text-error-600 bg-error-50 px-2.5 py-1 rounded-lg">
                Hoje é assim
              </span>
              <span className="text-xs font-medium text-neutral-400">Sem método</span>
            </div>

            <ul className="space-y-4">
              {problems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-error-50 text-error-600 flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-[#202522] leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 — Com o sistema (Com o FinGestão) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#2E9658]/30 shadow-lg shadow-[#2E9658]/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#2E9658] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Recomendado
            </div>

            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-100">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1F6B43] bg-[#E8F5EC] px-2.5 py-1 rounded-lg">
                Com o FinGestão
              </span>
              <span className="text-xs font-medium text-[#2E9658]">Tudo em ordem</span>
            </div>

            <ul className="space-y-4">
              {solutions.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E8F5EC] text-[#2E9658] flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.8} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-[#202522] leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Imagem Ilustrativa de tranquilidade financeira */}
          <div className="lg:col-span-4 relative rounded-3xl overflow-hidden shadow-xl border border-[#E3E9E4] bg-white aspect-[4/3] lg:aspect-auto lg:h-[430px]">
            <Image
              src="/images/benefits-woman.jpg"
              alt="Profissional com tranquilidade no acompanhamento financeiro"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4ade80]">
                Controle total
              </span>
              <p className="text-base font-bold leading-snug mt-1">
                Mais clareza para planejar o orçamento do mês
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FeaturePreview, FeatureTabKey } from './FeaturePreview';

interface FeatureMeta {
  key: FeatureTabKey;
  label: string;
  icon: React.ReactNode;
  badge: string;
  title: string;
  description: string;
  bullets: string[];
}

const FEATURES: FeatureMeta[] = [
  {
    key: 'fluxo-caixa',
    label: 'Fluxo de Caixa',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    badge: 'Projeção & Controle',
    title: 'Fluxo de Caixa Inteligente',
    description: 'Visualize entradas, saídas e projeções com precisão para tomar decisões com segurança e nunca ser pego de surpresa.',
    bullets: [
      'Visão consolidada de entradas e saídas previstas',
      'Alertas de saldo e vencimentos importantes',
      'Projeções periódicas para planejamento',
      'Filtros por período diário, semanal ou mensal',
    ],
  },
  {
    key: 'visao-geral',
    label: 'Visão Geral',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 12a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z" />
      </svg>
    ),
    badge: 'Painel Central',
    title: 'Dashboard de Indicadores',
    description: 'Todos os seus principais indicadores financeiros reunidos em um único lugar, com atualização visual e métricas de desempenho.',
    bullets: [
      'Saldo total disponível e projeção do período',
      'Comparativo rápido com o mês anterior',
      'Acompanhamento de metas financeiras',
      'Distribuição rápida entre contas',
    ],
  },
  {
    key: 'receitas-despesas',
    label: 'Receitas e Despesas',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    badge: 'Controle de Lançamentos',
    title: 'Gestão Completa de Transações',
    description: 'Registre e acompanhe todas as movimentações financeiras com categorização inteligente e status de pagamento.',
    bullets: [
      'Histórico completo de receitas e despesas',
      'Status em tempo real: pago, pendente e agendado',
      'Identificação rápida de clientes e fornecedores',
      'Busca e filtragem intuitivas por data e conta',
    ],
  },
  {
    key: 'categorias',
    label: 'Categorias',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    badge: 'Distribuição Inteligente',
    title: 'Categorização de Gastos',
    description: 'Entenda com clareza para onde o seu dinheiro está indo através de gráficos de distribuição por centro de custos ou categoria.',
    bullets: [
      'Gráfico de distribuição percentual das despesas',
      'Identificação dos maiores centros de consumo',
      'Definição de tetos de gastos por categoria',
      'Comparações mensais de evolução de custos',
    ],
  },
  {
    key: 'relatorios',
    label: 'Relatórios',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    badge: 'Visão Estratégica',
    title: 'Demonstrativos e Relatórios',
    description: 'Resumos consolidados do desempenho financeiro para orientar o crescimento sustentável do seu negócio ou orçamento pessoal.',
    bullets: [
      'Demonstrativo resumido de receitas, custos e margem',
      'Exportação organizada para compartilhamento',
      'Análise de sazonalidade e tendências de despesas',
      'Visão comparativa entre períodos contábeis',
    ],
  },
];

export const FeaturesSection: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState<FeatureTabKey>('fluxo-caixa');

  const currentFeature = FEATURES.find((f) => f.key === activeTabKey) || FEATURES[0];

  return (
    <section id="funcionalidades" className="py-20 lg:py-28 bg-[#F6F9F6] border-y border-[#E3E9E4]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#1F6B43] bg-[#E8F5EC] border border-[#2E9658]/20 mb-4">
            Recursos da Plataforma
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#202522] tracking-tight">
            Tudo o que você precisa para <span className="text-[#2E9658]">acompanhar suas finanças</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6F7771] leading-relaxed">
            Uma visão organizada das informações financeiras para facilitar o acompanhamento do dia a dia e planejar o futuro com segurança.
          </p>
        </div>

        {/* Barra de Abas (Pills) no estilo Zeonpaper */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {FEATURES.map((item) => {
            const isActive = item.key === activeTabKey;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveTabKey(item.key)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#2E9658] text-white shadow-md shadow-[#2E9658]/20 scale-[1.02]'
                    : 'bg-white text-[#6F7771] border border-[#E3E9E4] hover:bg-neutral-50 hover:text-[#202522]'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-[#6F7771]'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Layout do Recurso: Coluna Explicativa + Coluna Mockup Demonstrativo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Card Esquerdo Informativo */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E3E9E4] p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E8F5EC] text-[#2E9658] flex items-center justify-center mb-6">
                {currentFeature.icon}
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-[#2E9658]">
                {currentFeature.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#202522] mt-2 mb-3">
                {currentFeature.title}
              </h3>
              <p className="text-sm sm:text-base text-[#6F7771] leading-relaxed mb-6">
                {currentFeature.description}
              </p>

              {/* Lista de Recursos com Check Verde */}
              <ul className="space-y-3.5 mb-8">
                {currentFeature.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#E8F5EC] text-[#2E9658] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm font-medium text-[#202522]">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-[#E3E9E4] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2E9658] hover:bg-[#1F6B43] text-white font-semibold text-sm transition-colors shadow-sm"
              >
                <span>Acessar demonstração</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <span className="text-xs text-[#6F7771] text-center sm:text-left">
                Interface ilustrativa sem necessidade de dados reais.
              </span>
            </div>
          </div>

          {/* Card Direito: Preview Ilustrativo do Módulo Selecionado */}
          <div className="lg:col-span-7">
            <FeaturePreview activeTab={activeTabKey} />
          </div>
        </div>
      </div>
    </section>
  );
};

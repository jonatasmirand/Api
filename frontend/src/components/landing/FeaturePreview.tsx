'use client';

import React from 'react';

export type FeatureTabKey = 'visao-geral' | 'receitas-despesas' | 'fluxo-caixa' | 'categorias' | 'relatorios';

interface FeaturePreviewProps {
  activeTab: FeatureTabKey;
}

export const FeaturePreview: React.FC<FeaturePreviewProps> = ({ activeTab }) => {
  return (
    <div className="relative rounded-3xl bg-white border border-[#E3E9E4] shadow-2xl shadow-neutral-900/5 p-4 sm:p-6 overflow-hidden">
      {/* Topo estilo janela/navegador do software */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-neutral-200" />
          <span className="w-3 h-3 rounded-full bg-neutral-200" />
          <span className="w-3 h-3 rounded-full bg-neutral-200" />
          <span className="ml-3 text-xs font-semibold text-[#6F7771]">
            FinGestão Web / {activeTab === 'visao-geral' ? 'Visão Geral' : activeTab === 'receitas-despesas' ? 'Transações' : activeTab === 'fluxo-caixa' ? 'Fluxo de Caixa' : activeTab === 'categorias' ? 'Categorias' : 'Relatórios'}
          </span>
        </div>
        <span className="text-[10px] uppercase font-bold text-[#2E9658] bg-[#E8F5EC] px-2 py-0.5 rounded-full">
          Demonstração Ilustrativa
        </span>
      </div>

      {/* Conteúdo dinâmico baseado na aba selecionada */}
      {activeTab === 'visao-geral' && (
        <div className="space-y-5 animate-toast-in">
          {/* Indicadores Principais */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100">
              <span className="text-xs text-[#6F7771]">Saldo Total</span>
              <p className="text-lg font-bold text-[#202522] mt-0.5">R$ 28.450,00</p>
              <span className="text-[11px] font-semibold text-[#2E9658]">+12% este mês</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100">
              <span className="text-xs text-[#6F7771]">Receitas</span>
              <p className="text-lg font-bold text-[#202522] mt-0.5">R$ 34.200,00</p>
              <span className="text-[11px] text-[#6F7771]">18 entradas</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100">
              <span className="text-xs text-[#6F7771]">Despesas</span>
              <p className="text-lg font-bold text-[#202522] mt-0.5">R$ 15.750,00</p>
              <span className="text-[11px] text-error-600">4 pendentes</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#E8F5EC]/60 border border-[#2E9658]/20">
              <span className="text-xs text-[#1F6B43]">Economia</span>
              <p className="text-lg font-bold text-[#1F6B43] mt-0.5">R$ 18.450,00</p>
              <span className="text-[11px] font-semibold text-[#2E9658]">54% do total</span>
            </div>
          </div>

          {/* Gráfico Simulado de Evolução */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
            <div className="flex justify-between items-center mb-3">
              <p className="text-xs font-semibold text-[#202522]">Evolução do Saldo (Últimos 6 meses)</p>
              <span className="text-[11px] text-[#6F7771]">Jan - Jun</span>
            </div>
            <div className="h-28 flex items-end justify-between gap-3 pt-2">
              {[
                { mes: 'Jan', val: 40, label: 'R$ 12k' },
                { mes: 'Fev', val: 55, label: 'R$ 16k' },
                { mes: 'Mar', val: 48, label: 'R$ 14k' },
                { mes: 'Abr', val: 70, label: 'R$ 21k' },
                { mes: 'Mai', val: 82, label: 'R$ 24k' },
                { mes: 'Jun', val: 95, label: 'R$ 28k' },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[10px] text-[#6F7771]">{bar.label}</span>
                  <div
                    className="w-full bg-[#2E9658] rounded-t-lg transition-all hover:bg-[#1F6B43]"
                    style={{ height: `${bar.val}%` }}
                  />
                  <span className="text-[11px] font-medium text-[#202522]">{bar.mes}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'receitas-despesas' && (
        <div className="space-y-3 animate-toast-in">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-[#202522]">Últimas Movimentações</span>
            <span className="text-xs text-[#2E9658] font-medium">Filtrar período</span>
          </div>
          <div className="divide-y divide-neutral-100 overflow-hidden rounded-2xl border border-neutral-100">
            {[
              { desc: 'Consultoria Financeira MEI', cat: 'Serviços Prestados', valor: '+ R$ 4.500,00', tipo: 'in', status: 'Recebido' },
              { desc: 'Aluguel Comercial Sala 302', cat: 'Instalações', valor: '- R$ 1.800,00', tipo: 'out', status: 'Pago' },
              { desc: 'Venda de Produtos Online', cat: 'E-commerce', valor: '+ R$ 2.340,00', tipo: 'in', status: 'Recebido' },
              { desc: 'Licença de Software e Ferramentas', cat: 'Tecnologia', valor: '- R$ 380,00', tipo: 'out', status: 'Pago' },
              { desc: 'Fornecedor de Embalagens', cat: 'Operacional', valor: '- R$ 650,00', tipo: 'out', status: 'Pendente' },
            ].map((row, idx) => (
              <div key={idx} className="p-3 sm:px-4 flex items-center justify-between text-xs hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      row.tipo === 'in' ? 'bg-[#E8F5EC] text-[#2E9658]' : 'bg-neutral-100 text-[#6F7771]'
                    }`}
                  >
                    {row.tipo === 'in' ? '↓' : '↑'}
                  </div>
                  <div>
                    <p className="font-semibold text-[#202522]">{row.desc}</p>
                    <p className="text-[11px] text-[#6F7771]">{row.cat}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${row.tipo === 'in' ? 'text-[#2E9658]' : 'text-neutral-900'}`}>
                    {row.valor}
                  </p>
                  <span
                    className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      row.status === 'Recebido'
                        ? 'bg-[#E8F5EC] text-[#1F6B43]'
                        : row.status === 'Pago'
                        ? 'bg-neutral-100 text-neutral-600'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {row.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'fluxo-caixa' && (
        <div className="space-y-4 animate-toast-in">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold text-[#202522]">Fluxo de Caixa Semanal</p>
              <p className="text-[11px] text-[#6F7771]">Comparativo de entradas vs. saídas</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-[#2E9658] font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2E9658]" /> Entradas
              </span>
              <span className="flex items-center gap-1.5 text-error-600 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-error-500" /> Saídas
              </span>
            </div>
          </div>

          <div className="h-44 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-end justify-between gap-4">
            {[
              { semana: 'Semana 1', in: 75, out: 30, saldo: '+ R$ 4.5k' },
              { semana: 'Semana 2', in: 60, out: 45, saldo: '+ R$ 2.1k' },
              { semana: 'Semana 3', in: 90, out: 40, saldo: '+ R$ 6.3k' },
              { semana: 'Semana 4', in: 70, out: 50, saldo: '+ R$ 3.8k' },
            ].map((sem, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-[10px] font-semibold text-[#2E9658]">{sem.saldo}</span>
                <div className="flex items-end gap-1.5 w-full justify-center h-28">
                  <div className="w-5 bg-[#2E9658] rounded-t-md" style={{ height: `${sem.in}%` }} title="Entradas" />
                  <div className="w-5 bg-error-400 rounded-t-md" style={{ height: `${sem.out}%` }} title="Saídas" />
                </div>
                <span className="text-[11px] font-medium text-[#202522] mt-1">{sem.semana}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'categorias' && (
        <div className="space-y-4 animate-toast-in">
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs font-semibold text-[#202522]">Distribuição por Centro de Custo</p>
            <span className="text-xs text-[#6F7771]">Total: R$ 15.750,00</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center p-3 rounded-2xl bg-neutral-50 border border-neutral-100">
            {/* Gráfico Donut SVG Ilustrativo */}
            <div className="flex justify-center">
              <svg className="w-36 h-36 -rotate-90" viewBox="0 0 100 100">
                {/* Segmento 1: Serviços 38% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#2E9658" strokeWidth="16" strokeDasharray="90.7 238.7" strokeDashoffset="0" />
                {/* Segmento 2: Operacional 26% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#4ade80" strokeWidth="16" strokeDasharray="62.1 238.7" strokeDashoffset="-90.7" />
                {/* Segmento 3: Tributos 16% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#1F6B43" strokeWidth="16" strokeDasharray="38.2 238.7" strokeDashoffset="-152.8" />
                {/* Segmento 4: Marketing 12% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#86efac" strokeWidth="16" strokeDasharray="28.6 238.7" strokeDashoffset="-191" />
                {/* Segmento 5: Outros 8% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#d4d4d4" strokeWidth="16" strokeDasharray="19.1 238.7" strokeDashoffset="-219.6" />
              </svg>
            </div>

            {/* Legenda das categorias */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#2E9658]" /> Serviços</span>
                <span className="font-bold text-[#202522]">38% (R$ 5.985)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#4ade80]" /> Operacional</span>
                <span className="font-bold text-[#202522]">26% (R$ 4.095)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#1F6B43]" /> Tributos / DAS</span>
                <span className="font-bold text-[#202522]">16% (R$ 2.520)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#86efac]" /> Marketing</span>
                <span className="font-bold text-[#202522]">12% (R$ 1.890)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#d4d4d4]" /> Outros</span>
                <span className="font-bold text-[#202522]">8% (R$ 1.260)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'relatorios' && (
        <div className="space-y-4 animate-toast-in">
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs font-semibold text-[#202522]">DRE Simplificado & Resultados</p>
            <span className="text-xs font-semibold text-[#2E9658] bg-[#E8F5EC] px-2.5 py-0.5 rounded-full">
              Margem Líquida: 54%
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-neutral-200/60 font-semibold text-[#202522]">
              <span>Receita Bruta Total</span>
              <span className="text-[#2E9658]">R$ 34.200,00</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-200/60 text-[#6F7771]">
              <span>(-) Impostos e Taxas</span>
              <span className="text-error-600">- R$ 2.520,00</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-200/60 text-[#6F7771]">
              <span>(-) Custos Operacionais e Fornecedores</span>
              <span className="text-error-600">- R$ 7.890,00</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-200/60 text-[#6F7771]">
              <span>(-) Despesas Administrativas</span>
              <span className="text-error-600">- R$ 5.340,00</span>
            </div>
            <div className="flex justify-between pt-2 text-sm font-bold text-[#202522]">
              <span>(=) Resultado Operacional Líquido</span>
              <span className="text-[#2E9658] text-base">R$ 18.450,00</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

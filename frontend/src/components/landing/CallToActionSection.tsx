'use client';

import React from 'react';
import Link from 'next/link';

export const CallToActionSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#1F6B43] via-[#2E9658] to-[#1F6B43] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl shadow-[#2E9658]/20">
          {/* Elementos decorativos de fundo */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-black/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#1F6B43] bg-white/95 mb-6 shadow-sm">
              Tome o controle do seu negócio
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
              Comece a organizar suas finanças hoje.
            </h2>

            <p className="text-base sm:text-lg text-emerald-50 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              Junte-se a milhares de empreendedores e profissionais que transformaram a gestão do seu dinheiro em clareza, previsibilidade e crescimento.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[#1F6B43] font-bold text-base hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer"
              >
                <span>Acessar o sistema</span>
                <svg className="w-5 h-5 text-[#2E9658]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link
                href="#apresentacao"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/15 hover:bg-white/20 text-white font-medium text-base transition-colors border border-white/20 cursor-pointer"
              >
                <span>Voltar ao início</span>
              </Link>
            </div>

            {/* Badges de confiança discretos */}
            <div className="mt-10 pt-8 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-100">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Acesso seguro com criptografia</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Demonstração ilustrativa aberta</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Sem necessidade de cartão de crédito</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

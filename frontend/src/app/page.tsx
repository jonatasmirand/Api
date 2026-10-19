import type { Metadata } from 'next';
import {
  LandingHeader,
  HeroSection,
  BenefitsSection,
  FeaturesSection,
  CallToActionSection,
  LandingFooter,
} from '@/components/landing';

export const metadata: Metadata = {
  title: 'FinGestão — Seu financeiro organizado. Suas decisões mais inteligentes.',
  description:
    'Organize receitas, despesas e compromissos financeiros em um só lugar. Tenha mais clareza sobre seu dinheiro e tome decisões com confiança.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#202522]">
      {/* Cabeçalho Fixo */}
      <LandingHeader />

      {/* Conteúdo Principal com Seções Âncora */}
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <BenefitsSection />
        <FeaturesSection />
        <CallToActionSection />
      </main>

      {/* Rodapé da Landing */}
      <LandingFooter />
    </div>
  );
}

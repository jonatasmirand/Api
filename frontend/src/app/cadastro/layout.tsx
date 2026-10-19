import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cadastro | FinGestão - Gestão Financeira',
  description: 'Crie sua conta no Sistema de Gestão Financeira Pessoal e MEI.',
};

export default function CadastroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

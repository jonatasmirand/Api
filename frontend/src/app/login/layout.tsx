import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | FinGestão - Gestão Financeira',
  description: 'Acesse sua conta no Sistema de Gestão Financeira Pessoal e MEI.',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import { AuthenticatedLayout } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Painel | FinGestão',
  description: 'Área interna do Sistema de Gestão Financeira FinGestão.',
};

export default function AuthenticatedRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>
    </AuthProvider>
  );
}

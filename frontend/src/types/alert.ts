export type AlertVariant = 'success' | 'warning' | 'error' | 'info';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  description?: React.ReactNode;
  /** Conteúdo adicional (ex.: lista de pendências). */
  children?: React.ReactNode;
  /** Ações exibidas abaixo da mensagem (ex.: botões). */
  actions?: React.ReactNode;
  /** Substitui o ícone padrão da variante. Use `null` para ocultar. */
  icon?: React.ReactNode | null;
  closable?: boolean;
  onClose?: () => void;
  closeLabel?: string;
  className?: string;
}

export interface LoadingStateProps {
  /** Texto exibido abaixo do indicador. */
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Ocupa toda a viewport com sobreposição. */
  fullScreen?: boolean;
  className?: string;
}

export interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  /** Quantidade de linhas (apenas para `variant="text"`). */
  lines?: number;
  className?: string;
}

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  /** Ação principal (ex.: botão "Nova transação"). */
  action?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface ErrorStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  /** Quando informado, exibe o botão de nova tentativa. */
  onRetry?: () => void;
  retryLabel?: string;
  retrying?: boolean;
  /** Ações adicionais personalizadas. */
  action?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

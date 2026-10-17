export interface CurrencyDisplayProps {
  value: number;
  /** Código ISO 4217. Padrão: BRL. */
  currency?: string;
  locale?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Verde para positivo, vermelho para negativo. */
  colorize?: boolean;
  /** Exibe "+" para valores positivos. */
  showSign?: boolean;
  compact?: boolean;
  /** Oculta o valor (modo privacidade). */
  hidden?: boolean;
  className?: string;
}

export interface PercentageChangeProps {
  /** Variação em pontos percentuais (ex.: 12.5 ou -3.2). */
  value: number;
  decimals?: number;
  /**
   * Inverte a semântica de cores — útil para despesas,
   * em que um aumento é negativo.
   */
  invertColors?: boolean;
  showIcon?: boolean;
  variant?: 'text' | 'badge';
  size?: 'sm' | 'md';
  /** Texto complementar (ex.: "vs. mês anterior"). */
  label?: string;
  className?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

export interface SearchInputProps {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Disparado ao pressionar Enter ou após o `debounceMs`. */
  onSearch?: (value: string) => void;
  /** Atraso em ms para disparar `onSearch` automaticamente. 0 desativa. */
  debounceMs?: number;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  ariaLabel?: string;
  clearLabel?: string;
  className?: string;
}

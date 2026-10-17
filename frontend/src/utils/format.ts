export interface FormatCurrencyOptions {
  currency?: string;
  locale?: string;
  /** Formato compacto (ex.: R$ 1,2 mil). */
  compact?: boolean;
  /** Exibe "+" para valores positivos. */
  showSign?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

/** Formata um valor monetário. Padrão: Real brasileiro (BRL). */
export const formatCurrency = (
  value: number,
  {
    currency = 'BRL',
    locale = 'pt-BR',
    compact = false,
    showSign = false,
    minimumFractionDigits,
    maximumFractionDigits,
  }: FormatCurrencyOptions = {},
): string =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: compact ? 'compact' : 'standard',
    signDisplay: showSign ? 'exceptZero' : 'auto',
    minimumFractionDigits: minimumFractionDigits ?? (compact ? 0 : 2),
    maximumFractionDigits: maximumFractionDigits ?? (compact ? 1 : 2),
  }).format(value);

export interface FormatPercentOptions {
  locale?: string;
  decimals?: number;
  showSign?: boolean;
}

/**
 * Formata um percentual. Recebe o valor em pontos percentuais
 * (ex.: `12.5` → "12,5%").
 */
export const formatPercent = (
  value: number,
  { locale = 'pt-BR', decimals = 1, showSign = false }: FormatPercentOptions = {},
): string =>
  new Intl.NumberFormat(locale, {
    style: 'percent',
    signDisplay: showSign ? 'exceptZero' : 'auto',
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(value / 100);

/** Formata um número simples segundo a localidade (padrão pt-BR). */
export const formatNumber = (value: number, locale = 'pt-BR', decimals = 0): string =>
  new Intl.NumberFormat(locale, { maximumFractionDigits: decimals }).format(value);

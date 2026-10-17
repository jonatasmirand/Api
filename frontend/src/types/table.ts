export type SortDirection = 'asc' | 'desc' | null;

/** Chave de coluna: preferencialmente uma propriedade de `T`, mas aceita chaves derivadas. */
export type ColumnKey<T> = Extract<keyof T, string> | (string & Record<never, never>);

export interface TableColumn<T> {
  key: ColumnKey<T>;
  title: string;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  /** Renderização personalizada da célula. `value` corresponde a `row[key]`. */
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  /** Oculta a coluna em telas pequenas. */
  hideOnMobile?: boolean;
}

export interface PaginationConfig {
  currentPage: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
}

export interface TablePaginationProps extends PaginationConfig {
  className?: string;
}

export type FilterType = 'text' | 'select' | 'date' | 'number';

export interface FilterConfig {
  key: string;
  label: string;
  type: FilterType;
  options?: { value: string; label: string }[];
  placeholder?: string;
  /** Valores de filtros são tratados como string (como nos campos HTML). */
  value?: string;
  onChange?: (value: string) => void;
}

export type FilterValues = Record<string, string>;

export interface TableFiltersProps {
  filters: FilterConfig[];
  onFilterChange?: (key: string, value: string) => void;
  onClear?: () => void;
  title?: string;
  className?: string;
}

export interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  /** Propriedade ou função que gera uma chave estável para cada linha. */
  rowKey?: Extract<keyof T, string> | ((row: T, index: number) => string | number);
  loading?: boolean;
  /** Quantidade de linhas skeleton exibidas durante o carregamento. */
  loadingRows?: number;
  empty?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  /** Substitui completamente o estado vazio padrão. */
  emptyState?: React.ReactNode;
  error?: string;
  onRetry?: () => void;
  pagination?: PaginationConfig;
  filters?: FilterConfig[];
  onFilterChange?: (key: string, value: string) => void;
  /** Área acima da tabela (ex.: SearchInput, botões de ação). */
  toolbar?: React.ReactNode;
  onSort?: (key: string, direction: SortDirection) => void;
  sortKey?: string;
  sortDirection?: SortDirection;
  onRowClick?: (row: T, index: number) => void;
  /** Legenda acessível da tabela (visível apenas para leitores de tela). */
  caption?: string;
  className?: string;
}

import React from 'react';
import { DataTableProps, SortDirection, TableColumn } from '@/types';
import { TablePagination } from './TablePagination';
import { TableFilters } from './TableFilters';
import { Skeleton } from '@/components/feedback/Skeleton';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';

const alignClasses = {
  left: 'text-left justify-start',
  center: 'text-center justify-center',
  right: 'text-right justify-end',
};

const SortIcon: React.FC<{ direction: SortDirection | undefined }> = ({ direction }) => (
  <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 3 11 7H5z" className={direction === 'asc' ? 'text-primary-600' : 'text-neutral-300'} />
    <path d="M8 13 5 9h6z" className={direction === 'desc' ? 'text-primary-600' : 'text-neutral-300'} />
  </svg>
);

const toAriaSort = (direction: SortDirection | undefined): React.AriaAttributes['aria-sort'] =>
  direction === 'asc' ? 'ascending' : direction === 'desc' ? 'descending' : 'none';

const defaultCellContent = (value: unknown): React.ReactNode => {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'string' || typeof value === 'number') return value;
  if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
  if (value instanceof Date) return value.toLocaleDateString('pt-BR');
  return String(value);
};

/**
 * Tabela de dados genérica e tipada. Ordenação, paginação e filtros são
 * controlados externamente (o componente apenas emite os eventos).
 */
export const DataTable = <T extends object>({
  columns,
  data,
  rowKey,
  loading = false,
  loadingRows = 5,
  empty = false,
  emptyTitle = 'Nenhum registro encontrado',
  emptyDescription,
  emptyState,
  error,
  onRetry,
  pagination,
  filters,
  onFilterChange,
  toolbar,
  onSort,
  sortKey,
  sortDirection,
  onRowClick,
  caption,
  className = '',
}: DataTableProps<T>) => {
  const getValue = (row: T, key: string): unknown => (row as Record<string, unknown>)[key];

  const getRowKey = (row: T, index: number): string | number => {
    if (typeof rowKey === 'function') return rowKey(row, index);
    if (rowKey) return String(getValue(row, rowKey));
    return index;
  };

  const handleSort = (key: string) => {
    if (!onSort) return;
    const next: SortDirection =
      sortKey !== key ? 'asc' : sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc';
    onSort(key, next);
  };

  const columnClasses = (column: TableColumn<T>) =>
    `${alignClasses[column.align ?? 'left']} ${column.hideOnMobile ? 'hidden md:table-cell' : ''}`;

  const isEmpty = !loading && !error && (empty || data.length === 0);

  const renderBody = () => {
    if (loading) {
      return Array.from({ length: loadingRows }, (_, rowIndex) => (
        <tr key={`skeleton-${rowIndex}`}>
          {columns.map((column) => (
            <td key={column.key} className={`px-4 py-4 sm:px-6 ${columnClasses(column)}`}>
              <Skeleton width={rowIndex % 2 === 0 ? '80%' : '60%'} />
            </td>
          ))}
        </tr>
      ));
    }

    if (error || isEmpty) {
      return (
        <tr>
          <td colSpan={columns.length}>
            {error ? (
              <ErrorState size="sm" description={error} onRetry={onRetry} />
            ) : (
              emptyState ?? <EmptyState size="sm" title={emptyTitle} description={emptyDescription} />
            )}
          </td>
        </tr>
      );
    }

    return data.map((row, rowIndex) => (
      <tr
        key={getRowKey(row, rowIndex)}
        onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
        onKeyDown={
          onRowClick
            ? (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onRowClick(row, rowIndex);
                }
              }
            : undefined
        }
        tabIndex={onRowClick ? 0 : undefined}
        className={`transition-colors duration-150 hover:bg-primary-50/40 ${
          onRowClick ? 'cursor-pointer focus:outline-none focus-visible:bg-primary-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500' : ''
        }`}
      >
        {columns.map((column) => {
          const value = getValue(row, column.key);
          return (
            <td
              key={column.key}
              className={`px-4 py-3.5 sm:px-6 whitespace-nowrap text-sm text-neutral-700 ${columnClasses(column)}`}
            >
              {column.render ? column.render(value, row, rowIndex) : defaultCellContent(value)}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div className={className}>
      {filters && filters.length > 0 && <TableFilters filters={filters} onFilterChange={onFilterChange} />}

      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
        {toolbar && (
          <div className="flex flex-wrap items-center gap-3 border-b border-neutral-200 px-4 py-3 sm:px-6">{toolbar}</div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full" aria-busy={loading || undefined}>
            {caption && <caption className="sr-only">{caption}</caption>}
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                {columns.map((column) => {
                  const isSorted = sortKey === column.key;
                  const direction = isSorted ? sortDirection : null;
                  const sortable = column.sortable && onSort;

                  return (
                    <th
                      key={column.key}
                      scope="col"
                      aria-sort={sortable ? toAriaSort(direction) : undefined}
                      style={{ width: column.width }}
                      className={`px-4 py-3 sm:px-6 text-xs font-semibold uppercase tracking-wider text-neutral-500 ${columnClasses(column)}`}
                    >
                      {sortable ? (
                        <button
                          type="button"
                          onClick={() => handleSort(column.key)}
                          className={`inline-flex w-full items-center gap-1 rounded uppercase tracking-wider hover:text-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${alignClasses[column.align ?? 'left']}`}
                        >
                          {column.title}
                          <SortIcon direction={direction} />
                        </button>
                      ) : (
                        column.title
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">{renderBody()}</tbody>
          </table>
        </div>
        {pagination && !error && <TablePagination {...pagination} />}
      </div>
    </div>
  );
};

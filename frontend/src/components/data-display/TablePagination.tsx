import React from 'react';
import { TablePaginationProps } from '@/types';

const controlClasses =
  'h-8 rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-700 transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white';

/** Paginação de tabelas, com seleção opcional de itens por página. */
export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  className = '',
}) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const startItem = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, total);

  return (
    <nav
      aria-label="Paginação"
      className={`flex flex-col gap-3 border-t border-neutral-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 ${className}`}
    >
      <p className="text-sm text-neutral-600" aria-live="polite">
        Mostrando <span className="font-medium text-neutral-900">{startItem}</span> a{' '}
        <span className="font-medium text-neutral-900">{endItem}</span> de{' '}
        <span className="font-medium text-neutral-900">{total}</span> resultados
      </p>
      <div className="flex flex-wrap items-center gap-3">
        {onPageSizeChange && (
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            aria-label="Itens por página"
            className={controlClasses}
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option} por página
              </option>
            ))}
          </select>
        )}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className={controlClasses}
          >
            Anterior
          </button>
          <span className="text-sm text-neutral-600 whitespace-nowrap">
            Página {currentPage} de {totalPages}
          </span>
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={controlClasses}
          >
            Próximo
          </button>
        </div>
      </div>
    </nav>
  );
};

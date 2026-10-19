'use client';

import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  badgeVariant?: 'default' | 'success' | 'warning' | 'neutral';
  actions?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  badge,
  badgeVariant = 'neutral',
  actions,
  breadcrumbs,
  className = '',
}) => {
  const badgeClasses = {
    default: 'bg-primary-100 text-primary-800',
    success: 'bg-[#E8F5EC] text-[#1F6B43]',
    warning: 'bg-amber-100 text-amber-800',
    neutral: 'bg-neutral-100 text-neutral-600',
  };

  return (
    <header className={`pb-5 border-b border-[#E3E9E4] ${className}`}>
      {/* Breadcrumbs opcionais */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Navegação estrutural" className="mb-2">
          <ol className="flex items-center gap-1.5 text-xs text-neutral-500">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {idx > 0 && (
                    <svg className="w-3.5 h-3.5 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 5 7 7-7 7" />
                    </svg>
                  )}
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-[#2E9658] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2E9658] rounded px-1"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isLast ? 'font-semibold text-neutral-800' : ''}>
                      {crumb.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}

      {/* Linha principal: Título + Badge + Ações */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#202522]">
              {title}
            </h1>
            {badge && (
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${badgeClasses[badgeVariant]}`}>
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-sm text-[#6F7771]">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
};

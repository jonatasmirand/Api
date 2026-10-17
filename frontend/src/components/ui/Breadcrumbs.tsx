import React from 'react';
import Link from 'next/link';
import { BreadcrumbsProps } from '@/types';

const DefaultSeparator = () => (
  <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);

const linkClasses =
  'rounded text-neutral-500 hover:text-primary-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500';

/** Trilha de navegação. O último item é tratado como a página atual. */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator,
  ariaLabel = 'Trilha de navegação',
  className = '',
}) => {
  if (items.length === 0) return null;

  return (
    <nav aria-label={ariaLabel} className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="font-medium text-neutral-900">
                  {item.label}
                </span>
              ) : item.href ? (
                <Link href={item.href} className={linkClasses} onClick={item.onClick}>
                  {item.label}
                </Link>
              ) : item.onClick ? (
                <button type="button" onClick={item.onClick} className={linkClasses}>
                  {item.label}
                </button>
              ) : (
                <span className="text-neutral-500">{item.label}</span>
              )}
              {!isLast && (separator ?? <DefaultSeparator />)}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

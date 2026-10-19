'use client';

import React from 'react';
import Link from 'next/link';

export interface SidebarNavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  badge?: string;
  badgeVariant?: 'default' | 'success' | 'warning' | 'neutral';
  disabled?: boolean;
  onClick?: () => void;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  href,
  label,
  icon,
  isActive = false,
  badge,
  badgeVariant = 'neutral',
  disabled = false,
  onClick,
}) => {
  const badgeColors = {
    default: 'bg-primary-100 text-primary-800',
    success: 'bg-[#E8F5EC] text-[#1F6B43]',
    warning: 'bg-amber-100 text-amber-800',
    neutral: 'bg-neutral-100 text-neutral-600',
  };

  const content = (
    <>
      {/* Indicador visual de rota ativa na borda esquerda */}
      {isActive && (
        <span
          className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#2E9658] rounded-r-md"
          aria-hidden="true"
        />
      )}

      {/* Ícone */}
      <span
        className={`flex-shrink-0 w-5 h-5 transition-colors ${
          isActive
            ? 'text-[#2E9658]'
            : disabled
            ? 'text-neutral-400'
            : 'text-neutral-500 group-hover:text-neutral-800'
        }`}
        aria-hidden="true"
      >
        {icon}
      </span>

      {/* Rótulo */}
      <span className="flex-1 truncate text-left">{label}</span>

      {/* Badge opcional (ex: "Em breve") */}
      {badge && (
        <span
          className={`ml-auto text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${badgeColors[badgeVariant]}`}
        >
          {badge}
        </span>
      )}
    </>
  );

  const baseClasses = `group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9658] ${
    isActive
      ? 'bg-[#E8F5EC] text-[#1F6B43] font-semibold shadow-xs'
      : disabled
      ? 'text-neutral-400 cursor-not-allowed bg-transparent'
      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80 active:bg-neutral-100'
  }`;

  if (disabled) {
    return (
      <div
        className={baseClasses}
        aria-disabled="true"
        title={`${label} (Disponível em breve)`}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={baseClasses}
      aria-current={isActive ? 'page' : undefined}
    >
      {content}
    </Link>
  );
};

'use client';

import React from 'react';

export interface SidebarOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SidebarOverlay: React.FC<SidebarOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-neutral-900/40 backdrop-blur-xs transition-opacity md:hidden animate-fade-in"
      onClick={onClose}
      aria-hidden="true"
    />
  );
};

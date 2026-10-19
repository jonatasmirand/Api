'use client';

import React from 'react';

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = '',
  fluid = false,
}) => {
  return (
    <div className={`w-full overflow-x-hidden ${fluid ? 'px-4 sm:px-6 lg:px-8 py-6' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'} space-y-6 sm:space-y-8 ${className}`}>
      {children}
    </div>
  );
};

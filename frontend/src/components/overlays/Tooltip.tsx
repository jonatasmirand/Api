'use client';

import React, { useState } from 'react';
import { TooltipProps } from '@/types';

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  delay = 200,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsVisible(false);
  };

  const placementClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-black border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-black border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-l-black border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-r-black border-t-transparent border-b-transparent border-l-transparent',
  };

  return (
    <div className={`relative inline-block ${className}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {isVisible && (
        <div className={`absolute z-50 px-3 py-1.5 text-sm text-white bg-neutral-900 rounded shadow-lg whitespace-nowrap ${placementClasses[placement]}`}>
          {content}
          <div className={`absolute w-0 h-0 border-4 ${arrowClasses[placement]}`} />
        </div>
      )}
    </div>
  );
};

'use client';

import React from 'react';
import { AvatarProps } from '@/types';

const sizeClasses = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl',
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  fallback,
  className = '',
}) => {
  const [imageError, setImageError] = React.useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeClass = sizeClasses[size];

  if (src && !imageError) {
    return (
      // `<img>` intencional: avatares podem vir de URLs arbitrárias, o que exigiria
      // configurar `images.remotePatterns` para usar `next/image`.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        onError={() => setImageError(true)}
        className={`${sizeClass} rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`${sizeClass} rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-medium ${className}`}
    >
      {fallback || getInitials(alt)}
    </div>
  );
};

import React from 'react';

interface SimpleIconProps {
  path: string;
  size?: number;
  title?: string;
  className?: string;
}
export function SimpleIcon({
  path,
  size = 24,
  title,
  className = '',
}: SimpleIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={!title}
    >
      {title && <title>{title}</title>}
      <path d={path} />
    </svg>
  );
}

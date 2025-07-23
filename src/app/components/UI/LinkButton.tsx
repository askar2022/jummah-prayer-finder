'use client';

import React from 'react';
import clsx from 'clsx';

interface LinkButtonProps {
  children: React.ReactNode;
  href: string;
  target?: string;
  rel?: string;
  className?: string;
}

export default function LinkButton({
  children,
  href,
  target,
  rel,
  className = ''
}: LinkButtonProps) {
  const baseClass = clsx(
    'bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 inline-block text-center no-underline',
    className
  );

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={baseClass}
    >
      {children}
    </a>
  );
} 
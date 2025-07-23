'use client';

import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
  className?: string;
  target?: string;
  rel?: string;
}

export default function Button({
  children,
  as = 'button',
  href,
  onClick,
  type = 'button',
  className = '',
  target,
  rel,
  ...rest
}: ButtonProps) {
  const baseClass = clsx(
    'bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium py-2 px-4 rounded-md transition duration-200',
    className
  );

  if (as === 'a' && href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={baseClass}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClass} {...rest}>
      {children}
    </button>
  );
}

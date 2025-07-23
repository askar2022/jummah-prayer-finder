'use client';

import React from 'react';
import clsx from 'clsx';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={clsx('max-w-4xl mx-auto px-4', className)}>
      {children}
    </div>
  );
};
export default Container;

'use client';

import React from 'react';
import clsx from 'clsx';

interface SectionTitleProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

const SectionTitle = ({ title, children, className = '' }: SectionTitleProps) => {
  return (
    <h2 className={clsx('text-2xl font-semibold mb-4 text-center', className)}>
      {title || children}
    </h2>
  );
};

export default SectionTitle;

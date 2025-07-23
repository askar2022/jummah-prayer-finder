// components/UI/Badge.tsx
import React from 'react';

interface BadgeProps {
  label: string;
  color?: string;
}

export function Badge({ label, color = 'bg-blue-100 text-blue-800' }: BadgeProps) {
  return (
    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${color}`}>{label}</span>
  );
}
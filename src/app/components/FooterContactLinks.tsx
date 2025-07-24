'use client';

import React from 'react';

interface FooterContactLinksProps {
  onContactClick: () => void;
}

export default function FooterContactLinks({ onContactClick }: FooterContactLinksProps) {
  return (
    <div>
      <button
        onClick={onContactClick}
        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
      >
        <span className="text-sm">📧</span>
        Contact Us
      </button>
    </div>
  );
} 
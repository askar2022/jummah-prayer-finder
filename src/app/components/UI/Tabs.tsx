// components/UI/Tabs.tsx
import React, { useState } from 'react';

interface TabProps {
  labels: string[];
  children: React.ReactNode[];
}

export function Tabs({ labels, children }: TabProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex space-x-2 mb-4 border-b">
        {labels.map((label, idx) => (
          <button
            key={label}
            className={`px-4 py-2 text-sm font-medium ${idx === active ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActive(idx)}
          >
            {label}
          </button>
        ))}
      </div>
      <div>{children[active]}</div>
    </div>
  );
}
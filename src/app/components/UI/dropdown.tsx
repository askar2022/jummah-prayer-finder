// components/UI/Dropdown.tsx
import React, { useState } from 'react';

interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
}

const Dropdown = ({ label, options, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(label);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-64">
      <button
        className="w-full bg-white border border-[var(--border-color)] px-4 py-2 rounded-md text-left shadow-sm hover:shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected} ▼
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-[var(--border-color)] rounded-md shadow-md">
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
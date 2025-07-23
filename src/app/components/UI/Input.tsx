// components/UI/Input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default Input;

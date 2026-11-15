import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button 
      className={`flex items-center justify-center rounded-xl px-4 py-2 font-semibold text-white transition-colors duration-200 ease-in-out ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}
import React from 'react';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'danger' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-xl font-bold text-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20",
    success: "bg-green-600 text-white hover:bg-green-500 shadow-lg shadow-green-900/20",
    danger: "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-900/20",
    outline: "border-2 border-gray-600 text-gray-300 hover:bg-gray-800"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

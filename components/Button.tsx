
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="w-full flex items-center justify-center px-4 py-3 bg-sky-600 text-white font-bold rounded-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 transition-colors duration-200 ease-in-out disabled:bg-sky-800 disabled:text-sky-400/50 disabled:cursor-not-allowed"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

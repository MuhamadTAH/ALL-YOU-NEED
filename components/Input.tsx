
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

const Input: React.FC<InputProps> = ({ id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="sr-only">Enter a name</label>
      <input
        id={id}
        type="text"
        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        {...props}
      />
    </div>
  );
};

export default Input;

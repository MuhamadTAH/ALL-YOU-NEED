
import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl shadow-sky-900/10 p-6 sm:p-8">
      {children}
    </div>
  );
};

export default Card;

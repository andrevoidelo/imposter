import { type ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card = ({ children, className, onClick }: CardProps) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "bg-bg-card rounded-3xl p-6 shadow-xl border border-white/5",
        onClick && "cursor-pointer hover:bg-slate-800 transition-colors",
        className
      )}
    >
      {children}
    </div>
  );
};

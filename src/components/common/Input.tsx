import { type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ className, label, ...props }: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1">
          {label}
        </label>
      )}
      <input
        className={cn(
          "bg-bg-elevated border-2 border-transparent focus:border-primary-500 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted w-full outline-none transition-colors",
          className
        )}
        {...props}
      />
    </div>
  );
};

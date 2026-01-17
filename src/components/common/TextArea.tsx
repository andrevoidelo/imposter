import { type TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const TextArea = ({ className, label, ...props }: TextAreaProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "bg-bg-elevated border-2 border-transparent focus:border-primary-500 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted w-full outline-none transition-colors resize-none",
          className
        )}
        {...props}
      />
    </div>
  );
};

import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl text-lg font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-dark",
  {
    variants: {
      variant: {
        primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/25",
        secondary: "bg-bg-elevated hover:bg-slate-600 text-text-primary border border-white/5",
        danger: "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25",
        ghost: "bg-transparent hover:bg-white/5 text-text-secondary hover:text-text-primary",
      },
      size: {
        sm: "h-10 px-4 text-sm rounded-xl",
        md: "h-14 px-8",
        lg: "h-16 px-10 text-xl",
        icon: "h-12 w-12",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  isLoading?: boolean;
}

export const Button = ({
  className,
  variant,
  size,
  fullWidth,
  isLoading,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin mr-2">⏳</span>
      ) : null}
      {children}
    </button>
  );
};

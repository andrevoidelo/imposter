import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  withPadding?: boolean;
}

export const PageWrapper = ({ children, className, withPadding = true }: PageWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`min-h-full p-4 flex flex-col max-w-md mx-auto w-full ${className}`}
      style={withPadding ? {
        paddingTop: 'calc(var(--safe-area-inset-top, 0px) + 4.5rem)', // safe area + TopBar height (h-14 = 3.5rem) + 1rem gap
        paddingBottom: 'calc(var(--safe-area-inset-bottom, 0px) + 5rem)', // safe area + FixedFooter approximate height
      } : {
        paddingTop: 'var(--safe-area-inset-top, 0px)',
        paddingBottom: 'var(--safe-area-inset-bottom, 0px)',
      }}
    >
      {children}
    </motion.div>
  );
};

import { type ReactNode } from 'react';

interface FixedFooterProps {
  children: ReactNode;
}

export const FixedFooter = ({ children }: FixedFooterProps) => {
  return (
    <div
      className="fixed left-0 right-0 p-4 bg-bg-dark/80 backdrop-blur-lg border-t border-text-primary/5 z-30"
      style={{ bottom: 'var(--safe-area-inset-bottom, 0px)' }}
    >
      <div className="max-w-md mx-auto">
        {children}
      </div>
    </div>
  );
};

import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { ArrowLeft } from 'lucide-react';

interface TopBarProps {
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export const TopBar = ({ title, onBack, rightElement }: TopBarProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  return (
    <div
      className="fixed left-0 right-0 z-20 bg-bg-dark/80 backdrop-blur-lg border-b border-text-primary/5 py-2 px-4 h-14"
      style={{ top: 'var(--safe-area-inset-top, 0px)' }}
    >
      <div className="max-w-md mx-auto flex items-center justify-between h-full">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBack} className="h-10 w-10">
            <ArrowLeft size={20} />
          </Button>
          {title && <h1 className="text-2xl font-bold font-display line-clamp-1">{title}</h1>}
        </div>
        {rightElement}
      </div>
    </div>
  );
};

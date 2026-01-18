import { useGameStore } from '../../contexts/useGameStore';
import { Button } from './Button';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ThemeSwitcherProps {
    className?: string;
    style?: React.CSSProperties;
}

export const ThemeSwitcher = ({ className, style }: ThemeSwitcherProps) => {
  const { settings, updateSettings } = useGameStore();
  
  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleTheme}
      className={cn(
        "bg-bg-elevated/50 backdrop-blur-md border border-text-primary/10 h-10 w-12 px-0 flex items-center justify-center shadow-lg",
        className
      )}
      style={style}
    >
      {settings.theme === 'dark' ? (
        <Moon size={20} className="text-primary-400" />
      ) : (
        <Sun size={20} className="text-warning" />
      )}
    </Button>
  );
};

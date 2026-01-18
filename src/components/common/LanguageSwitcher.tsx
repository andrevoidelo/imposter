import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { cn } from '../../utils/cn';

interface LanguageSwitcherProps {
  className?: string;
  style?: React.CSSProperties;
}

export const LanguageSwitcher = ({ className, style }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    // Check if current language starts with 'pt' (could be 'pt', 'pt-BR', etc.)
    const newLang = i18n.language.startsWith('pt') ? 'en' : 'pt';
    i18n.changeLanguage(newLang);
  };

  const getLangDisplay = () => {
    const lang = i18n.language ? i18n.language.substring(0, 2).toLowerCase() : 'pt';
    if (lang === 'pt') return { code: 'PT', flag: '🇧🇷' };
    return { code: 'EN', flag: '🇺🇸' };
  };

  const display = getLangDisplay();

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage}
      className={cn(
        "fixed right-4 z-50 bg-bg-elevated/50 backdrop-blur-md border border-text-primary/10 uppercase font-bold text-sm h-10 px-4 gap-2 shadow-lg",
        className
      )}
      style={{ top: 'calc(var(--safe-area-inset-top, 0px) + 1rem)', ...style }}
    >
      <span>{display.code}</span>
      <span className="text-xl">{display.flag}</span>
    </Button>
  );
};

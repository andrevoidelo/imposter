import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../contexts/useGameStore';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/common/Button';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';
import { ThemeSwitcher } from '../components/common/ThemeSwitcher';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { settings } = useGameStore();
  const isDark = settings.theme === 'dark';

  return (
    <PageWrapper className="flex flex-col items-center justify-center space-y-12">
      <LanguageSwitcher />
      <ThemeSwitcher className="fixed top-4 left-4 z-50" />
      
      <div className="text-center space-y-4 animate-in fade-in slide-in-from-top-8 duration-700">
        <img src="/spy.svg" className={`w-32 h-32 mb-4 mx-auto ${isDark ? 'invert' : 'opacity-70'}`} alt="Spy" />
        <h1 className={`text-5xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-white to-primary-400' : 'from-black to-slate-500'}`}>
          {t('home.title')}
        </h1>
        <p className="text-text-secondary text-sm max-w-[250px] mx-auto">
          "{t('home.subtitle')}"
        </p>
      </div>

      <div className="w-full space-y-4">
        <Button 
          fullWidth 
          size="lg" 
          onClick={() => navigate('/setup')}
          className="bg-gradient-to-r from-primary-500 to-primary-600"
        >
          {t('home.newGame')}
        </Button>
        
        <Button 
          fullWidth 
          variant="secondary"
          onClick={() => navigate('/how-to-play')}
        >
          {t('home.howToPlay')}
        </Button>
      </div>
      
      <div className="text-text-muted text-xs absolute flex flex-col items-center gap-1 bottom-8">
        <span>v1.0.0</span>
        <span className="opacity-60">André Ricardo Voidelo</span>
      </div>
    </PageWrapper>
  );
}
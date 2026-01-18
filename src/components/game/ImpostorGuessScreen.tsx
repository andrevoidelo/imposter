import { Button } from '../common/Button';
import { useGameStore } from '../../contexts/useGameStore';
import { useTranslation } from 'react-i18next';
import { Check, X } from 'lucide-react';

export const ImpostorGuessScreen = () => {
  const { resolveImpostorGuess, eliminatedPlayers, players, settings } = useGameStore();
  const { t } = useTranslation();
  
  const lastEliminatedId = eliminatedPlayers[eliminatedPlayers.length - 1];
  const impostorName = players.find(p => p.id === lastEliminatedId)?.name || 'O Impostor';
  const isDark = settings.theme === 'dark';

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-center items-center text-center p-6 bg-bg-dark"
      style={{
        paddingTop: 'calc(var(--safe-area-inset-top, 0px) + 1.5rem)',
        paddingBottom: 'calc(var(--safe-area-inset-bottom, 0px) + 1.5rem)',
      }}
    >
      <div className="space-y-4 mb-12 animate-in fade-in zoom-in duration-500">
        <img src="/spy.svg" className={`w-32 h-32 mb-6 mx-auto ${isDark ? 'invert' : 'opacity-70'}`} alt="Spy" />
        <h1 className="text-4xl font-bold font-display text-danger uppercase leading-tight">
          {t('game.impostorGuess.found', { name: impostorName })}
        </h1>
        <div className="h-1 w-24 bg-warning/30 mx-auto rounded-full my-6" />
        <p className="text-xl text-text-primary font-medium px-4">
          {t('game.impostorGuess.chance')}
        </p>
      </div>

      <div className="w-full max-w-[320px] space-y-4">
        <p className="text-sm text-text-muted mb-4 uppercase tracking-wider">{t('game.impostorGuess.prompt')}</p>
        
        <Button 
          fullWidth 
          size="lg" 
          onClick={() => resolveImpostorGuess(true)} 
          className="bg-success hover:bg-green-600 text-white shadow-xl shadow-success/20 h-20 text-2xl"
        >
          <Check className="mr-3 w-8 h-8" strokeWidth={3} />
          {t('game.impostorGuess.correct')}
        </Button>
        
        <Button 
          fullWidth 
          size="lg" 
          onClick={() => resolveImpostorGuess(false)} 
          className="bg-danger hover:bg-red-600 text-white shadow-xl shadow-danger/20 h-20 text-2xl"
        >
          <X className="mr-3 w-8 h-8" strokeWidth={3} />
          {t('game.impostorGuess.wrong')}
        </Button>
      </div>
    </div>
  );
};

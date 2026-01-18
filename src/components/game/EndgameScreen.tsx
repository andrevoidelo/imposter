import { Button } from '../common/Button';
import { useGameStore } from '../../contexts/useGameStore';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RotateCcw, Home } from 'lucide-react';
import { FixedFooter } from '../layout/FixedFooter';

interface EndgameScreenProps {
  eliminatedPlayerId: string;
}

export const EndgameScreen = ({ eliminatedPlayerId }: EndgameScreenProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { players, winner, secretWord, playAgain, resetGame } = useGameStore();

  const eliminatedPlayer = players.find(p => p.id === eliminatedPlayerId);
  const impostors = players.filter(p => p.role === 'impostor' || p.role === 'undercover' || p.role === 'mrwhite');
  const impostorNames = impostors.map(p => p.name).join(', ');
  
  let bgColor = 'bg-bg-dark';
  let title = '';
  let subtitle = '';
  let icon = '';

  if (winner === 'citizens') {
    bgColor = 'bg-success';
    title = t('game.endgame.citizensWin');
    subtitle = t('game.endgame.impostorWas', { name: eliminatedPlayer?.name });
    icon = '/mute.svg';
  } else {
    // Impostors win
    bgColor = 'bg-danger';
    title = t('game.endgame.impostorWins');
    subtitle = '';
    icon = '/spy.svg';
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-center items-center text-center ${bgColor} text-white animate-in fade-in duration-500`}
      style={{
        paddingTop: 'calc(var(--safe-area-inset-top, 0px) + 1.5rem)',
        paddingBottom: 'calc(var(--safe-area-inset-bottom, 0px) + 1.5rem)',
      }}
    >
      {/* Main Content Area */}
      <div className="w-full flex-1 flex flex-col justify-center items-center px-6 overflow-y-auto no-scrollbar">
        <div className="mb-6 shrink-0">
          {icon.startsWith('/') ? (
            <img src={icon} className="w-32 h-32 invert" alt="Icon" />
          ) : (
            <div className="text-8xl">{icon}</div>
          )}
        </div>
        <h1 className="text-4xl font-bold font-display mb-2 leading-tight tracking-tight shrink-0">{title}</h1>
        {subtitle && <p className="text-xl opacity-90 mb-8 shrink-0">{subtitle}</p>}
        
        <div className="w-full max-w-xs space-y-4 mb-8 shrink-0">
          {/* Impostor Reveal Box */}
          <div className="bg-black/20 p-4 rounded-xl w-full backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-300">
              <p className="text-sm opacity-75 uppercase tracking-wider mb-1">{t('game.endgame.impostorIdentity')}</p>
              <p className="text-3xl font-bold uppercase">{impostorNames}</p>
          </div>

          {/* Secret Word Box */}
          <div className="bg-black/20 p-4 rounded-xl w-full backdrop-blur-sm">
              <p className="text-sm opacity-75 uppercase tracking-wider mb-1">{t('game.endgame.secretWord')}</p>
              <p className="text-3xl font-bold uppercase">{secretWord}</p>
          </div>
        </div>

        {/* Menu Principal Button */}
        <Button 
          variant="ghost" 
          onClick={() => { resetGame(); navigate('/'); }} 
          className="text-white hover:bg-white/10 px-8 h-12 text-lg shrink-0"
        >
          <Home className="mr-2" size={20} />
          {t('game.endgame.mainMenu')}
        </Button>
      </div>

      {/* Primary Action Button - Matches RoleReveal EXACTLY */}
      <FixedFooter>
        <Button 
          fullWidth 
          size="lg" 
          onClick={() => { playAgain(); }} 
          className="bg-white text-black hover:bg-gray-200 shadow-xl h-16 text-xl font-bold"
        >
          <RotateCcw className="mr-2" size={24} strokeWidth={2.5} />
          {t('game.endgame.playAgain')}
        </Button>
      </FixedFooter>
    </div>
  );
};

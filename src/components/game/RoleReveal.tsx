import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { type Player } from '../../types/player';
import { useGameStore } from '../../contexts/useGameStore';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { TopBar } from '../layout/TopBar';
import { Eye } from 'lucide-react';
import { soundService } from '../../services/soundService';

interface RoleRevealProps {
  player: Player;
  onConfirm: () => void;
  secretWord: string;
  category: string;
  undercoverWord?: string;
  confusedWord?: string;
}

export const RoleReveal = ({ player, onConfirm, secretWord, category, undercoverWord, confusedWord }: RoleRevealProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { settings } = useGameStore();
  const [isRevealed, setIsRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const requestRef = useRef<number>(0);

  const isDark = settings.theme === 'dark';

  const startHold = () => {
    const startTime = Date.now();
    const duration = 1000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(100, (elapsed / duration) * 100);
      setProgress(p);

      if (p < 100) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setIsRevealed(true);
        soundService.playCardFlip();
        setProgress(0);
        if (navigator.vibrate) navigator.vibrate(50);
      }
    };
    
    requestRef.current = requestAnimationFrame(animate);
  };

  const endHold = () => {
    cancelAnimationFrame(requestRef.current);
    setProgress(0);
  };

  const getRoleContent = () => {
    const iconClass = `w-24 h-24 mb-4 mx-auto ${isDark ? 'invert' : 'opacity-70'}`;

    switch (player.role) {
      case 'citizen':
        return (
          <>
            <img src="/mute.svg" className={iconClass} alt="Mute" />
            <h3 className="text-xl text-text-secondary mb-2">{t('game.roles.yourWord')}</h3>
            <div className="text-3xl font-bold text-primary-400 mb-4 tracking-wide break-words px-2">{secretWord}</div>
            <div className="text-sm bg-bg-elevated px-3 py-1.5 rounded-full inline-block text-text-muted">
              {t('game.roles.category', { category })}
            </div>
          </>
        );
      case 'confused':
        return (
          <>
            <img src="/mute.svg" className={iconClass} alt="Mute" />
            <h3 className="text-xl text-text-secondary mb-2">{t('game.roles.yourWord')}</h3>
            <div className="text-3xl font-bold text-primary-400 mb-4 tracking-wide break-words px-2">{confusedWord || secretWord}</div>
            <div className="text-sm bg-bg-elevated px-3 py-1.5 rounded-full inline-block text-text-muted">
              {t('game.roles.category', { category })}
            </div>
          </>
        );
      case 'undercover':
        return (
          <>
            <img src="/spy.svg" className={iconClass} alt="Spy" />
            <h3 className="text-3xl font-bold text-role-impostor mb-2 leading-tight px-2">{t('game.roles.impostorTitle')}</h3>
            <p className="text-base text-text-secondary mb-1">{t('game.roles.yourWord')}</p>
            <div className="text-3xl font-bold text-warning mb-2 tracking-wide break-words px-2">{undercoverWord || secretWord}</div>
          </>
        );
      case 'impostor':
        return (
          <>
            <img src="/spy.svg" className={iconClass} alt="Spy" />
            <h3 className="text-3xl font-bold text-role-impostor mb-4 leading-tight px-2">{t('game.roles.impostorTitle')}</h3>
            <p className="text-base text-text-secondary px-4">
              {t('game.roles.impostorDesc')}
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 flex flex-col justify-between items-center text-center overflow-hidden"
      style={{
        paddingTop: 'calc(var(--safe-area-inset-top, 0px) + 3.5rem)',
        paddingBottom: 'calc(var(--safe-area-inset-bottom, 0px) + 1rem)',
      }}
    >
      <TopBar title="" onBack={() => navigate('/setup')} />

      {/* Header Info */}
      <div className="space-y-1 pt-4 animate-in fade-in duration-700 shrink-0">
        <h2 className="text-base text-text-secondary uppercase tracking-widest">{t('game.roles.passTo')}</h2>
        <h1 className="text-4xl font-bold text-primary-500">{player.name}</h1>
      </div>

      {/* The Card Container */}
      <div className="w-full max-w-[320px] flex-1 max-h-[60vh] relative perspective-1000 my-4 px-4">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="hidden"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: (progress / 100) * 30, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: progress > 0 ? 0.1 : 0.4, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full touch-none select-none"
              onPointerDown={startHold}
              onPointerUp={endHold}
              onPointerLeave={endHold}
              onContextMenu={(e) => e.preventDefault()}
            >
              <Card 
                className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center cursor-pointer border-2 border-primary-500/30 hover:border-primary-500 transition-all bg-gradient-to-br from-bg-card to-bg-elevated shadow-[0_20px_50px_rgba(0,0,0,0.5)] active:scale-[0.98]"
              >
                {/* Progress Overlay */}
                <div 
                    className="absolute bottom-0 left-0 right-0 bg-primary-500/30 transition-all duration-75 ease-linear pointer-events-none"
                    style={{ height: `${progress}%` }}
                />

                <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
                    <div className="bg-primary-500/10 p-8 rounded-full mb-8 animate-pulse">
                      <Eye size={64} className="text-primary-500" />
                    </div>
                    <span className="font-semibold text-2xl mb-2">{t('game.roles.holdToReveal')}</span>
                    <span className="text-sm text-text-muted px-6">{t('game.roles.keepHolding')}</span>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
               <Card className={`w-full h-full flex flex-col items-center justify-center border-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${(player.role === 'impostor' || player.role === 'undercover') ? 'border-role-impostor/50 bg-role-impostor/5' : 'border-primary-500/50'}`}>
                 {getRoleContent()}
               </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Button */}
      <div className="w-full max-w-[320px] px-4 shrink-0">
        {isRevealed ? (
          <Button
            fullWidth
            size="lg"
            onClick={onConfirm}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-14 text-lg shadow-xl shadow-primary-500/20"
          >
            {t('game.roles.understood')}
          </Button>
        ) : (
          <div className="h-14 flex items-center justify-center">
             <p className="text-text-muted text-sm italic animate-pulse">
               {progress > 0 ? t('game.roles.revealing') : t('game.roles.waiting')}
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

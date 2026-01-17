import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { type Player } from '../../types/player';
import { useGameStore } from '../../contexts/useGameStore';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { TopBar } from '../layout/TopBar';
import { FixedFooter } from '../layout/FixedFooter';
import { Eye } from 'lucide-react';

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
    const iconClass = `w-32 h-32 mb-8 mx-auto ${isDark ? 'invert' : 'opacity-70'}`;
    
    switch (player.role) {
      case 'citizen':
        return (
          <>
            <img src="/mute.svg" className={iconClass} alt="Mute" />
            <h3 className="text-2xl text-text-secondary mb-4">{t('game.roles.yourWord')}</h3>
            <div className="text-5xl font-bold text-primary-400 mb-6 tracking-wide">{secretWord}</div>
            <div className="text-base bg-bg-elevated px-4 py-2 rounded-full inline-block text-text-muted">
              {t('game.roles.category', { category })}
            </div>
          </>
        );
      case 'confused':
        return (
          <>
            <img src="/mute.svg" className={iconClass} alt="Mute" />
            <h3 className="text-2xl text-text-secondary mb-4">{t('game.roles.yourWord')}</h3>
            <div className="text-5xl font-bold text-primary-400 mb-6 tracking-wide">{confusedWord || secretWord}</div>
            <div className="text-base bg-bg-elevated px-4 py-2 rounded-full inline-block text-text-muted">
              {t('game.roles.category', { category })}
            </div>
          </>
        );
      case 'undercover':
        return (
          <>
            <img src="/spy.svg" className={iconClass} alt="Spy" />
            <h3 className="text-4xl font-bold text-role-impostor mb-4 leading-tight px-4">{t('game.roles.impostorTitle')}</h3>
            <p className="text-lg text-text-secondary mb-2">{t('game.roles.yourWord')}</p>
            <div className="text-5xl font-bold text-warning mb-4 tracking-wide">{undercoverWord || secretWord}</div>
          </>
        );
      case 'impostor':
        return (
          <>
            <img src="/spy.svg" className={iconClass} alt="Spy" />
            <h3 className="text-4xl font-bold text-role-impostor mb-6 leading-tight px-4">{t('game.roles.impostorTitle')}</h3>
            <p className="text-lg text-text-secondary px-6">
              {t('game.roles.impostorDesc')}
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center py-6 h-full">
      <TopBar title="" onBack={() => navigate('/setup')} />
      
      {/* Header Info */}
      <div className="space-y-2 mb-8 animate-in fade-in duration-700">
        <h2 className="text-lg text-text-secondary uppercase tracking-widest">{t('game.roles.passTo')}</h2>
        <h1 className="text-5xl font-bold text-primary-500">{player.name}</h1>
      </div>

      {/* The Card Container */}
      <div className="w-full max-w-[320px] aspect-[2/3] relative perspective-1000 mb-12">
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
      {isRevealed ? (
        <FixedFooter>
          <Button 
            fullWidth 
            size="lg" 
            onClick={onConfirm} 
            className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-16 text-xl shadow-xl shadow-primary-500/20"
          >
            {t('game.roles.understood')}
          </Button>
        </FixedFooter>
      ) : (
        <div className="w-full max-w-[320px] h-16 flex items-center justify-center">
           <p className="text-text-muted text-sm italic animate-pulse">
             {progress > 0 ? t('game.roles.revealing') : t('game.roles.waiting')}
           </p>
        </div>
      )}
    </div>
  );
};

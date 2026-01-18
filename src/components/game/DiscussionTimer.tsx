import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { TopBar } from '../layout/TopBar';
import { FixedFooter } from '../layout/FixedFooter';
import { Play, Pause } from 'lucide-react';

interface DiscussionTimerProps {
  duration: number; // seconds
  onComplete: () => void;
}

export const DiscussionTimer = ({ duration, onComplete }: DiscussionTimerProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / duration) * 100;
  const isUrgent = timeLeft < 10 && timeLeft > 0;

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{
        paddingTop: 'calc(var(--safe-area-inset-top, 0px) + 3.5rem)',
        paddingBottom: 'calc(var(--safe-area-inset-bottom, 0px) + 5.5rem)',
      }}
    >
      <TopBar title={t('game.discussion.title')} onBack={() => navigate('/setup')} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center px-4">
        {/* Instruction Text - at top */}
        <div className="text-center pt-6 mb-auto animate-in fade-in duration-700">
          <p className="text-xl text-text-secondary font-medium">
            {t('game.discussion.subtitle')}
          </p>
        </div>

        {/* Centered Clock Section - fixed size to prevent layout shifts */}
        <div className="flex flex-col items-center justify-center mb-auto">
          <div className="w-[280px] h-[280px] flex items-center justify-center relative mb-6">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90 drop-shadow-2xl" viewBox="0 0 100 100">
              <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  className="text-bg-elevated/30"
              />
              <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray="282.7"
                  strokeDashoffset={282.7 * (1 - progress / 100)}
                  strokeLinecap="round"
                  className={`transition-all duration-1000 ${isUrgent ? 'text-red-500 animate-pulse' : 'text-primary-500'}`}
              />
              </svg>

              <div className={`relative z-10 text-7xl font-bold font-mono tracking-tighter ${isUrgent ? 'text-red-500' : 'text-text-primary'}`}>
              {timeLeft === 0 ? "0:00" : formatTime(timeLeft)}
              </div>
          </div>

          {/* Pause Button below the clock */}
          <Button
            variant="secondary"
            onClick={toggleTimer}
            className="h-12 px-8 gap-2 text-lg rounded-xl transition-all duration-300 active:scale-95 border-text-primary/10"
            disabled={timeLeft === 0}
          >
            {isActive ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
            {isActive ? t('game.discussion.pause') : t('game.discussion.resume')}
          </Button>
        </div>
      </div>

      {/* Consistent Footer Button Area */}
      <FixedFooter>
         <div className="w-full space-y-4">
            {timeLeft === 0 && (
                <Card className="bg-red-500/10 border-red-500/50 text-center animate-bounce py-4">
                    <h3 className="text-xl font-bold text-red-500">{t('game.discussion.timeUp')}</h3>
                    <p className="text-sm">{t('game.discussion.voteNow')}</p>
                </Card>
            )}

            <Button
                fullWidth
                size="lg"
                onClick={onComplete}
                variant="primary"
                className="h-16 text-xl shadow-xl shadow-primary-500/20 font-bold tracking-wide"
            >
                {t('game.discussion.voteButton')}
            </Button>
         </div>
      </FixedFooter>
    </div>
  );
};

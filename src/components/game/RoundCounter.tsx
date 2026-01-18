import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { TopBar } from '../layout/TopBar';
import { FixedFooter } from '../layout/FixedFooter';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

interface RoundCounterProps {
  currentRound: number;
  totalRounds: number;
  onNext: () => void;
  isLastRound: boolean;
}

export const RoundCounter = ({ currentRound, totalRounds, onNext, isLastRound }: RoundCounterProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{
        paddingTop: 'calc(var(--safe-area-inset-top, 0px) + 3.5rem)',
        paddingBottom: 'calc(var(--safe-area-inset-bottom, 0px) + 5.5rem)',
      }}
    >
      <TopBar title={t('game.rounds.title')} onBack={() => navigate('/setup')} />

      {/* Main Content Area - Centered */}
      <div className="flex-1 flex flex-col items-center px-4 pt-4">
        {/* Round Indicators Card */}
        <div className="w-full max-w-[320px] mb-8">
           <Card className="bg-bg-elevated/50 border-none p-6 shadow-xl flex flex-col items-center">
             <h3 className="text-xl text-text-secondary mb-6 uppercase tracking-widest font-semibold">
               {t('game.rounds.roundsTitle')}
             </h3>
             <div className="flex items-center gap-6">
               {Array.from({ length: totalRounds }).map((_, i) => {
                 const roundNum = i + 1;
                 const isCurrent = roundNum === currentRound;
                 const isPast = roundNum < currentRound;
                 
                 return (
                   <div 
                     key={roundNum}
                     className={cn(
                       "w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300",
                       isCurrent ? "bg-primary-500 text-white scale-110 shadow-lg shadow-primary-500/50" : 
                       isPast ? "bg-text-muted/10 text-text-muted/50" :
                       "bg-bg-elevated border-2 border-text-muted/20 text-text-muted"
                     )}
                   >
                     {roundNum}
                   </div>
                 );
               })}
             </div>
           </Card>
        </div>

        {/* Rules Card */}
        <div className="w-full max-w-[320px]">
          <Card className="bg-bg-elevated/50 border-none space-y-6 text-left p-6 shadow-xl">
              <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold shrink-0">1</div>
                  <p className="text-text-primary leading-tight pt-1">
                      <Trans i18nKey="game.rounds.rule1" components={{ 1: <span className="font-bold text-primary-400" /> }} />
                  </p>
              </div>
              <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold shrink-0">2</div>
                  <p className="text-text-primary leading-tight pt-1">
                      {t('game.rounds.rule2')}
                  </p>
              </div>
              <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold shrink-0">3</div>
                  <p className="text-text-primary leading-tight pt-1">
                      {t('game.rounds.rule3')}
                  </p>
              </div>
          </Card>
        </div>
      </div>

      {/* Consistent Footer Button */}
      <FixedFooter>
        <Button fullWidth size="lg" onClick={onNext} className="gap-2 h-16 text-xl shadow-xl shadow-primary-500/20">
          {isLastRound ? t('game.rounds.toDiscussion') : t('game.rounds.next')}
          <ArrowRight size={24} />
        </Button>
      </FixedFooter>
    </div>
  );
};

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { TopBar } from '../layout/TopBar';
import { FixedFooter } from '../layout/FixedFooter';
import { ArrowRight } from 'lucide-react';

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
    <div className="flex-1 flex flex-col h-full">
      <TopBar title={t('game.rounds.title')} onBack={() => navigate('/setup')} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Spacer between TopBar and Round Counter */}
        <div className="flex-1" />

        {/* Animated Round Counter */}
        <div className="text-center shrink-0">
          <motion.div
            key={currentRound}
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <p className="text-4xl font-bold text-text-primary tracking-wide">
              {t('game.rounds.round')} <span className="text-primary-400">{currentRound}</span> <span className="text-text-muted text-2xl">/ {totalRounds}</span>
            </p>
          </motion.div>
        </div>

        {/* Spacer between Round Counter and Card */}
        <div className="flex-1" />

        {/* Centered Explanation Card */}
        <div className="flex-none flex items-center justify-center shrink-0 mb-8 px-4">
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

        {/* Spacer between Card and Footer */}
        <div className="flex-1" />
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

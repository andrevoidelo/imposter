import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { type Player } from '../../types/player';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { TopBar } from '../layout/TopBar';
import { FixedFooter } from '../layout/FixedFooter';
import { User } from 'lucide-react';

interface VotedSelectionProps {
  players: Player[];
  onVote: (playerId: string) => void;
}

export const VotedSelection = ({ players, onVote }: VotedSelectionProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const activePlayers = players.filter(p => !p.isEliminated);

  return (
    <div className="flex-1 flex flex-col h-full">
      <TopBar title={t('game.vote.title')} onBack={() => navigate('/setup')} />

      <div className="text-center space-y-2 mb-6 shrink-0 animate-in fade-in duration-700">
        <p className="text-text-secondary">{t('game.vote.subtitle')}</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 py-2 px-1 mb-6 custom-scrollbar -mx-2">
        {activePlayers.map((player) => (
          <Card 
            key={player.id}
            onClick={() => setSelectedId(player.id)}
            className={`
              flex items-center gap-4 p-4 transition-all border-2 cursor-pointer
              ${selectedId === player.id 
                ? 'border-primary-500 bg-primary-500/10 shadow-[0_0_20px_rgba(99,102,241,0.3)] scale-[1.02]' 
                : 'border-transparent bg-bg-elevated hover:bg-bg-elevated/80'}
            `}
          >
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-colors
              ${selectedId === player.id ? 'bg-primary-500 text-white' : 'bg-bg-dark text-text-muted'}
            `}>
              <User size={24} />
            </div>
            <span className="text-lg font-medium">{player.name}</span>
          </Card>
        ))}
      </div>

      <FixedFooter>
        <Button 
          fullWidth 
          size="lg" 
          disabled={!selectedId}
          onClick={() => selectedId && onVote(selectedId)}
          className="h-16 text-xl shadow-xl shadow-primary-500/20"
        >
          {t('game.vote.revealButton')}
        </Button>
      </FixedFooter>
    </div>
  );
};
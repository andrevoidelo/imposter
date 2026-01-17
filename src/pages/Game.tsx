import { useEffect } from 'react';
import { useGameStore } from '../contexts/useGameStore';
import { PageWrapper } from '../components/layout/PageWrapper';
import { RoleReveal } from '../components/game/RoleReveal';
import { RoundCounter } from '../components/game/RoundCounter';
import { DiscussionTimer } from '../components/game/DiscussionTimer';
import { VotedSelection } from '../components/game/VotedSelection';
import { EndgameScreen } from '../components/game/EndgameScreen';
import { ImpostorGuessScreen } from '../components/game/ImpostorGuessScreen';
import { useNavigate } from 'react-router-dom';

export default function Game() {
  const navigate = useNavigate();
  const state = useGameStore();
  
  // Protect route
  useEffect(() => {
    if (state.players.length < 3) {
        navigate('/setup');
    }
  }, [state.players.length, navigate]);

  const renderPhase = () => {
    switch (state.currentPhase) {
      case 'roles': {
        const currentPlayer = state.players[state.currentPlayerIndex];
        
        // Safety check
        if (!currentPlayer) return <div>Erro: Jogador não encontrado</div>;

        return (
          <RoleReveal 
            key={currentPlayer.id}
            player={currentPlayer}
            secretWord={state.secretWord}
            category={state.secretWordCategory}
            undercoverWord={state.undercoverWord}
            confusedWord={state.confusedWord}
            onConfirm={() => {
               // Mark as seen
               state.revealRole(currentPlayer.id);
               
               // Move to next player or next phase
               if (state.currentPlayerIndex < state.players.length - 1) {
                   useGameStore.setState({ currentPlayerIndex: state.currentPlayerIndex + 1 });
               } else {
                   // All revealed, go to rounds
                   useGameStore.setState({ currentPhase: 'rounds', currentRound: 1, currentPlayerIndex: 0 });
               }
            }}
          />
        );
      }
      
      case 'rounds':
        return (
          <RoundCounter 
            currentRound={state.currentRound}
            totalRounds={state.settings.numRounds}
            onNext={() => {
                state.nextRound();
            }}
            isLastRound={state.currentRound >= state.settings.numRounds}
          />
        );
        
      case 'timer':
        return (
          <DiscussionTimer 
             duration={state.settings.discussionTime}
             onComplete={() => state.skipDiscussion()}
          />
        );
        
      case 'selection':
        return (
          <VotedSelection 
             players={state.players}
             onVote={(id) => {
                 state.eliminatePlayer(id);
             }}
          />
        );

      case 'impostor-guess':
        return (
          <ImpostorGuessScreen />
        );
        
      case 'endgame':
        const lastEliminated = state.eliminatedPlayers[state.eliminatedPlayers.length - 1];
        return (
           <EndgameScreen eliminatedPlayerId={lastEliminated} />
        );

      default:
        return <div>Fase inválida</div>;
    }
  };

  const needsTopBar = ['roles', 'rounds', 'timer', 'selection'].includes(state.currentPhase);
  const needsFooter = ['roles', 'rounds', 'timer', 'selection', 'endgame'].includes(state.currentPhase);

  return (
    <PageWrapper className={`${needsTopBar ? 'pt-16' : ''} ${needsFooter ? 'pb-24' : ''}`}>
      {renderPhase()}
    </PageWrapper>
  );
}
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type GameState, type GameSettings } from '../types/game';
import { categoryService } from '../services/categoryService';
import { assignRoles, checkWinCondition } from '../services/gameLogic';

interface GameStore extends GameState {
  // Actions
  updateSettings: (settings: Partial<GameSettings>) => void;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  updatePlayerName: (id: string, name: string) => void;
  startGame: () => void;
  revealRole: (playerId: string) => void;
  nextRound: () => void;
  startDiscussion: () => void;
  skipDiscussion: () => void;
  setVote: (votedPlayerId: string) => void;
  eliminatePlayer: (playerId: string) => void;
  resolveImpostorGuess: (correct: boolean) => void;
  resetGame: () => void;
  playAgain: () => void;
}

const DEFAULT_SETTINGS: GameSettings = {
  gameMode: 'classic',
  includeConfused: false,
  numPlayers: 3,
  numRounds: 3,
  discussionTime: 120,
  enabledCategories: [],
  showCategoryToImpostor: false,
  allowImpostorGuess: true,
  theme: 'dark'
};

const INITIAL_STATE = {
  players: [],
  currentPhase: 'setup' as const,
  currentRound: 0,
  currentPlayerIndex: 0,
  secretWord: '',
  secretWordCategory: '',
  eliminatedPlayers: [],
  gameEnded: false
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,
      settings: DEFAULT_SETTINGS,

      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),

      addPlayer: (name) => set((state) => ({
        players: [...state.players, {
          id: crypto.randomUUID(),
          name,
          role: 'citizen',
          isEliminated: false,
          hasSeenRole: false
        }]
      })),

      removePlayer: (id) => set((state) => ({
        players: state.players.filter(p => p.id !== id)
      })),

      updatePlayerName: (id, name) => set((state) => ({
        players: state.players.map(p => p.id === id ? { ...p, name: name } : p)
      })),

      startGame: () => {
        const { players, settings } = get();
        
        // 1. Assign Roles
        const assignedPlayers = assignRoles(players, settings.gameMode, settings.includeConfused);
        
        // 2. Select Word(s)
        const gameWords = categoryService.getGameWords(settings.gameMode, settings.includeConfused);
        
        if (!gameWords) {
            console.error("Failed to select words. Make sure categories are enabled.");
            return;
        }

        set({
          players: assignedPlayers,
          currentPhase: 'roles',
          currentRound: 1,
          currentPlayerIndex: 0,
          secretWord: gameWords.secretWord,
          secretWordCategory: gameWords.category,
          undercoverWord: gameWords.undercoverWord,
          confusedWord: gameWords.confusedWord,
          eliminatedPlayers: [],
          gameEnded: false,
          winner: undefined,
          selectedPlayerId: undefined
        });
      },

      revealRole: (playerId) => set((state) => ({
        players: state.players.map(p => p.id === playerId ? { ...p, hasSeenRole: true } : p)
      })),

      nextRound: () => set((state) => {
        if (state.currentRound >= state.settings.numRounds) {
           return { currentPhase: 'timer' };
        }
        return { currentRound: state.currentRound + 1 };
      }),

      startDiscussion: () => set({ currentPhase: 'timer' }),

      skipDiscussion: () => set({ currentPhase: 'selection' }),

      setVote: (votedPlayerId) => set({ selectedPlayerId: votedPlayerId }),

      eliminatePlayer: (playerId) => {
        const { players, settings } = get();
        const eliminatedPlayer = players.find(p => p.id === playerId);
        
        if (!eliminatedPlayer) return;

        const updatedPlayers = players.map(p => p.id === playerId ? { ...p, isEliminated: true } : p);
        
        const isBadGuy = eliminatedPlayer.role === 'impostor' || eliminatedPlayer.role === 'undercover';

        if (isBadGuy && settings.allowImpostorGuess) {
            set({
                players: updatedPlayers,
                eliminatedPlayers: [...get().eliminatedPlayers, playerId],
                currentPhase: 'impostor-guess'
            });
        } else {
            const winner = checkWinCondition(eliminatedPlayer);
            set({ 
              players: updatedPlayers, 
              eliminatedPlayers: [...get().eliminatedPlayers, playerId],
              currentPhase: 'endgame', 
              winner, 
              gameEnded: true 
            });
        }
      },

      resolveImpostorGuess: (correct) => {
          set({
              currentPhase: 'endgame',
              winner: correct ? 'impostors' : 'citizens',
              gameEnded: true
          });
      },

      resetGame: () => set({
        ...INITIAL_STATE,
        players: get().players.map(p => ({ ...p, role: 'citizen', isEliminated: false, hasSeenRole: false }))
      }),

      playAgain: () => {
         get().startGame();
      }

    }),
    {
      name: 'impostor-storage',
      partialize: (state) => ({ settings: state.settings, players: state.players.map(p => ({id: p.id, name: p.name})) } as any),
    }
  )
);

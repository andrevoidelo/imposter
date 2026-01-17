import { type Player } from './player';

export interface GameSettings {
  gameMode: 'classic' | 'undercover' | 'chaos';
  includeConfused: boolean;
  numPlayers: number;
  numRounds: number;
  discussionTime: number; // in seconds
  enabledCategories: string[];
  showCategoryToImpostor: boolean;
  allowImpostorGuess: boolean;
  theme: 'dark' | 'light';
}

export interface GameState {
  settings: GameSettings;
  players: Player[];
  currentPhase: 'setup' | 'roles' | 'rounds' | 'timer' | 'selection' | 'impostor-guess' | 'endgame';
  currentRound: number;
  currentPlayerIndex: number;
  secretWord: string;
  secretWordCategory: string;
  undercoverWord?: string;
  confusedWord?: string;
  selectedPlayerId?: string;
  eliminatedPlayers: string[];
  winner?: 'citizens' | 'impostors';
  gameEnded: boolean;
}
export interface Player {
  id: string;
  name: string;
  role: 'citizen' | 'impostor' | 'undercover' | 'mrwhite' | 'confused';
  isEliminated: boolean;
  hasSeenRole: boolean;
}
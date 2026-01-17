import { type Player } from '../types/player';

export const assignRoles = (players: Player[], gameMode: string, includeConfused: boolean): Player[] => {
  const totalPlayers = players.length;
  
  // 1. Determine number of special roles
  let impostorCount = 1; // Default to 1
  
  if (gameMode === 'chaos') {
    impostorCount = Math.floor(Math.random() * totalPlayers);
  }

  const roles: Player['role'][] = Array(totalPlayers).fill('citizen');
  let currentRoleIndex = 0;

  // 2. Assign Confused (Addition)
  if (includeConfused) {
      if (currentRoleIndex < totalPlayers) {
          roles[currentRoleIndex] = 'confused';
          currentRoleIndex++;
      }
  }

  // 3. Assign Impostors (and Undercover variant)
  const remainingSlots = totalPlayers - currentRoleIndex;
  const actualImpostorCount = Math.min(impostorCount, remainingSlots);

  for (let i = 0; i < actualImpostorCount; i++) {
      if (gameMode === 'undercover' && i === 0) {
          roles[currentRoleIndex] = 'undercover';
      } else {
          roles[currentRoleIndex] = 'impostor';
      }
      currentRoleIndex++;
  }

  // 4. Shuffle the roles array
  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [roles[i], roles[j]] = [roles[j], roles[i]];
  }

  // 5. Assign roles to players preserving order
  return players.map((p, index) => ({
    ...p,
    role: roles[index],
    hasSeenRole: false,
    isEliminated: false
  }));
};

export const checkWinCondition = (eliminatedPlayer: Player): 'citizens' | 'impostors' => {
  const isBadGuy = eliminatedPlayer.role === 'impostor' || eliminatedPlayer.role === 'undercover';

  if (isBadGuy) {
    return 'citizens'; 
  } else {
    return 'impostors';
  }
};
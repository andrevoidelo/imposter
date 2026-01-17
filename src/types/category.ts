export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
  isBuiltIn: boolean;
  isEnabled: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  words: string[];
  wordPairs?: WordPair[];
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface WordPair {
  citizen: string;
  undercover: string;
}

export interface CategoryExport {
  exportVersion: string;
  exportedAt: string;
  appVersion: string;
  categories: Category[];
}

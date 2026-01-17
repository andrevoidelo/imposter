import { type Category, type CategoryExport, type WordPair } from '../types/category';
import builtInCategoriesMeta from '../data/categories.json';
import i18n from '../i18n';

const STORAGE_KEY = 'impostor_custom_categories';
const BUILTIN_STATES_KEY = 'impostor_builtin_states';
const EXPORT_VERSION = '1.0';
const APP_VERSION = '1.0.0';

interface BuiltInWordData {
  categoryId: string;
  words: string[];
}

interface BuiltInPairData {
  categoryId: string;
  pairs: WordPair[];
}

type LangCache<T> = Record<string, Record<string, T>>;

class CategoryService {
  private wordCache: LangCache<string[]> = {};
  private pairCache: LangCache<WordPair[]> = {};
  
  constructor() {
    this.initializeBuiltInCategories();
  }

  private async initializeBuiltInCategories() {
    const wordModules = import.meta.glob<BuiltInWordData>('../data/words/*/*.json', { eager: true });
    const pairModules = import.meta.glob<BuiltInPairData>('../data/wordPairs/*/*.json', { eager: true });

    for (const path in wordModules) {
      const match = path.match(/\/words\/([a-z]{2})\//);
      if (match) {
        const lang = match[1];
        const data = wordModules[path];
        if (!this.wordCache[lang]) this.wordCache[lang] = {};
        this.wordCache[lang][data.categoryId] = data.words;
      }
    }

    for (const path in pairModules) {
      const match = path.match(/\/wordPairs\/([a-z]{2})\//);
      if (match) {
        const lang = match[1];
        const data = pairModules[path];
        if (!this.pairCache[lang]) this.pairCache[lang] = {};
        this.pairCache[lang][data.categoryId] = data.pairs;
      }
    }
  }

  private getCurrentLang(): string {
    return i18n.language ? i18n.language.substring(0, 2) : 'en';
  }

  // ============ CRUD ============

  getAllCategories(): Category[] {
    const lang = this.getCurrentLang();
    const states = this.getBuiltInStates();
    
    const builtIn = builtInCategoriesMeta.map(meta => {
        const name = (meta.name as any)[lang] || (meta.name as any)['en'] || Object.values(meta.name)[0];
        const desc = (meta.description as any)[lang] || (meta.description as any)['en'] || Object.values(meta.description)[0];
        
        return {
            ...meta,
            name: name as string,
            description: desc as string,
            difficulty: meta.difficulty as 'easy' | 'medium' | 'hard',
            isBuiltIn: true,
            isEnabled: states[meta.id] !== undefined ? states[meta.id] : true,
            words: this.wordCache[lang]?.[meta.id] || this.wordCache['en']?.[meta.id] || [],
            wordPairs: this.pairCache[lang]?.[meta.id] || this.pairCache['en']?.[meta.id] || [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            version: 1
        };
    });

    const custom = this.getCustomCategories();
    return [...builtIn, ...custom];
  }

  getEnabledCategories(): Category[] {
    return this.getAllCategories().filter(c => c.isEnabled);
  }

  getCustomCategories(): Category[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  createCategory(category: Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'version'>): Category {
    const newCategory: Category = {
      ...category,
      id: crypto.randomUUID(),
      isBuiltIn: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1
    };

    const categories = this.getCustomCategories();
    categories.push(newCategory);
    this.saveCustomCategories(categories);

    return newCategory;
  }

  updateCategory(id: string, updates: Partial<Category>): Category | null {
    const categories = this.getCustomCategories();
    const index = categories.findIndex(c => c.id === id);

    if (index === -1) return null;

    categories[index] = {
      ...categories[index],
      ...updates,
      updatedAt: new Date().toISOString(),
      version: categories[index].version + 1
    };

    this.saveCustomCategories(categories);
    return categories[index];
  }

  deleteCategory(id: string): boolean {
    const categories = this.getCustomCategories();
    const filtered = categories.filter(c => c.id !== id);

    if (filtered.length === categories.length) return false;

    this.saveCustomCategories(filtered);
    return true;
  }

  duplicateCategory(id: string, newName?: string): Category | null {
    const all = this.getAllCategories();
    const source = all.find(c => c.id === id);

    if (!source) return null;

    return this.createCategory({
      name: newName || `${source.name} (Cópia)`,
      icon: source.icon,
      description: source.description,
      isEnabled: false,
      isBuiltIn: false,
      difficulty: source.difficulty,
      words: [...source.words],
      wordPairs: source.wordPairs ? [...source.wordPairs] : undefined
    });
  }

  // ============ TOGGLE ============

  toggleCategory(id: string): boolean {
    const isBuiltIn = builtInCategoriesMeta.some(c => c.id === id);

    if (isBuiltIn) {
      const states = this.getBuiltInStates();
      const newState = !(states[id] !== undefined ? states[id] : true);
      states[id] = newState;
      localStorage.setItem(BUILTIN_STATES_KEY, JSON.stringify(states));
      return newState;
    }

    const categories = this.getCustomCategories();
    const category = categories.find(c => c.id === id);
    if (category) {
      category.isEnabled = !category.isEnabled;
      this.saveCustomCategories(categories);
      return category.isEnabled;
    }

    return false;
  }

  // ============ IMPORT/EXPORT ============

  exportCategories(categoryIds?: string[]): CategoryExport {
    const categories = categoryIds
      ? this.getCustomCategories().filter(c => categoryIds.includes(c.id))
      : this.getCustomCategories();

    return {
      exportVersion: EXPORT_VERSION,
      exportedAt: new Date().toISOString(),
      appVersion: APP_VERSION,
      categories
    };
  }

  exportToFile(categoryIds?: string[]): void {
    const data = this.exportCategories(categoryIds);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `impostor_categorias_${new Date().toISOString().split('T')[0]}.json`;
    a.click();

    URL.revokeObjectURL(url);
  }

  async importFromFile(file: File): Promise<{ success: number; skipped: number; errors: string[] }> {
    try {
      const text = await file.text();
      const data: CategoryExport = JSON.parse(text);

      const result = { success: 0, skipped: 0, errors: [] as string[] };
      const existing = this.getCustomCategories();

      for (const category of data.categories) {
        if (existing.some(c => c.name.toLowerCase() === category.name.toLowerCase())) {
          result.skipped++;
          continue;
        }

        if (!category.name || !category.words || category.words.length === 0) {
          result.errors.push(`Categoria inválida: ${category.name || 'sem nome'}`);
          continue;
        }

        this.createCategory({
          name: category.name,
          icon: category.icon || '📦',
          description: category.description,
          isEnabled: false,
          isBuiltIn: false,
          difficulty: category.difficulty || 'medium',
          words: category.words,
          wordPairs: category.wordPairs
        });

        result.success++;
      }

      return result;
    } catch (e) {
      return { success: 0, skipped: 0, errors: ['Arquivo inválido ou corrompido.'] };
    }
  }

  // ============ HELPERS ============

  private saveCustomCategories(categories: Category[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }

  private getBuiltInStates(): Record<string, boolean> {
    const stored = localStorage.getItem(BUILTIN_STATES_KEY);
    return stored ? JSON.parse(stored) : {};
  }

  getRandomWord(): { word: string; category: string } | null {
    const enabled = this.getEnabledCategories();
    if (enabled.length === 0) return null;

    const pool: { word: string; category: string }[] = [];
    for (const cat of enabled) {
      for (const word of cat.words) {
        pool.push({ word, category: cat.name });
      }
    }

    if (pool.length === 0) return null;

    return pool[Math.floor(Math.random() * pool.length)];
  }

  getRandomWordPair(): { citizen: string; undercover: string; category: string } | null {
    const enabled = this.getEnabledCategories().filter(c => c.wordPairs && c.wordPairs.length > 0);
    if (enabled.length === 0) return null;

    const pool: { citizen: string; undercover: string; category: string }[] = [];
    for (const cat of enabled) {
      if (cat.wordPairs) {
        for (const pair of cat.wordPairs) {
          pool.push({ ...pair, category: cat.name });
        }
      }
    }

    if (pool.length === 0) return null;

    return pool[Math.floor(Math.random() * pool.length)];
  }

  getTwoRandomWordPairs(): { pair1: WordPair; pair2: WordPair; category: string } | null {
    const enabled = this.getEnabledCategories().filter(c => c.wordPairs && c.wordPairs.length >= 2);
    if (enabled.length === 0) return null;

    const cat = enabled[Math.floor(Math.random() * enabled.length)];
    const pairs = [...cat.wordPairs!];
    
    const idx1 = Math.floor(Math.random() * pairs.length);
    const pair1 = pairs[idx1];
    pairs.splice(idx1, 1);
    
    const idx2 = Math.floor(Math.random() * pairs.length);
    const pair2 = pairs[idx2];
    
    return { pair1, pair2, category: cat.name };
  }
}

export const categoryService = new CategoryService();
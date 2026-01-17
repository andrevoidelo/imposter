import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../contexts/useGameStore';
import { categoryService } from '../services/categoryService';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import { type Category } from '../types/category';
import { TopBar } from '../components/layout/TopBar';
import { FixedFooter } from '../components/layout/FixedFooter';
import { Minus, Plus } from 'lucide-react';

export default function Setup() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { settings, updateSettings, startGame, players, addPlayer, removePlayer, updatePlayerName, resetGame } = useGameStore();
  const isDark = settings.theme === 'dark';
  
  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    resetGame(); // Reset previous game state on enter
    setCategories(categoryService.getAllCategories());
  }, [i18n.language]); // Re-fetch categories when language changes

  const handlePlayerCountChange = (delta: number) => {
    const newCount = Math.max(3, Math.min(15, settings.numPlayers + delta));
    updateSettings({ numPlayers: newCount });
    
    // Adjust player array size
    if (newCount > players.length) {
       for (let i = players.length; i < newCount; i++) {
           addPlayer(t('setup.placeholderName', { number: i + 1 }));
       }
    } else if (newCount < players.length) {
       // Remove last players
       const toRemove = players.slice(newCount).map(p => p.id);
       toRemove.forEach(id => removePlayer(id));
    }
  };

  // Ensure initial players exist
  useEffect(() => {
     if (players.length === 0) {
         for (let i = 0; i < settings.numPlayers; i++) {
             addPlayer(t('setup.placeholderName', { number: i + 1 }));
         }
     }
  }, [i18n.language]); // Update placeholders if language changes (though existing names won't update automatically if already set)

  const toggleCategory = (id: string) => {
    categoryService.toggleCategory(id);
    setCategories(categoryService.getAllCategories()); // Refresh
  };

  const handleStartGame = () => {
    const enabledCats = categories.filter(c => c.isEnabled);
    if (enabledCats.length === 0) {
      alert(t('setup.alertNoCategory'));
      return;
    }

    // 1. Ensure all players have names (use placeholders if empty)
    players.forEach((p, idx) => {
        if (!p.name || p.name.trim() === '') {
            updatePlayerName(p.id, t('setup.placeholderName', { number: idx + 1 }));
        }
    });
    
    // 2. Save enabled categories to settings
    updateSettings({ enabledCategories: enabledCats.map(c => c.id) });
    
    startGame();
    navigate('/game');
  };

  return (
    <PageWrapper className="space-y-6 pt-16 pb-24">
      {/* Fixed Header */}
      <TopBar title={t('setup.title')} onBack={() => navigate('/')} />

      {/* Player Count */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-text-secondary px-1">{t('setup.players')}</h2>
        <Card className="flex items-center justify-between py-4">
          <Button 
            variant="secondary" 
            size="icon" 
            onClick={() => handlePlayerCountChange(-1)}
            disabled={settings.numPlayers <= 3}
          >
            <Minus size={24} strokeWidth={2.5} />
          </Button>
          <span className="text-3xl font-bold text-primary-400">{settings.numPlayers}</span>
          <Button 
            variant="secondary" 
            size="icon" 
            onClick={() => handlePlayerCountChange(1)}
            disabled={settings.numPlayers >= 15}
          >
            <Plus size={24} strokeWidth={2.5} />
          </Button>
        </Card>
      </section>

      {/* Player Names */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-text-secondary px-1">{t('setup.names')}</h2>
        <div className="grid grid-cols-1 gap-3">
            {players.map((player, idx) => (
                <div key={player.id} className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: `${idx * 50}ms` }}>
                    <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 font-bold text-sm">
                        {idx + 1}
                    </div>
                    <div className="relative flex-1">
                        <Input 
                            value={player.name} 
                            onChange={(e) => updatePlayerName(player.id, e.target.value)}
                            onFocus={(e) => e.target.select()}
                            onBlur={(e) => {
                                if (!e.target.value.trim()) {
                                    updatePlayerName(player.id, t('setup.placeholderName', { number: idx + 1 }));
                                }
                            }}
                            placeholder={t('setup.placeholderName', { number: idx + 1 })}
                            className="py-2 pr-10"
                        />
                        {player.name && (
                            <button 
                                onClick={() => updatePlayerName(player.id, '')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-1"
                            >
                                <Minus size={16} strokeWidth={3} />
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Categories */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-1">
             <h2 className="text-lg font-semibold text-text-secondary">{t('setup.categories')}</h2>
             <Button variant="ghost" size="sm" onClick={() => navigate('/categories')}>
                {t('setup.manage')}
             </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`
                        relative p-3 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-2
                        ${cat.isEnabled 
                            ? 'bg-primary-500/10 border-primary-500' 
                            : 'bg-bg-elevated border-transparent opacity-60 hover:opacity-100'}
                    `}
                >
                    <div className="text-xl shrink-0">{cat.icon}</div>
                    <div className="font-semibold text-xs leading-tight line-clamp-2">{cat.name}</div>
                </button>
            ))}
        </div>
      </section>

      {/* Game Mode */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-text-secondary px-1">{t('setup.gameMode')}</h2>
        <div className="grid grid-cols-1 gap-3">
            <label className={`
                flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all
                ${settings.gameMode === 'classic' ? 'bg-bg-card border-primary-500' : 'bg-bg-elevated border-transparent opacity-70'}
            `}>
                <input 
                    type="radio" 
                    name="gamemode" 
                    className="hidden" 
                    checked={settings.gameMode === 'classic'}
                    onChange={() => updateSettings({ gameMode: 'classic' })}
                />
                <img src="/spy.svg" className={`w-8 h-8 ${isDark ? 'invert' : 'opacity-70'}`} alt="Spy" />
                <div>
                    <div className="font-bold">{t('setup.modes.classic.title')}</div>
                    <div className="text-xs text-text-secondary">{t('setup.modes.classic.description')}</div>
                </div>
            </label>

            <label className={`
                flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all
                ${settings.gameMode === 'undercover' ? 'bg-bg-card border-warning' : 'bg-bg-elevated border-transparent opacity-70'}
            `}>
                <input 
                    type="radio" 
                    name="gamemode" 
                    className="hidden" 
                    checked={settings.gameMode === 'undercover'}
                    onChange={() => updateSettings({ gameMode: 'undercover' })}
                />
                <div className="text-2xl">🕵️</div>
                <div>
                    <div className="font-bold">{t('setup.modes.undercover.title')}</div>
                    <div className="text-xs text-text-secondary">{t('setup.modes.undercover.description')}</div>
                </div>
            </label>
        </div>
      </section>

      {/* Other Settings */}
      <section className="space-y-3">
         <h2 className="text-lg font-semibold text-text-secondary px-1">{t('setup.options')}</h2>
         
         {/* Confused Toggle */}
         <button
            onClick={() => updateSettings({ includeConfused: !settings.includeConfused })}
            className={`
                flex items-center gap-4 p-4 rounded-2xl border-2 transition-all w-full text-left
                ${settings.includeConfused ? 'bg-bg-card border-text-primary' : 'bg-bg-elevated border-transparent opacity-70'}
            `}
         >
            <div className="text-2xl">😵</div>
            <div className="flex-1">
                <div className="font-bold">{t('setup.includeConfused.title')}</div>
                <div className="text-xs text-text-secondary">{t('setup.includeConfused.description')}</div>
            </div>
            <div className={`w-12 h-7 rounded-full p-1 transition-colors ${settings.includeConfused ? 'bg-success' : 'bg-bg-dark'}`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${settings.includeConfused ? 'translate-x-5' : ''}`} />
            </div>
         </button>

         <Card className="space-y-4">
             <span className="font-bold text-lg text-text-secondary block px-1">{t('setup.discussionTime')}</span>
             <div className="flex items-center justify-between bg-bg-elevated rounded-2xl p-2 border border-text-primary/5">
                 <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => updateSettings({ discussionTime: Math.max(10, settings.discussionTime - 10) })}
                    className="h-12 w-12 rounded-xl hover:bg-primary-500/10 text-primary-400"
                 >
                    <Minus size={24} strokeWidth={3} />
                 </Button>

                 <div className="flex-1 text-center">
                     <input 
                        type="tel"
                        className="bg-transparent text-3xl outline-none w-full text-center focus:text-primary-400 transition-colors font-mono font-bold"
                        value={(() => {
                          const m = Math.floor(settings.discussionTime / 60);
                          const s = settings.discussionTime % 60;
                          return `${m}:${s.toString().padStart(2, '0')}`;
                        })()}
                        onChange={(e) => {
                            const digits = e.target.value.replace(/\D/g, '');
                            const trimmed = digits.slice(-4);
                            const minutes = trimmed.length > 2 ? parseInt(trimmed.slice(0, -2)) : 0;
                            const seconds = trimmed.length > 0 ? parseInt(trimmed.slice(-2)) : 0;
                            updateSettings({ discussionTime: minutes * 60 + seconds });
                        }}
                        onFocus={(e) => e.target.select()}
                     />
                 </div>

                 <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => updateSettings({ discussionTime: Math.min(600, settings.discussionTime + 10) })}
                    className="h-12 w-12 rounded-xl hover:bg-primary-500/10 text-primary-400"
                 >
                    <Plus size={24} strokeWidth={3} />
                 </Button>
             </div>
         </Card>
      </section>

      {/* Footer Action */}
      <FixedFooter>
        <Button 
            fullWidth 
            size="lg" 
            onClick={handleStartGame}
            className="bg-gradient-to-r from-primary-500 to-primary-600 shadow-xl shadow-primary-500/20 h-16"
        >
            {t('setup.startGame')}
        </Button>
      </FixedFooter>
    </PageWrapper>
  );
}

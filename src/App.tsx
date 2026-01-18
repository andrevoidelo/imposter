import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Setup from './pages/Setup';
import Game from './pages/Game';
import HowToPlay from './pages/HowToPlay';
import CategoryManager from './pages/CategoryManager';
import CategoryEditor from './pages/CategoryEditor';
import { useGameStore } from './contexts/useGameStore';
import { useEffect } from 'react';
import { soundService } from './services/soundService';
import { StatusBar, Style } from '@capacitor/status-bar';
import { NavigationBar } from '@capgo/capacitor-navigation-bar';

function App() {
  const { settings } = useGameStore();

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the clicked element or its parents are interactive
      if (target.closest('button, a, input[type="radio"], input[type="checkbox"], [role="button"], .clickable')) {
        soundService.playClick();
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const isLight = settings.theme === 'light';
    
    // 1. Update CSS Theme
    if (isLight) {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }

    // 2. Update System Bars (Android)
    const updateSystemBars = async () => {
      try {
        const color = isLight ? '#ffffff' : '#0f172a';
        const style = isLight ? Style.Light : Style.Dark; // Light = Dark text, Dark = Light text

        // Status Bar
        await StatusBar.setStyle({ style });
        await StatusBar.setBackgroundColor({ color });
        await StatusBar.setOverlaysWebView({ overlay: false });

        // Navigation Bar
        await NavigationBar.setNavigationBarColor({ 
          color: color, 
          darkButtons: isLight 
        });
      } catch (e) {
        // Ignored on web or if plugins missing
      }
    };

    updateSystemBars();
  }, [settings.theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/game" element={<Game />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/categories" element={<CategoryManager />} />
        <Route path="/categories/new" element={<CategoryEditor />} />
        <Route path="/categories/edit/:id" element={<CategoryEditor />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
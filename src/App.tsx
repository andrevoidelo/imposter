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
    if (settings.theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
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
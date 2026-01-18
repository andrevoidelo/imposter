import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';

/**
 * Initialize status bar to not overlay content.
 * Theme-specific styling is handled by App.tsx useEffect.
 */
export async function initSafeArea(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  if (Capacitor.getPlatform() === 'android') {
    try {
      // Ensure status bar doesn't overlay content
      await StatusBar.setOverlaysWebView({ overlay: false });
    } catch (error) {
      console.error('Failed to initialize status bar:', error);
    }
  }
}

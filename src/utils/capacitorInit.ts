import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';

export async function initCapacitor(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  // Keyboard Configuration
  try {
    await Keyboard.setResizeMode({ mode: KeyboardResize.Native });
    await Keyboard.setScroll({ isDisabled: true });
  } catch (error) {
    console.error('Failed to initialize keyboard:', error);
  }

  // Status Bar Configuration (Android)
  if (Capacitor.getPlatform() === 'android') {
    try {
      await StatusBar.setOverlaysWebView({ overlay: true });
    } catch (error) {
      console.error('Failed to initialize status bar:', error);
    }
  }
}

import { Capacitor } from '@capacitor/core';
import { SafeArea, SystemBarsStyle } from '@capacitor-community/safe-area';
import { StatusBar, Style } from '@capacitor/status-bar';

/**
 * Initialize safe area insets using the @capacitor-community/safe-area plugin.
 * This plugin automatically patches the CSS env(safe-area-inset-*) functions
 * to work correctly on Android WebViews.
 */
export async function initSafeArea(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  const platform = Capacitor.getPlatform();

  if (platform === 'android') {
    await initAndroidSafeArea();
  }
}

async function initAndroidSafeArea(): Promise<void> {
  try {
    // Configure status bar for edge-to-edge with dark style (light icons)
    await StatusBar.setOverlaysWebView({ overlay: true });
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#00000000' });

    // Configure system bars style via Safe Area plugin
    // This ensures the icons are visible on our dark background
    await SafeArea.setSystemBarsStyle({
      style: SystemBarsStyle.Dark, // Light icons for dark backgrounds
    });
  } catch (error) {
    console.error('Failed to initialize Android safe area:', error);
  }
}

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.impostor.app',
  appName: 'Impostor!',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0f172a',
      showSpinner: false
    },
    StatusBar: {
      overlaysWebView: false,
      backgroundColor: '#0f172a'
    }
  }
};

export default config;

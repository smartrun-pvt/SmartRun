import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'in.smartrun.app',
  appName: 'SmartRun',
  webDir: 'dist',
  android: {
    webContentsDebuggingEnabled: false,
  },
  server: {
    androidScheme: 'https',
    cleartext: false,
    allowNavigation: [
      'www.smartrun.in',
      'smartrun.in',
      '*.razorpay.com',
      'api.razorpay.com',
      'checkout.razorpay.com',
      '*.supabase.co',
      '*.googleapis.com',
      '*.gstatic.com',
      '*.googletagmanager.com',
      'unpkg.com',
      'images.unsplash.com',
      'i.imgur.com'
    ],
  },
  plugins: {
    App: {
      // Custom URL scheme deep link handling (smartrun://product/:id or https://www.smartrun.in/...)
    },
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ['google.com', 'phone'],
      authDomain: 'www.smartrun.in',
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#F9C017',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    StatusBar: {
      overlaysWebView: true,
      style: 'LIGHT',
      backgroundColor: '#00000000',
    },
    SystemBars: {
      insetsHandling: 'disable',
    },
  },
};

export default config;


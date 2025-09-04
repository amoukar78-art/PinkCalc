import type { CapacitorConfig } from '@capacitor/cli';

// Configuration for completely offline/local app
const config: CapacitorConfig = {
  appId: 'com.developsaas.nadinor.app',
  appName: 'Calculator Cute',
  webDir: 'dist/public',
  server: {
    // No external server - works completely offline
    androidScheme: 'https'
  },
  plugins: {
    StatusBar: {
      style: 'light',
      backgroundColor: '#F5F0FB',
    },
  },
  android: {
    buildOptions: {
      keystorePath: "app/signing.keystore",
      keystorePassword: "aPbD8TqaKeHd",
      keystoreAlias: "my-key-alias",
      keystoreAliasPassword: "aPbD8TqaKeHd",
      releaseType: "APK"
    },
    allowMixedContent: true
  }
};

export default config;
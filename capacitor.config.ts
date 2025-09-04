import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.developsaas.nadinor.app',
  appName: 'Calculator Cute',
  webDir: 'dist/public',
  server: {
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
      releaseType: "AAB"
    }
  }
};

export default config;

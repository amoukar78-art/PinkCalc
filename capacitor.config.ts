import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.calculator.app',
  appName: 'Calculator App',
  webDir: 'dist/public',
  server: {
    androidScheme: 'https'
  },
  android: {
    buildOptions: {
      keystorePath: "app/signing.keystore",
      keystorePassword: "aPbD8TqaKeHd",
      keystoreAlias: "my-key-alias",
      keystoreAliasPassword: "aPbD8TqaKeHd",
      releaseType: "APK"
    }
  }
};

export default config;
